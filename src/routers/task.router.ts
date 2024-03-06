import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { ensure } from "../middlewares/ensure.middleware";

export const taskRouter = Router();
const controller = new TaskController();

taskRouter.post("/", controller.create);
taskRouter.get("/",  controller.read);
taskRouter.get("/:id", ensure.validTask, controller.retrieve);
taskRouter.patch(
  "/:id",
  ensure.validTask,
  ensure.validCategory,
  controller.update
);
taskRouter.delete("/:id", ensure.validTask, controller.delete);
