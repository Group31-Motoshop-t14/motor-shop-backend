import { CarImages, Cars } from "@prisma/client";
import { AppError } from "../errors";
import {
  ICarImage,
  ICarImageCreate,
  ICarImageResponse,
  ICarImageUpdate,
  ICars,
  ICarsCreate,
  ICarsCreateResponse,
  ICarsUpdate,
} from "../interfaces";
import { TFilterRequest, TFilterResponse } from "../interfaces/cars.inferfaces";
import { carsSchema, imageSchema } from "../schemas";
import { prisma } from "../server";
import filterParams from "../utils/filter.utils";

const createCarsService = async (
  data: ICarsCreate,
  userId: string
): Promise<ICarsCreateResponse> => {
  if (data.url.length === 0) {
    throw new AppError("At least one image for gallery is required", 400);
  }

  data.url.forEach((urls) => {
    if (urls === "") {
      throw new AppError("Gallery images cannot be an empty strings", 400);
    }
  });

  const carsData: ICars = carsSchema.parse(data);
  const imageData: ICarImage = imageSchema.parse(data);

  const newCar: Cars = await prisma.cars.create({
    data: {
      ...carsData,
      userId: userId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          description: true,
        },
      },
    },
  });

  const gallery = await Promise.all(
    imageData.url.map(async (urls) => {
      const imageCar: ICarImageResponse = await prisma.carImages.create({
        data: {
          url: urls,
          carId: newCar.id,
        },
      });
      return { ...imageCar };
    })
  );

  const newObj: ICarsCreateResponse = {
    ...newCar,
    carImages: gallery,
  };

  return newObj;
};

const getCarsService = async (): Promise<ICars[]> => {
  const cars: ICars[] = await prisma.cars.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          description: true,
          phone: true,
        },
      },
      carImages: true,
    },
  });

  return cars;
};

const getCarsUserIdService = async (userId: string): Promise<ICars[]> => {
  const cars: ICars[] = await prisma.cars.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          description: true,
        },
      },
      carImages: true,
    },
  });

  return cars;
};

const getCarsIdService = async (carId: string): Promise<ICars> => {
  const cars: Cars | null = await prisma.cars.findUnique({
    where: {
      id: carId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          description: true,
        },
      },
      carImages: true,
    },
  });

  return cars!;
};

const updateCarsIdService = async (
  carId: string,
  data: ICarsUpdate,
  userId: string
): Promise<ICarsUpdate> => {
  const carsData: Cars | null = await prisma.cars.findFirst({
    where: {
      id: carId,
    },
  });

  if (carsData!.userId != userId) {
    throw new AppError("You can only update your ads", 403);
  }

  const updateCars: ICarsUpdate | null = await prisma.cars.update({
    where: {
      id: carId,
    },
    data: {
      brand: data.brand!,
      model: data.model!,
      year: data.year!,
      fuelType: data.fuelType!,
      mileage: data.mileage!,
      color: data.color!,
      fipePrice: data.fipePrice!,
      price: data.price!,
      description: data.description!,
      isPublished: data.isPublished!,
      coverImage: data.coverImage!,
    },
  });

  return updateCars;
};

const createImageCarService = async (
  carId: string,
  data: ICarImageUpdate,
  imageId: string,
  userId: string
): Promise<CarImages> => {
  const carsData: Cars | null = await prisma.cars.findFirst({
    where: {
      id: carId,
    },
  });

  if (carsData!.userId != userId) {
    throw new AppError("You can only create image for your cars", 403);
  }

  const imageCar: CarImages | undefined = await prisma.carImages.create({
    data: {
      url: data.url!,
      carId: carId,
    },
  });

  return imageCar;
};

const updateImageCarService = async (
  carId: string,
  data: ICarImageCreate,
  imageId: string,
  userId: string
): Promise<CarImages | null> => {
  const findImage: CarImages | null = await prisma.carImages.findFirst({
    where: {
      id: imageId,
    },
  });

  if (!findImage) {
    throw new AppError("Image id not found", 404);
  }

  if (findImage.carId != carId) {
    throw new AppError("You can update your images", 403);
  }

  const updateImage: CarImages | null = await prisma.carImages.update({
    where: {
      id: imageId,
    },
    data: {
      url: data.url!,
    },
  });

  return updateImage;
};

const deleteImageCarService = async (
  carId: string,
  imageId: string,
  userId: string
): Promise<void> => {
  const findImage: CarImages | null = await prisma.carImages.findFirst({
    where: {
      id: imageId,
    },
  });

  if (!findImage) {
    throw new AppError("Image id not found", 404);
  }

  if (findImage.carId != carId) {
    throw new AppError("You can delete your images", 403);
  }

  await prisma.carImages.delete({
    where: {
      id: imageId,
    },
  });
};

const deleteCarsIdService = async (
  carId: string,
  userId: string
): Promise<void> => {
  const carsData: Cars | null = await prisma.cars.findFirst({
    where: {
      id: carId,
    },
  });

  if (carsData!.userId != userId) {
    throw new AppError("You can only delete your ads", 403);
  }

  await prisma.cars.delete({
    where: {
      id: carId,
    },
  });
};

const filterCarsService = async (
  data: TFilterRequest
): Promise<TFilterResponse> => {
  const { url, searchParams } = filterParams(data);
  const { pageNumber, pageSize } = data;
  let page: number | undefined = 1;
  if (pageNumber) {
    page = Number(pageNumber) > 0 ? Number(pageNumber) : 1;
  }
  let perPage: number | undefined = 9;
  if (pageSize) {
    perPage =
      Number(pageSize) > 0 && Number(pageSize) <= 9 ? Number(pageSize) : 9;
  }

  let validParams = false;
  const arrayTest = [
    "brand",
    "model",
    "year",
    "fuelType",
    "color",
    "mileage",
    "price",
  ];
  const newSearchParams: any = { ...searchParams };
  arrayTest.forEach((params: string) => {
    if (newSearchParams[params]["equals"]) {
      validParams = true;
    }
  });

  let count = 0;
  if (validParams) {
    count = await prisma.cars.count({
      where: { ...searchParams, isPublished: true },
    });
  } else {
    count = await prisma.cars.count({
      where: { isPublished: true },
    });
  }

  const pages: number = Math.ceil(count / perPage!);

  const prevPage: string | null =
    page === 1 ? null : `${url}?pageNumber=${page! - 1}&pageSize=${perPage}`;
  const nextPage: string | null =
    page! + 1 > pages
      ? null
      : `${url}?pageNumber=${page! + 1}&pageSize=${perPage}`;

  const cars = await prisma.cars.findMany({
    where: { ...searchParams, isPublished: true },
    skip: page && perPage ? (page - 1) * perPage : 1,
    take: perPage ? perPage : 9,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          description: true,
        },
      },
      carImages: true,
    },
  });

  return {
    nextPage,
    prevPage,
    pages: pages,
    items: cars.length,
    data: cars,
  };
};

export {
  createCarsService,
  getCarsService,
  getCarsUserIdService,
  getCarsIdService,
  updateCarsIdService,
  deleteCarsIdService,
  updateImageCarService,
  createImageCarService,
  filterCarsService,
  deleteImageCarService,
};
