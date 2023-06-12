import { Cars, PrismaClient, Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../server";

const ensureIdCarExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const carsData: Cars | null = await prisma.cars.findFirst({
        where: {
            id: req.params.id
        }
    })

    if(!carsData){
        throw new AppError("Car id not exists", 404)
    }
    
    return next()
}

export default ensureIdCarExistsMiddleware