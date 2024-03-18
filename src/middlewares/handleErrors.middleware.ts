import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

class HandleErrorMiddleware {
  public static execute = (
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.flatten().fieldErrors });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  };
}

export const handleErrors = HandleErrorMiddleware.execute;
