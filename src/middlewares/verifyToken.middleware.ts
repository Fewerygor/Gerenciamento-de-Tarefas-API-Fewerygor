import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

class VerifyToken {
  public isAutheticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Token is required", 401);
    }

    const [_bearer, token] = authorization.split(" ");
    const secret = process.env.JWT_SECRET!;
    const { sub } = verify(token, secret)

    res.locals = { ...res.locals, sub };

    return next();
  };

  public isTaskOwner = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sub = Number(res.locals.sub);
    const { foundTask } = res.locals;

    if (foundTask.userId !== sub) {
      throw new AppError("This user is not the task owner", 403);
    }

    return next();
  };

  public isCategoryOwner = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sub = Number(res.locals.sub);
    const { foundCategory } = res.locals;

    if (foundCategory.userId !== sub) {
      throw new AppError("This user is not the category owner", 403);
    }

    return next();
  };
}

export const verifyToken = new VerifyToken();
