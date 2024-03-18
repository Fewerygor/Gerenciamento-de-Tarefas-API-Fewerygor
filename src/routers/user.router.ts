import { Router } from "express";
import { ensure } from "../middlewares";
import { userCreateSchema } from "../schemas";
import { UserController } from "../controllers/userController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { userLoginSchema } from "../schemas/user.schema";

export const userRouter = Router();
const controller = new UserController();

userRouter.post(
  "/",
  ensure.validBody(userCreateSchema),
  ensure.emailIsUnique,
  controller.create
);
userRouter.post("/login", ensure.validBody(userLoginSchema), controller.login);
userRouter.get("/profile", verifyToken.isAutheticated, controller.retrieve);
