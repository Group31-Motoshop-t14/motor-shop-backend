import { CarImages, Cars, Fuel, Prisma } from "@prisma/client";
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
import { carsSchema, imageSchema } from "../schemas";
import { prisma } from "../server";
import { TFilterRequest } from "../interfaces/cars.inferfaces";

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
    throw new AppError("image not exists", 404);
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

const fuelTypeMapping: Record<string, Fuel> = {
  ETANOL: "ETANOL",
  FLEX: "FLEX",
  HIBRIDO: "HIBRIDO",
  ELETRICO: "ELETRICO",
};

const filterCarsService = async (
  data: TFilterRequest
): Promise<Cars[] | []> => {
  const {
    brand,
    model,
    year,
    fueltype,
    color,
    minkms,
    maxkms,
    minprice,
    maxprice,
  } = data;

  console.log(data);
  const brandFilter: Prisma.StringFilter | undefined = brand
    ? { equals: brand }
    : undefined;

  const modelFilter: Prisma.StringFilter | undefined = model
    ? { equals: model }
    : undefined;

  const yearFilter: Prisma.StringFilter | undefined = year
    ? { equals: year }
    : undefined;

  const mappedFuelType = fueltype
    ? fuelTypeMapping[fueltype.toUpperCase()]
    : undefined;

  const fuelFilter: Prisma.EnumFuelFilter | undefined = mappedFuelType
    ? { equals: mappedFuelType }
    : undefined;

  const colorFilter: Prisma.StringFilter | undefined = color
    ? { equals: color }
    : undefined;

  const minMileageFilter: Prisma.IntFilter | undefined =
    Number(minkms) !== undefined && Number(minkms) >= 0
      ? { gte: Number(minkms) }
      : undefined;

  const maxMileageFilter: Prisma.IntFilter | undefined =
    Number(maxkms) !== undefined && Number(maxkms) <= Infinity
      ? { lte: Number(maxkms) }
      : undefined;

  const minPriceFilter: Prisma.FloatFilter | undefined =
    Number(minprice) !== undefined && Number(minprice) >= 0
      ? { gte: Number(minprice) }
      : undefined;

  const maxPriceFilter: Prisma.FloatFilter | undefined =
    Number(maxprice) !== undefined && Number(maxprice) <= 0
      ? { lte: Number(maxprice) }
      : undefined;

  const cars = await prisma.cars.findMany({
    where: {
      brand: { ...brandFilter, mode: "insensitive" },
      model: { ...modelFilter, mode: "insensitive" },
      year: { ...yearFilter },
      fuelType: { ...fuelFilter },
      color: { ...colorFilter, mode: "insensitive" },
      mileage: {
        ...minMileageFilter,
        ...maxMileageFilter,
      },
      price: {
        ...minPriceFilter,
        ...maxPriceFilter,
      },
    },
  });

  return cars;
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
};
