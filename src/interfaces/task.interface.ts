import { z } from "zod";
import {
  taskCreateReturnSchema,
  taskCreateSchema,
  taskGetReturnSchema,
  taskUpdateSchema,
} from "../schemas/task.schema";

export type TaskCreate = z.infer<typeof taskCreateSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;
export type TaskGetReturn = z.infer<typeof taskGetReturnSchema>;
export type TaskCreatReturn = z.infer<typeof taskCreateReturnSchema>;
