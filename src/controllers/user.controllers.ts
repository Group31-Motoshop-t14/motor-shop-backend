import { Request, Response } from "express";
import { createUserService } from "../services/user.services";
import { ICreateUserResponse } from "../interfaces";

const createUserController = async (req: Request, res: Response) => {
    const newUser: ICreateUserResponse = await createUserService(req.body)

    return res.status(201).json(newUser)
}
const listUserController = async (req: Request, res: Response) => {
    return res.status(200).json({message: "List the current logged user"})
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