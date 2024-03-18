import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { TaskCreate, TaskUpdate } from "../interfaces";
import { TaskCreatReturn, TaskGetReturn } from "../interfaces/task.interface";
import { taskGetReturnSchema, taskSchema } from "../schemas/task.schema";

export class TaskService {
  public create = async (
    payload: TaskCreate,
    userId: number
  ): Promise<TaskCreatReturn> => {
    const newTask = await prisma.task.create({ data: { ...payload, userId } });

    return taskSchema.parse(newTask);
  };

  public read = async (
    userId: number,
    category?: string,
  ): Promise<Array<TaskGetReturn>> => {
    let name: any = { include: { category: true }, where: { userId } };

    if (category) {
      const categoryName = { name: { equals: category, mode: "insensitive" } };
      name = { ...name, where: { ...name.where, category: categoryName } };
    }
    const allTasks = await prisma.task.findMany(name);

    if (!allTasks.length) {
      throw new AppError("Category not found", 404);
    }

    return taskGetReturnSchema.array().parse(allTasks);
  };

  public retrivie = async (foundTask: Task): Promise<TaskGetReturn> => {
    return taskGetReturnSchema.parse(foundTask);
  };

  public update = async (
    id: string,
    payload: TaskUpdate
  ): Promise<TaskGetReturn> => {
    const update = await prisma.task.update({
      where: { id: Number(id) },
      data: payload,
    });

    return taskGetReturnSchema.parse(update);
  };

  public delete = async (id: string): Promise<void> => {
    await prisma.task.delete({ where: { id: Number(id) } });
  };
}
