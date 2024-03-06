import { z } from "zod";

export const baseSchema = z.object({
  id: z
    .bigint()
    .positive()
    .transform((id) => id.toLocaleString()),
});
