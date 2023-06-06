import { Address, PrismaClient, Users } from "@prisma/client";
import { IAddress, ICreateUser, ICreateUserResponse, IUpdateUserResponse, IUser } from "../interfaces";
import { addressSchema, createUserSchemaResponse, updateUserSchema, userSchema } from "../schemas";
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
            birthDate: new Date(userData.birthDate)
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
        birthDate: newUser.birthDate.toISOString(),
        createdAt: newUser.createdAt.toISOString(),
        updatedAt: newUser.updatedAt.toISOString(),
        address: {...userAddress}
    }
    
    return createUserSchemaResponse.parse(objResponse)
}

const listUserService = async (userId: string): Promise<IUpdateUserResponse> => {
    const prisma = new PrismaClient()
    const user: Users | null = await prisma.users.findFirstOrThrow({where: {id: userId}})

    return updateUserSchema.parse({
        ...user, 
        birthDate: String(user.birthDate), 
        createdAt: String(user.createdAt), 
        updatedAt: String(user.updatedAt)
    })
}
const listAllUsersService = async (): Promise<any> => {

    return "asd"
}

const deleteUserService = async (): Promise<any> => {

    return "asd"
}
export {
    createUserService,
    listUserService,
    listAllUsersService,
    deleteUserService
}