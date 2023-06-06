import { Router } from "express";
import { createUserController, listUserController } from "../controllers";
import { validateBodyMiddleware } from "../middlewares";
import { createUserSchema } from "../schemas";

const userRoutes: Router = Router()

userRoutes.post(
    "",
    validateBodyMiddleware(createUserSchema),
    createUserController
)
userRoutes.get(
    "",    
    listUserController
)

export {
    userRoutes
}