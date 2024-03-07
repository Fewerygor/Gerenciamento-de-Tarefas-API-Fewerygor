import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService = new TaskService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newTask = await this.taskService.create(req.body);
    return res.status(201).json(newTask);
  };

  public read = async (
    { query }: Request,
    res: Response
  ): Promise<Response> => {
    const category = query.category ? String(query.category) : undefined;
    const allTasks = await this.taskService.read(category);
    return res.status(200).json(allTasks);
  };

  public retrieve = async (req: Request, res: Response): Promise<Response> => {
    const FoundTask = await this.taskService.retrivie(res.locals.foundTask);
    return res.status(200).json(FoundTask);
  };

  public update = async (
    { params: { id }, body }: Request,
    res: Response
  ): Promise<Response> => {
    const task = await this.taskService.update(id, body);
    return res.status(200).json(task);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.taskService.delete(req.params.id);
    return res.status(204).json();
  };
}
