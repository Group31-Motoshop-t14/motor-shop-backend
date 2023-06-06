import { Router } from "express";
import { createLoginController } from "../controllers";
import { validateBodyMiddleware } from "../middlewares";
import { createLoginSchema } from "../schemas";


const loginRoutes: Router = Router()

loginRoutes.post("", validateBodyMiddleware(createLoginSchema), createLoginController)

export {
    loginRoutes
}