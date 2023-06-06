import { PrismaClient, Users } from "@prisma/client";
import { ILogin } from "../interfaces";
import { AppError } from "../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";


const createLoginService = async (data: ILogin): Promise<string> => {
    const prisma = new PrismaClient()
    const user: Users | null = await prisma.users.findFirst({where: {email: data.email}})
    if(!user) {
    throw new AppError("Invalid credentials", 401)
    }
    
    const passwordCompare = await compare(data.password, user.password)

    if(!passwordCompare) {
    throw new AppError("Invalid credentials", 401)
    }

    const token: string = jwt.sign(
        {
            isAdvertiser: user.isAdvertiser
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: String(user.id)
        }
    )
    return token

}

export {
    createLoginService
}