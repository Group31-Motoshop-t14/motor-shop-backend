import { IAddress, ICreateUser, IUser } from "../interfaces";
import { addressSchema, createUserSchemaResponse, userSchema } from "../schemas";

import { PrismaClient, Users } from ".prisma/client";
const prisma = new PrismaClient()

const createUserService = async (data: ICreateUser): Promise<Users> => {
    const userData: IUser = userSchema.parse(data)
    const addressData: IAddress = addressSchema.parse(data)

    const newUser: Users = await prisma.users.create({
        data: {
            ...userData,
            address: {...addressData}
        },

    })
    return newUser
}