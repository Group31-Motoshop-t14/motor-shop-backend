import { Router } from "express";
import { createUserController, listUserController, updateUserController } from "../controllers";
import {
    validateBodyMiddleware, 
    validateCpfMiddleware, 
    validateEmailExistsMiddleware, 
    validateTokenMiddleware
} from "../middlewares";

import { createUserSchema, updateUserSchema } from "../schemas";

const userRoutes: Router = Router()

userRoutes.post(
    "",
    validateBodyMiddleware(createUserSchema),
    validateEmailExistsMiddleware,
    validateCpfMiddleware,
    createUserController
)
userRoutes.get(
    "",    
    validateTokenMiddleware,
    listUserController
)

userRoutes.get(
    "",    
    validateTokenMiddleware,
    listUserController
)

userRoutes.patch(
    "",
    validateTokenMiddleware,
    validateBodyMiddleware(updateUserSchema),
    updateUserController
)

export {
    userRoutes
}