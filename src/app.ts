import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import { carsRoutes, filterRoutes, userRoutes } from "./routers";
import { loginRoutes } from "./routers/login.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes)
app.use("/login", loginRoutes)
app.use("/cars", carsRoutes)
app.use("/filters", filterRoutes)

app.use(errorHandler);

export default app;
