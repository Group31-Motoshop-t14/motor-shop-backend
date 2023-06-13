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
  price: z.number().min(1),
  description: z.string().min(10).nonempty(),
  coverImage: z.string().url().nonempty(),
});

const carsSchemaResponse = carsSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  isPublished: z.boolean().default(false),
});

const imageSchema = z.object({
  url: z.array(z.string()),
});

const imageSchemaResponse = z.object({
  id: z.string(),
  url: z.string().url(),
  carId: z.string(),
});

const carsSchemaResponseWithImage = carsSchemaResponse.extend({
  images: z.array(imageSchemaResponse),
});

const createCarSchema = carsSchema.extend({
  url: z.array(z.string().url()),
});

const carsSchemaUpdate = createCarSchema
  .partial()
  .extend({
    isPublished: z.boolean().optional(),
  })
  .omit({
    url: true,
  });

const imageUpdate = imageSchemaResponse.partial().omit({
  carId: true,
  id: true,
});

const imageCreateSchema = imageSchemaResponse.omit({
  carId: true,
  id: true,
});

export {
  carsSchema,
  carsSchemaResponse,
  carsSchemaUpdate,
  carsSchemaResponseWithImage,
  createCarSchema,
  imageSchema,
  imageSchemaResponse,
  imageUpdate,
  imageCreateSchema,
};
