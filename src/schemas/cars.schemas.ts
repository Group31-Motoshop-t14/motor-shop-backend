import { Fuel } from "@prisma/client";
import { z } from "zod";

const carsSchema = z.object({
    brand: z.string().max(150),
    model: z.string().max(150),
    year: z.string().min(4).max(4),
    fuelType: z.nativeEnum(Fuel),
    mileage: z.number().int().nonnegative(),
    color: z.string().max(150),
    fipePrice: z.number().nonnegative(),
    price: z.number(),
    description: z.string(),
    coverImage: z.string(),
})


const carsSchemaResponse = carsSchema.extend({
    id: z.string(),
    createdAt: z.date(),
    isPublished: z.boolean().default(false),
})

const imageSchema = z.object({
    url: z.array(z.string())
})

const imageSchemaResponse = z.object({
    url: z.string(),
    id: z.string(),
    carId: z.string()
})

const carsSchemaResponseWithImage = carsSchemaResponse.extend({
    images: z.array(imageSchemaResponse)
})

const createCarSchema = carsSchema.extend({
    url: z.array(z.string())
})

const carsSchemaUpdate = carsSchemaResponse.partial().omit({
    id: true,
    createdAt: true,
    userId: true
})

export {
    carsSchema,
    carsSchemaResponse,
    carsSchemaUpdate,
    carsSchemaResponseWithImage,
    createCarSchema,
    imageSchema,
    imageSchemaResponse
}