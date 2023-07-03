import { Request, Response } from "express";
import {
  createCommentService,
  deleteCommentsService,
  getCommentsService,
  updateCommentsService,
} from "../services";
import { ICommentsUpdate } from "../interfaces/comments.interface";

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

const deleteCommentsController = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const userId = res.locals.id;

  await deleteCommentsService(commentId, userId);

  return res.status(204).json();
};

const updateCommentsController = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const userId = res.locals.id;

  const comment: ICommentsUpdate = await updateCommentsService(
    commentId,
    userId,
    req.body
  );

  return res.status(200).json(comment);
};

export {
  createCommentController,
  getCommentsController,
  deleteCommentsController,
  updateCommentsController,
};
