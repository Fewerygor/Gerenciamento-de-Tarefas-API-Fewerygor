import { z } from "zod";
import { baseSchema } from "./base.schema";

export const userSchema = baseSchema.extend({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userReturnSchema = userSchema.omit({ password: true });
export const userLoginSchema = userSchema.pick({ email: true, password: true });
