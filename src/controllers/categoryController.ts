import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  private categoryService = new CategoryService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const category = await this.categoryService.create(req.body);
    return res.status(201).json(category);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.categoryService.delete(req.params.id);
    return res.status(204).json();
  };
}
