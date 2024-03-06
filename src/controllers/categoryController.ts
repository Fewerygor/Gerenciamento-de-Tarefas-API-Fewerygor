import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  private categoryService = new CategoryService();

  public async create(req: Request, res: Response): Promise<Response> {
    const category = await this.categoryService.create(req.body);
    return res.status(201).json(category);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.categoryService.delete(id);
    return res.status(204).json();
  }
}
