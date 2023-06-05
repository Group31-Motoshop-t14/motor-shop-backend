import { z } from "zod";

const addressSchema = z.object({
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
})

const userSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().max(100).email(),
    cpf: z.string().length(11),
    password: z.string().min(6).max(120),
    phone: z.string().length(13),
    birth_date: z.date(),
    description: z.string(),
    is_advertiser: z.boolean().default(false),
})

const createUserSchema = userSchema.extend({
    address: addressSchema
})

const createUserSchemaResponse = createUserSchema.omit({password: true}).extend({
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string(),
})
export {
    userSchema,
    addressSchema,
    createUserSchema,
    createUserSchemaResponse
}