import { NextFunction, Request, Response } from "express";
import { ICreateUserResponse } from "../interfaces";
import { IListUser } from "../interfaces/user.interfaces";
import {
  createLoginService,
  createUserService,
  deleteUserService,
  listAllUsersService,
  listUserService,
  recoverUserService,
  updateUserService,
} from "../services";
import {
  resetPasswordService,
  sendEmailResetPasswordService,
} from "../services/user.services";

const createUserController = async (req: Request, res: Response) => {
  const newUser: ICreateUserResponse = await createUserService(req.body);

  return res.status(201).json(newUser);
};
const listUserController = async (req: Request, res: Response) => {
  const user: ICreateUserResponse = await listUserService(res.locals.id);

  return res.status(200).json(user);
};

const listUserProfileController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user: ICreateUserResponse = await listUserService(userId);

  return res.status(200).json(user);
};

const listAllUsersController = async (req: Request, res: Response) => {
  const allUsers: IListUser[] = await listAllUsersService();
  return res.status(200).json(allUsers);
};

const updateUserController = async (req: Request, res: Response) => {
  const updatedUser: ICreateUserResponse = await updateUserService(
    req.body,
    res.locals.id
  );
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(res.locals.id);
  return res.status(204).json();
};
const recoverUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken: string = await createLoginService(req.body);
  await recoverUserService(userToken, req.body.email);
  return res.status(204).json();
};

const sendEmailResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  await sendEmailResetPasswordService(email);

  return res.status(200).json({ message: "Token send" });
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);
  return res
    .status(200)
    .json({ message: "Password has been changed with success" });
};

export {
  createUserController,
  listAllUsersController,
  listUserController,
  deleteUserController,
  recoverUserController,
  updateUserController,
  listUserProfileController,
  sendEmailResetPasswordController,
  resetPasswordController,
};
