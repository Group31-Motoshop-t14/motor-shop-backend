import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, listUserController, recoverUserController, updateUserController } from "../controllers";
import {
    validateBodyMiddleware, 
    validateCpfMiddleware, 
    validateEmailExistsMiddleware, 
    validateTokenMiddleware
} from "../middlewares";

import { createLoginSchema, createUserSchema, updateUserSchema } from "../schemas";

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
    "/all",    
    validateTokenMiddleware,
    listAllUsersController
)

userRoutes.delete(
    "",    
    validateTokenMiddleware,
    deleteUserController
)

userRoutes.put(
    "",    
    validateBodyMiddleware(createLoginSchema),
    recoverUserController
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