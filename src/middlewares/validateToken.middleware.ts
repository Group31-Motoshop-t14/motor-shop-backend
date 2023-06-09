import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const validateTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token: string | undefined = req.headers.authorization?.split(" ")[1]

    if(!token) {
        throw new AppError("Missing bearer token", 401)
    }

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error) {
            throw new AppError(error.message, 401)
        }
        res.locals = {
            id: decoded.sub,
            name: decoded.name,
            isAdvertiser: decoded.isAdvertiser,
            isDeleted: decoded.isDeleted
        }
    })
    return next()
}

export default validateTokenMiddleware