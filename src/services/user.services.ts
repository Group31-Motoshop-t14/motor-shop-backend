import { Address, PrismaClient, Users } from "@prisma/client";
import { IAddress, ICreateUser, ICreateUserResponse, IUser } from "../interfaces";
import { addressSchema, createUserSchemaResponse, userSchema } from "../schemas";
import { AppError } from "../errors";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient()

const createUserService = async (data: ICreateUser): Promise<ICreateUserResponse> => {
    const userData: IUser = userSchema.parse(data)
    const addressData: IAddress = addressSchema.parse(data)

    const newUser: Users = await prisma.users.create({
        data: {
            ...userData, 
            password: hashSync(userData.password, 9),
            birth_date: new Date(userData.birth_date)
        }
    })
    
    const userAddress: Address = await prisma.address.create({
        data: {
            ...addressData, 
            userId: newUser.id
        }
    })
    
    const objResponse: ICreateUserResponse = {
        ...newUser,
        birth_date: newUser.birth_date.toLocaleDateString(),
        createdAt: newUser.createdAt.toLocaleDateString(),
        updatedAt: newUser.updatedAt.toLocaleDateString(),
        address: {...userAddress}
    }

    return createUserSchemaResponse.parse(objResponse)
}

export {
    createUserService
}