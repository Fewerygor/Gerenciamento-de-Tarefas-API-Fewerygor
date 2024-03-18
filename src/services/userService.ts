import { compare, hash } from "bcrypt";
import { UserCreate, UserReturn } from "../interfaces";
import { prisma } from "../database/prisma";
import { userReturnSchema } from "../schemas";
import { UserLogin, UserLoginReturn } from "../interfaces/user.interface";
import { AppError } from "../errors/AppError";
import { sign } from "jsonwebtoken";

export class UserService {
  public create = async (payLoad: UserCreate): Promise<UserReturn> => {
    payLoad.password = await hash(payLoad.password, 10);

    const newUser = await prisma.user.create({ data: payLoad });
    return userReturnSchema.parse(newUser);
  };

  public login = async ({
    email,
    password,
  }: UserLogin): Promise<UserLoginReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }

    const passwordMatch = await compare(password, foundUser.password);

    if (!passwordMatch) {
      throw new AppError("Email and password doesn't match", 401);
    }

    const secret = process.env.JWT_SECRET!;

    const token: string = sign({ email: foundUser.email }, secret, {
      subject: foundUser.id.toString(),
      expiresIn: "1h",
    });

    return {
      accessToken: token,
      user: userReturnSchema.parse(foundUser),
    };
  };

  public retrieve = async (userId: number): Promise<UserReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { id: userId } });

    return userReturnSchema.parse(foundUser);
  };
}
