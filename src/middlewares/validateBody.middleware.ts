import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";

const validateBodyMiddleware = 
    (schema: ZodTypeAny) => 
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.birthDate) {            
            if(!Date.parse(req.body.birthDate)) {
                throw new AppError(
                    "Invalid datetime string, datetime must be in format YYYY-MM-DDTHH:MM:SSZ", 
                    400)
            }
        }
        
        const validated = schema.parse(req.body)
        req.body = validated

        return next()
}

export default validateBodyMiddleware