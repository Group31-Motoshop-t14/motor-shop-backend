import { Router } from "express";
import { createUserController, listUserController } from "../controllers";
import {
    validateBodyMiddleware, 
    validateCpfMiddleware, 
    validateEmailMiddleware 
} from "../middlewares";

import { createUserSchema } from "../schemas";

const userRoutes: Router = Router()

userRoutes.post(
    "",
    validateBodyMiddleware(createUserSchema),
    validateEmailMiddleware,
    validateCpfMiddleware,
    createUserController
)
userRoutes.get(
    "",    
    listUserController
)

export {
    userRoutes
}