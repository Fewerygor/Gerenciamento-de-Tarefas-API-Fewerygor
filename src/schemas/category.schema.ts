import { z } from "zod";
import { baseSchema } from "./base.schema";

export const categorySchema = baseSchema.extend({
  name: z.string().min(1),
  userId: z.number().positive(),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoryReturnSchema = categorySchema;
