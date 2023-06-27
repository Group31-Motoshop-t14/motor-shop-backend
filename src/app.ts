import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./errors";
import {
  carsRoutes,
  commentsRoutes,
  filterRoutes,
  userRoutes,
} from "./routers";
import { loginRoutes } from "./routers/login.routes";
import swaggerDocs from "./swagger.json";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/cars", carsRoutes);
app.use("/comments", commentsRoutes);
app.use("/filters", filterRoutes);

app.use(errorHandler);

export default app;
