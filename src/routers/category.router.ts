import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { ensure } from "../middlewares/ensure.middleware";
import { categoryCreateSchema } from "../schemas";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/", ensure.validBody(categoryCreateSchema), controller.create);
categoryRouter.delete("/:id", ensure.categoryParams, controller.delete);
