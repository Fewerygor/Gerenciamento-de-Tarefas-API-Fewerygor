import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categoryCreateSchema, categorySchema } from "./category.schema";

export const taskSchema = baseSchema.extend({
  title: z.string(),
  content: z.string(),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish(),
});

export const taskCreateSchema = taskSchema.omit({ id: true });
export const taskUpdateSchema = taskCreateSchema.partial();
export const taskCreateReturnSchema = taskSchema;
export const taskGetReturnSchema = taskSchema
  .extend({ category: categorySchema.nullish() })
  .omit({ categoryId: true });
