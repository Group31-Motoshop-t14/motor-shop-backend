import { z } from "zod";
import { 
    carsSchema,
    carsSchemaResponse,
    carsSchemaUpdate,
    carsSchemaUpdateResponse,
    carsSchemaResponseWithImage,
    createCarSchema,
    imageSchema,
    imageSchemaResponse
} from "../schemas";

export type ICars = z.infer<typeof carsSchema>
export type ICarsResponse = z.infer<typeof carsSchemaResponse>
export type ICarsUpdate = z.infer<typeof carsSchemaUpdate>
export type ICarsUpdateResponse = z.infer<typeof carsSchemaUpdateResponse>
export type ICarsCreate = z.infer<typeof createCarSchema>
export type ICarsCreateResponse = z.infer<typeof carsSchemaResponseWithImage>
export type ICarImage = z.infer<typeof imageSchema>
export type ICarImageResponse = z.infer<typeof imageSchemaResponse>
