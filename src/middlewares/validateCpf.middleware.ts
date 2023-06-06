import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { PrismaClient, Users } from "@prisma/client";

const validateCpfMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        const prisma = new PrismaClient()
        const verifyUserCPF: Users | null = await prisma.users.findFirst({where: {cpf: req.body.cpf}})
        if (verifyUserCPF) {
            throw new AppError("This CPF is already in use", 400)
        }
        return next()
}

export default validateCpfMiddleware