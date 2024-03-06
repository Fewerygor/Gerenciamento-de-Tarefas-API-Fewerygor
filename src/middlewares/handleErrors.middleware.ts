import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

class HandleErrorMiddleware {
  public static execute = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    return res.status(500).json({ message: "Internal Server Error!" });
  };
}

export const handleErrors = HandleErrorMiddleware.execute;