import { PrismaClient, Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const validateEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const prisma = new PrismaClient()
    const verifyUserEmail: Users | null = await prisma.users.findFirst({where: {email: req.body.email}})
    if (verifyUserEmail) {
        throw new AppError("This email is already in use", 400)
    }
        return next()
}

export default validateEmailExistsMiddleware