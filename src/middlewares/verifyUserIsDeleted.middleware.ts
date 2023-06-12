import { PrismaClient, Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../server";

const verifyUserIsDeletedMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const user: Users | null = await prisma.users.findFirst({where: {email: req.body.email}})
    if(user?.isDeleted) {
        throw new AppError("User inactive", 403)
    }
    return next()
}

export default verifyUserIsDeletedMiddleware