import { z } from "zod";
import { baseSchema } from "./base.schema";

export const categorySchema = baseSchema.extend({
  name: z.string(),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoryReturnSchema = categorySchema;
