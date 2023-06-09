import { CarImages, Cars, PrismaClient } from "@prisma/client";
import { ICarImage, ICarImageResponse, ICars, ICarsCreate, ICarsCreateResponse, ICarsUpdate, ICarsUpdateResponse } from "../interfaces";
import { carsSchema, carsSchemaResponseWithImage, imageSchema } from "../schemas";
import { AppError } from "../errors";

const createCarsService = async (data: ICarsCreate, userId: string): Promise<ICarsCreateResponse> => {

    const prisma = new PrismaClient()

    if(data.url.length === 0){
        throw new AppError("At least one image for gallery is required", 400)

    }

    data.url.forEach((urls) => {
        if (urls === ""){
            throw new AppError("Gallery images cannot be an empty strings", 400)
        }
    })

    const carsData: ICars = carsSchema.parse(data)
    const imageData: ICarImage = imageSchema.parse(data)

    const newCar: Cars = await prisma.cars.create({
        data: {
            ...carsData,
            userId: userId
        }
    })

    const gallery = await Promise.all(imageData.url.map(async(urls) => {
        const imageCar: ICarImageResponse = await prisma.carImages.create({
            data: {
                url: urls,
                carId: newCar.id
            }
        })
        return {...imageCar}
    }))


    const newObj: ICarsCreateResponse = {
        ...newCar,
        images: gallery
    }

    return carsSchemaResponseWithImage.parse(newObj)

}

const getCarsService = async (): Promise<ICars[]> => {

    const prisma = new PrismaClient()

    const cars: ICars[] = await prisma.cars.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    description: true
                }
            },
            carImages: true
        }
    })

    return cars
}

const getCarsUserIdService = async (userId: string): Promise<ICars[]> => {

    const prisma = new PrismaClient()

    const cars: ICars[] = await prisma.cars.findMany({
        where: {
            userId: userId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    description: true
                }
            },
            carImages: true
        }
    })

    return cars
}

const getCarsIdService = async (carId: string): Promise<ICars> => {

    const prisma = new PrismaClient()

    const cars: Cars | null = await prisma.cars.findUnique({
        where: {
            id: carId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    description: true
                }
            },
            carImages: true
        }
    })

    return cars!
}

const updateCarsIdService = async (carId: string, data: any, userId: string): Promise<ICarsUpdate> => {

    const prisma = new PrismaClient()

    const cars: Cars | null = await prisma.cars.findFirst({
        where: {
            id: carId
        }
    })

    if(cars!.userId != userId){
        throw new AppError("You can only update your ads", 403)
    }

    const updateCars: Cars = await prisma.cars.update({
        where: {
            id: carId
        },
        include: {
            carImages: true
        },
        data: {
            ...data
        }
    })

    return updateCars

}

const deleteCarsIdService = async (carId: string, userId: string): Promise<void> => {

    const prisma = new PrismaClient()

    const carsData: Cars | null = await prisma.cars.findFirst({
        where: {
            id: carId
        }
    })

    if(carsData!.userId != userId){
        throw new AppError("You can only delete your ads", 403)
    }

    await prisma.cars.delete({
        where: {
            id: carId
        }
    })

}

export {
    createCarsService,
    getCarsService,
    getCarsUserIdService,
    getCarsIdService,
    updateCarsIdService,
    deleteCarsIdService
}