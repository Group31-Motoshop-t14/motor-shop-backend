import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import { errorHandler } from "./errors";
import { userRoutes } from "./routers";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use("/user", userRoutes)

export default app;
