import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateBodyMiddleware = 
    (schema: ZodTypeAny) => 
    (req: Request, res: Response, next: NextFunction) => {
        const validated = schema.parse(req.body)
        req.body = validated
        return next()
}

export default validateBodyMiddleware