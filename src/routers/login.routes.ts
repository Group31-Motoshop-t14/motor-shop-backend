import { Router } from "express";
import { createLoginController } from "../controllers";
import { validateBodyMiddleware, verifyUserIsDeletedMiddleware } from "../middlewares";
import { createLoginSchema } from "../schemas";


const loginRoutes: Router = Router()

loginRoutes.post("", validateBodyMiddleware(createLoginSchema), verifyUserIsDeletedMiddleware, createLoginController)

export {
    loginRoutes
}