import { z } from "zod";
import { 
    addressSchema,
    createUserSchema,
    createUserSchemaResponse,
    userSchema
} from "../schemas";

export type IUser = z.infer<typeof userSchema>
export type IAddress = z.infer<typeof addressSchema>
export type ICreateUser = z.infer<typeof createUserSchema>
export type ICreateUserResponse = z.infer<typeof createUserSchemaResponse>