import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { prisma } from "../database/prisma";
import { AnyZodObject } from "zod";

export class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      req.body = schema.parse(req.body);

      return next();
    };
  public async validTask(req: Request, res: Response, next: NextFunction) {
    const { taskId } = req.params;

    const foundTask = await prisma.task.findFirst({
      where: { id: Number(taskId) },
      include: { category: true}
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }

    res.locals = { ...res.locals, foundTask };

    return next();
  }

  public async validCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { categoryId } = req.params;

    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    return next();
  }
}

export const ensure = new EnsureMiddleware();
