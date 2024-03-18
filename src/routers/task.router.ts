import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { ensure } from "../middlewares/ensure.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const taskRouter = Router();
const controller = new TaskController();

taskRouter.use(verifyToken.isAutheticated);

taskRouter.post(
  "/",
  ensure.validBody(taskCreateSchema),
  ensure.validCategory,
  controller.create
);
taskRouter.get("/", controller.read);

taskRouter.use("/:id", ensure.validTask, verifyToken.isTaskOwner,);

taskRouter.get("/:id", controller.retrieve);
taskRouter.patch(
  "/:id",
  ensure.validBody(taskUpdateSchema),
  ensure.validCategory,
  controller.update
);
taskRouter.delete("/:id", controller.delete);
