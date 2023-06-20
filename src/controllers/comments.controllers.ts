import { Request, Response } from "express";
import { createCommentService, getCommentsService } from "../services";

const createCommentController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const userId = res.locals.id;

  const newComment = await createCommentService(req.body, userId, carId);

  return res.status(201).json(newComment);
};

const getCommentsController = async (req: Request, res: Response) => {
  const carId = req.params.id;

  const comments = await getCommentsService(carId);

  return res.status(200).json(comments);
};

export { createCommentController, getCommentsController };
