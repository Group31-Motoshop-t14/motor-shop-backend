import { Router } from "express";
import {
  ensureIdCarExistsMiddleware,
  validateBodyMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { createCommentController, getCommentsController } from "../controllers";
import { commentSchema } from "../schemas";

const commentsRoutes: Router = Router();

commentsRoutes.post(
  "/:id",
  validateTokenMiddleware,
  validateBodyMiddleware(commentSchema),
  createCommentController
);

commentsRoutes.get("/:id", ensureIdCarExistsMiddleware, getCommentsController);

export { commentsRoutes };
