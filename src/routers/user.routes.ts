import { Router } from "express";
import { createUserController } from "../controllers";
import { validateBodyMiddleware } from "../middlewares";
import { createUserSchema } from "../schemas";

const userRoutes: Router = Router()

userRoutes.post(
    "",
    validateBodyMiddleware(createUserSchema),
    createUserController
)

export {
    userRoutes
}