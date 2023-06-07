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
    userId: z.string()
})

const carsSchemaUpdate = carsSchemaResponse.partial().omit({
    id: true,
    createdAt: true,
    userId: true
})

const carsImagesSchema = z.object({
    url: z.string(),
    carId: z.string()
})

const carsImagesSchemaResponse = carsImagesSchema.extend({
    id: z.string()
})

export {
    carsSchema,
    carsSchemaResponse,
    carsSchemaUpdate,
    carsImagesSchema,
    carsImagesSchemaResponse
}