import { Request, Response } from "express";
import { ICars, ICarsResponse, ICarsUpdate } from "../interfaces";
import { createCarsService, deleteCarsIdService, getCarsIdService, getCarsService, getCarsUserIdService, updateCarsIdService } from "../services";
import { Cars } from "@prisma/client";

const createCarsController = async (req: Request, res: Response) => {
    const userId = res.locals.id
    const newCar: ICarsResponse = await createCarsService(req.body, userId)
    return res.status(201).json(newCar)
}

const getCarsController = async (req: Request, res: Response) => {
    const cars: ICars[] = await getCarsService()
    return res.status(201).json(cars)
}

const getCarsIdUserController = async (req: Request, res: Response) => {
    const userId = req.params.id
    const cars: ICars[] = await getCarsUserIdService(userId)
    return res.status(201).json(cars)
}

const getCarsIdController = async (req: Request, res: Response) => {
    const carId = req.params.id
    const car: ICars = await getCarsIdService(carId)
    return res.status(201).json(car)
}

const updateCarsIdController = async (req: Request, res: Response) => {
    const carId = req.params.id
    const userId = res.locals.id
    const car: ICarsUpdate = await updateCarsIdService(carId, req.body, userId)
    return res.status(201).json(car)
}

const deleteCarsIdController = async (req: Request, res: Response) => {
    const carId = req.params.id
    const userId = res.locals.id
    await deleteCarsIdService(carId, userId)
    return res.status(204).json()
}

export {
    createCarsController,
    getCarsController,
    getCarsIdUserController,
    getCarsIdController,
    updateCarsIdController,
    deleteCarsIdController
}