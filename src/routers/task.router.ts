import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { ensure } from "../middlewares/ensure.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";

export const taskRouter = Router();
const controller = new TaskController();

taskRouter.post("/",ensure.validBody(taskCreateSchema), ensure.validCategory, controller.create);
taskRouter.get("/", controller.read);
taskRouter.use("/:id", ensure.validTask)
taskRouter.get("/:id", controller.retrieve);
taskRouter.patch(
  "/:id",
  ensure.validBody(taskUpdateSchema),
  ensure.validCategory,
  controller.update
);
taskRouter.delete("/:id", controller.delete);
