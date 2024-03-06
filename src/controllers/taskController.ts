import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService = new TaskService();

  public async create(req: Request, res: Response): Promise<Response> {
    const task = await this.taskService.create(req.body);
    return res.status(201).json(task);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const tasks = await this.taskService.read(req.body.categoryName);
    return res.status(200).json(tasks);
  }

  public async retrieve(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const task = await this.taskService.retrivie(id);
    return res.status(200).json(task);
  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { body } = req.body;
    const task = await this.taskService.update(id, body);
    return res.status(200).json(task);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    await this.taskService.delete(req.params.id);
    return res.status(204).json();
  }
}
