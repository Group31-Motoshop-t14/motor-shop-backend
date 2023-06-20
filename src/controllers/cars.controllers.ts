import { CarImages, Cars } from "@prisma/client";
import { Request, Response } from "express";
import { ICars, ICarsCreateResponse, ICarsUpdate } from "../interfaces";
import {
  createCarsService,
  createImageCarService,
  deleteCarsIdService,
  getCarsIdService,
  getCarsService,
  getCarsUserIdService,
  updateCarsIdService,
  updateImageCarService,
} from "../services";
import { filterCarsService } from "../services/cars.services";
import { TFilterRequest } from "../interfaces/cars.inferfaces";

const createCarsController = async (req: Request, res: Response) => {
  const userId = res.locals.id;
  const newCar: ICarsCreateResponse = await createCarsService(req.body, userId);
  return res.status(201).json(newCar);
};

const getCarsController = async (req: Request, res: Response) => {
  const cars: ICars[] = await getCarsService();
  return res.status(201).json(cars);
};

const getCarsIdUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const cars: ICars[] = await getCarsUserIdService(userId);
  return res.status(201).json(cars);
};

const getCarsIdController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const car: ICars = await getCarsIdService(carId);
  return res.status(201).json(car);
};

const updateCarsIdController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const userId = res.locals.id;
  const car: ICarsUpdate = await updateCarsIdService(carId, req.body, userId);
  return res.status(201).json(car);
};

const updateImagesCarController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const imageId = req.params.imageId;
  const userId = res.locals.id;
  const carImages: CarImages | null = await updateImageCarService(
    carId,
    req.body,
    imageId,
    userId
  );
  return res.status(201).json(carImages);
};

const createImagesCarController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const imageId = req.params.imageId;
  const userId = res.locals.id;
  const carImages: CarImages | null = await createImageCarService(
    carId,
    req.body,
    imageId,
    userId
  );
  return res.status(201).json(carImages);
};

const deleteCarsIdController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const userId = res.locals.id;
  await deleteCarsIdService(carId, userId);
  return res.status(204).json();
};

const filterCarsController = async (req: Request, res: Response) => {

  const body: TFilterRequest = req.body;
  const cars: Cars[] | [] = await filterCarsService(body)
  return res.status(200).json(cars);
}

export {
  createCarsController,
  getCarsController,
  getCarsIdUserController,
  getCarsIdController,
  updateCarsIdController,
  deleteCarsIdController,
  updateImagesCarController,
  createImagesCarController,
  filterCarsController
};
