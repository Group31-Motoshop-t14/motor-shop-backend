import { CarImages, Cars, PrismaClient } from "@prisma/client";
import { ICars, ICarsImage, ICarsResponse, ICarsUpdate, IUser } from "../interfaces";
import { carsSchema, carsSchemaResponse, carsSchemaUpdate } from "../schemas";
import { AppError } from "../errors";

const createCarsService = async (data: ICars, userId: string): Promise<ICarsResponse> => {

    const prisma = new PrismaClient()

    const carsData: ICars = carsSchema.parse(data)

    const newCar: ICars = await prisma.cars.create({
        data: {
            ...carsData,
            userId: userId
        }
    })

    return carsSchemaResponse.parse(newCar)

}

const getCarsService = async (): Promise<ICars[]> => {

    const prisma = new PrismaClient()

    const cars: ICars[] = await prisma.cars.findMany()

    return cars
}

const getCarsUserIdService = async (userId: string): Promise<ICars[]> => {

    const prisma = new PrismaClient()

    const cars: ICars[] = await prisma.cars.findMany({
        where: {
            userId: userId
        }
    })

    return cars
}

const getCarsIdService = async (carId: string): Promise<ICars> => {

    const prisma = new PrismaClient()

    const cars: any = await prisma.cars.findUnique({
        where: {
            id: carId
        }
    })

    return cars
}

const updateCarsIdService = async (carId: string, data: any, userId: string): Promise<ICarsUpdate> => {

    const prisma = new PrismaClient()

    const carsData: any = await prisma.cars.findFirst({
        where: {
            id: carId
        }
    })

    if(carsData.userId != userId){
        throw new AppError("You can only update your ads", 403)
    }

    const cars: ICars = await prisma.cars.update({
        where: {
            id: carId
        },
        data: {
            ...data
        }
    })

    return cars

}

const deleteCarsIdService = async (carId: string, userId: string): Promise<void> => {

    const prisma = new PrismaClient()

    const carsData: any = await prisma.cars.findFirst({
        where: {
            id: carId
        }
    })

    if(carsData.userId != userId){
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