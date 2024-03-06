import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { TaskCreate, TaskUpdate } from "../interfaces";
import { TaskCreatReturn, TaskGetReturn } from "../interfaces/task.interface";
import { taskGetReturnSchema, taskSchema } from "../schemas/task.schema";

export class TaskService {
  public async create(payload: TaskCreate): Promise<TaskCreatReturn> {
    const newTask = await prisma.task.create({ data: payload });

    return taskSchema.parse(newTask);
  }

  public async read(category?: string): Promise<Array<TaskGetReturn>> {
    let name: any = { include: { category: true } };

    if (category) {
      const categoryName = { name: { equals: category, mode: "insensitive" } };
      name = { ...name, where: { category: categoryName } };
    }
    const allTasks = await prisma.task.findMany(name);

    if (!allTasks.length) {
      throw new AppError("Category not found", 404);
    }

    return taskGetReturnSchema.array().parse(allTasks);
  }

  public async retrivie(id: string): Promise<TaskGetReturn> {
    const findOne = prisma.task.findFirst({ where: { id: Number(id) } });

    return taskGetReturnSchema.parse(findOne);
  }

  public async update(id: string, payload: TaskUpdate): Promise<TaskGetReturn> {
    const update = await prisma.task.update({
      where: { id: Number(id) },
      data: payload,
    });

    return taskGetReturnSchema.parse(update);
  }

  public async delete(id: string) {
    await prisma.task.delete({ where: { id: Number(id) } });
  }
}
