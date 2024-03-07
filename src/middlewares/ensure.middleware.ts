import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { prisma } from "../database/prisma";
import { AnyZodObject } from "zod";

export class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);

      return next();
    };

  public validTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    const foundTask = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }

    res.locals = { ...res.locals, foundTask };

    return next();
  };

  public categoryParams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    return next();
  };

  public validCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.body;

    if (!categoryId) return next();

    const foundCategory = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    return next();
  };
}

export const ensure = new EnsureMiddleware();
