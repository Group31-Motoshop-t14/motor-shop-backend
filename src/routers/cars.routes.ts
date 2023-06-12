import { Router } from "express";
import { createCarsController, createImagesCarController, deleteCarsIdController, getCarsController, getCarsIdController, getCarsIdUserController, updateCarsIdController, updateImagesCarController } from "../controllers";
import { ensureIdCarExistsMiddleware, validateBodyMiddleware, validateTokenMiddleware, verifyAdvertiserMiddleware } from "../middlewares";
import { carsSchema, carsSchemaUpdate, createCarSchema, imageCreateSchema, imageSchema, imageUpdate } from "../schemas";

const carsRoutes: Router = Router()

carsRoutes.post("", validateTokenMiddleware, verifyAdvertiserMiddleware, validateBodyMiddleware(createCarSchema), createCarsController)
carsRoutes.get("", getCarsController)
carsRoutes.get("/user/:id", getCarsIdUserController)
carsRoutes.get("/:id", ensureIdCarExistsMiddleware, getCarsIdController)
carsRoutes.patch("/:id", validateTokenMiddleware, verifyAdvertiserMiddleware, ensureIdCarExistsMiddleware, validateBodyMiddleware(carsSchemaUpdate), updateCarsIdController)
carsRoutes.patch("/:id/image/:imageId", validateTokenMiddleware, verifyAdvertiserMiddleware, ensureIdCarExistsMiddleware, validateBodyMiddleware(imageUpdate), updateImagesCarController)
carsRoutes.post("/:id/image", validateTokenMiddleware, verifyAdvertiserMiddleware, ensureIdCarExistsMiddleware, validateBodyMiddleware(imageCreateSchema), createImagesCarController)
carsRoutes.delete("/:id", validateTokenMiddleware, verifyAdvertiserMiddleware, ensureIdCarExistsMiddleware, deleteCarsIdController)

export {
    carsRoutes
}