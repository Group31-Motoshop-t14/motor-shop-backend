import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const verifyAdvertiserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const validated = res.locals.isAdvertiser

    if(validated === false){
        throw new AppError("Only advertiser users can create an ad", 403)
    }

    return next()
}

export default verifyAdvertiserMiddleware