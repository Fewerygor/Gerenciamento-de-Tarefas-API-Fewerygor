import { z } from "zod";
import {
  categoryCreateSchema,
  categorySchema,
} from "../schemas/category.schema";

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryReturn = z.infer<typeof categorySchema>;
