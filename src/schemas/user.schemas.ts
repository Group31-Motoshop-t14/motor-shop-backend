import { z } from "zod";

const addressSchema = z.object({
    zipCode: z.string().length(8),
    state: z.string().length(2),
    city: z.string().max(100),
    street: z.string().max(100),
    number: z.string().max(50),
    complement: z.string().max(100).nullable(),
})

const addressSchemaResponse = addressSchema.extend({
    id: z.string(),    
})


const userSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().max(100).email(),
    cpf: z.string().length(11),
    password: z.string().min(6).max(120),
    phone: z.string().length(13),
    birth_date: z.string(),
    description: z.string(),
    is_advertiser: z.boolean().default(false),
})

const userSchemaResponse = userSchema.extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

const createUserSchema = userSchema.extend({    
    zipCode: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string()
})

const createUserSchemaResponse = userSchemaResponse.extend({    
    address: addressSchemaResponse
}).omit({password: true})

export {
    userSchema,
    addressSchema,
    createUserSchema,
    createUserSchemaResponse
}