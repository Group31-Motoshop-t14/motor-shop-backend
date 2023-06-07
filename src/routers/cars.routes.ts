import { Router } from "express";
import { createCarsController, deleteCarsIdController, getCarsController, getCarsIdController, getCarsIdUserController, updateCarsIdController } from "../controllers";
import { ensureIdCarExistsMiddleware, validateBodyMiddleware, validateTokenMiddleware, verifyAdvertiserMiddleware } from "../middlewares";
import { carsSchema, carsSchemaUpdate, createCarSchema } from "../schemas";

const carsRoutes: Router = Router()

carsRoutes.post("", validateTokenMiddleware, verifyAdvertiserMiddleware, validateBodyMiddleware(createCarSchema), createCarsController)
carsRoutes.get("", getCarsController)
carsRoutes.get("/user/:id", getCarsIdUserController)
carsRoutes.get("/:id", ensureIdCarExistsMiddleware, getCarsIdController)
carsRoutes.patch("/:id", validateTokenMiddleware, verifyAdvertiserMiddleware, ensureIdCarExistsMiddleware, validateBodyMiddleware(carsSchemaUpdate), updateCarsIdController)
carsRoutes.delete("/:id", validateTokenMiddleware, verifyAdvertiserMiddleware, ensureIdCarExistsMiddleware, deleteCarsIdController)

export {
    carsRoutes
}