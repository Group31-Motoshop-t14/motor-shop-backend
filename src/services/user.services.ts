import { Address, PrismaClient, Users } from "@prisma/client";
import { IAddress, ICreateUser, ICreateUserResponse, IUser } from "../interfaces";
import { addressSchema, createUserSchemaResponse, userSchema } from "../schemas";
import { AppError } from "../errors";

const prisma = new PrismaClient()

const createUserService = async (data: ICreateUser): Promise<ICreateUserResponse> => {
    const userData: IUser = userSchema.parse(data)
    const addressData: IAddress = addressSchema.parse(data)

    const verifyUserEmail: Users | null = await prisma.users.findFirst({where: {email: userData.email}})
    if (verifyUserEmail) {
        throw new AppError("This email is already in use", 400)
    }
    const verifyUserCPF: Users | null = await prisma.users.findFirst({where: {cpf: userData.cpf}})
    if (verifyUserCPF) {
        throw new AppError("This CPF is already in use", 400)
    }
    
    const newUser: Users = await prisma.users.create({
        data: {...userData, birth_date: new Date(userData.birth_date)}
    })
    
    const userAddress: Address = await prisma.address.create({
        data: {...addressData, userId: newUser.id}
    })

    return {...userData, address: {...addressData}}
}

export {
    createUserService
}