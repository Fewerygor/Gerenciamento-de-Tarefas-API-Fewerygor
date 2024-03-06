import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { ensure } from "../middlewares/ensure.middleware";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/", ensure.validBody, controller.create);
categoryRouter.delete("/", ensure.validCategory, controller.delete);
