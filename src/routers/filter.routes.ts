import { Router } from "express";
import { filterCarsController } from "../controllers";

const filterRoutes: Router = Router();

filterRoutes.get("", filterCarsController);

export { filterRoutes };
