import { Request, Response } from "express";
import { ICreateUserResponse, IUpdateUserResponse } from "../interfaces";
import { createUserService, listUserService } from "../services";
import { Users } from ".prisma/client";

const createUserController = async (req: Request, res: Response) => {
    const newUser: ICreateUserResponse = await createUserService(req.body)

    return res.status(201).json(newUser)
}
const listUserController = async (req: Request, res: Response) => {
    const user: IUpdateUserResponse = await listUserService(res.locals.id)

    return res.status(200).json(user)
}

const listAllUsersController = async (req: Request, res: Response) => {
    return res.status(200).json({message: "List all users"})
}

const updateUserController = async (req: Request, res: Response) => {
    return res.status(200).json({message: "Updates a user"})
}

const deleteUserController = async (req: Request, res: Response) => {
    return res.status(204).json({message: "Deletes a user"})
}

export {
    createUserController,
    listAllUsersController,
    listUserController,
    updateUserController,
    deleteUserController
}