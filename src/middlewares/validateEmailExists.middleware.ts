import { Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../server";

const validateEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verifyUserEmail: Users | null = await prisma.users.findFirst({
    where: { email: req.body.email },
  });
  if (verifyUserEmail) {
    throw new AppError("This email is already in use", 409);
  }
  return next();
};

export default validateEmailExistsMiddleware;
