import { Fuel } from "@prisma/client";
import { z } from "zod";

const carsSchema = z.object({
    brand: z.string().max(150).nonempty(),
    model: z.string().max(150).nonempty(),
    year: z.string().min(4).max(4).nonempty(),
    fuelType: z.nativeEnum(Fuel),
    mileage: z.number().int().nonnegative(),
    color: z.string().min(4).max(150).nonempty(),
    fipePrice: z.number().nonnegative(),
    price: z.number().min(50000),
    description: z.string().min(10).nonempty(),
    coverImage: z.string().nonempty(),
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

const carsSchemaUpdate = carsSchemaResponseWithImage.partial().omit({
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