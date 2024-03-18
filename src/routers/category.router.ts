import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { ensure } from "../middlewares/ensure.middleware";
import { categoryCreateSchema } from "../schemas";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.use(verifyToken.isAutheticated);

categoryRouter.post(
  "/",
  ensure.validBody(categoryCreateSchema),
  controller.create
);
categoryRouter.delete(
  "/:id",
  ensure.categoryParams,
  verifyToken.isCategoryOwner,
  controller.delete
);
