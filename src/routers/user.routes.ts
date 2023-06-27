import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  listUserController,
  listUserProfileController,
  recoverUserController,
  updateUserController,
} from "../controllers";
import {
  resetPasswordController,
  sendEmailResetPasswordController,
} from "../controllers/user.controllers";
import {
  validateBodyMiddleware,
  validateCpfMiddleware,
  validateEmailExistsMiddleware,
  validateTokenMiddleware,
  validateUserIdMiddleware,
} from "../middlewares";
import {
  createLoginSchema,
  createUserSchema,
  updateUserSchema,
} from "../schemas";
import {
  resetPasswordSchema,
  sendEmailResetPasswordSchema,
} from "../schemas/user.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateBodyMiddleware(createUserSchema),
  validateEmailExistsMiddleware,
  validateCpfMiddleware,
  createUserController
);
userRoutes.get("", validateTokenMiddleware, listUserController);

userRoutes.get("/all", validateTokenMiddleware, listAllUsersController);

userRoutes.get(
  "/profile/:id",
  validateUserIdMiddleware,
  listUserProfileController
);

userRoutes.delete("", validateTokenMiddleware, deleteUserController);

userRoutes.put(
  "",
  validateBodyMiddleware(createLoginSchema),
  recoverUserController
);

userRoutes.patch(
  "",
  validateTokenMiddleware,
  validateBodyMiddleware(updateUserSchema),
  updateUserController
);

userRoutes.post(
  "/resetPassword",
  validateBodyMiddleware(sendEmailResetPasswordSchema),
  sendEmailResetPasswordController
);

userRoutes.patch(
  "/resetPassword/:token",
  validateBodyMiddleware(resetPasswordSchema),
  resetPasswordController
);

export { userRoutes };
