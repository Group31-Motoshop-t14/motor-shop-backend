import { Router } from "express";
import {
  ensureIdCarExistsMiddleware,
  ensureIdCommentExistsMiddleware,
  validateBodyMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import {
  createCommentController,
  deleteCommentsController,
  getCommentsController,
  updateCommentsController,
} from "../controllers";
import { commentSchema, commentSchemaUpdate } from "../schemas";

const commentsRoutes: Router = Router();

commentsRoutes.post(
  "/:id",
  validateTokenMiddleware,
  ensureIdCarExistsMiddleware,
  validateBodyMiddleware(commentSchema),
  createCommentController
);

commentsRoutes.get("/:id", ensureIdCarExistsMiddleware, getCommentsController);
commentsRoutes.delete(
  "/:id",
  validateTokenMiddleware,
  ensureIdCommentExistsMiddleware,
  deleteCommentsController
);
commentsRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  ensureIdCommentExistsMiddleware,
  validateBodyMiddleware(commentSchemaUpdate),
  updateCommentsController
);

export { commentsRoutes };
