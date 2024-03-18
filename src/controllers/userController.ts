import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  private userService = new UserService();

  public create = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const newUser = await this.userService.create(body);
    return res.status(201).json(newUser);
  };

  public login = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const token = await this.userService.login(body);
    return res.status(200).json(token);
  };

  public retrieve = async (_req: Request, res: Response): Promise<Response> => {
    const { sub } = res.locals;
    const user = await this.userService.retrieve(Number(sub));
    return res.status(200).json(user);
  };
}
