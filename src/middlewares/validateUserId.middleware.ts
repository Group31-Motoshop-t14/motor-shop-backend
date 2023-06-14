import { Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { AppError } from "../errors";

const validateUserIdMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId: string | undefined = res.locals.id ? res.locals.id : req.params.id

    if (!userId) {
        throw new AppError("User Id required", 400)
    }
    
    const user: Users | null = await prisma.users.findFirst({where: {
        id: userId
    }})

    if (!user) {
        throw new AppError("User not found", 404)
    }
    return next()
}

export default validateUserIdMiddleware