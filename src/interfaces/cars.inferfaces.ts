import { z } from "zod";
import { 
    carsSchema,
    carsSchemaResponse,
    carsSchemaUpdate,
    carsImagesSchema,
    carsImagesSchemaResponse
} from "../schemas";

export type ICars = z.infer<typeof carsSchema>
export type ICarsResponse = z.infer<typeof carsSchemaResponse>
export type ICarsUpdate = z.infer<typeof carsSchemaUpdate>

export type ICarsImage = z.infer<typeof carsImagesSchema>
export type ICarsImageResponse = z.infer<typeof carsImagesSchemaResponse>