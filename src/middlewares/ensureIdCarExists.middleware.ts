import { PrismaClient, Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureIdCarExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const prisma = new PrismaClient()

    const carsData: any = await prisma.cars.findFirst({
        where: {
            id: req.params.id
        }
    })

    if(!carsData){
        throw new AppError("car id not exists", 404)
    }
    
    return next()
}

export default ensureIdCarExistsMiddleware