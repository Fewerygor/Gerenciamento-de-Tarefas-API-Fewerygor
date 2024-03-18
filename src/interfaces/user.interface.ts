import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../schemas";
import { userLoginSchema } from "../schemas/user.schema";

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserLoginReturn = {
  accessToken: string;
  user: UserReturn;
};
