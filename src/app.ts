import cors from "cors";
import "express-async-errors";
import "dotenv/config";
import express, { json } from "express";
import helmet from "helmet";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { taskRouter } from "./routers/task.router";
import { categoryRouter } from "./routers";
import { userRouter } from "./routers/user.router";

export const app = express();

app.use(cors());
app.use(json());
app.use(helmet());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.use(handleErrors);
