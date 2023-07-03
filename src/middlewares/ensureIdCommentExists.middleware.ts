import { Comment } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../server";

const ensureIdCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentData: Comment | null = await prisma.comment.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!commentData) {
    throw new AppError("Comment id not found", 404);
  }

  return next();
};

export default ensureIdCommentExistsMiddleware;
