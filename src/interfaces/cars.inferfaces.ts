import { z } from "zod";
import {
  carsSchema,
  carsSchemaResponse,
  carsSchemaUpdate,
  carsSchemaResponseWithImage,
  createCarSchema,
  imageSchema,
  imageSchemaResponse,
  imageUpdate,
  imageCreateSchema,
} from "../schemas";
import { Cars } from ".prisma/client";

export type ICars = z.infer<typeof carsSchema>;
export type ICarsResponse = z.infer<typeof carsSchemaResponse>;
export type ICarsUpdate = z.infer<typeof carsSchemaUpdate>;
export type ICarsCreate = z.infer<typeof createCarSchema>;
export type ICarsCreateResponse = z.infer<typeof carsSchemaResponseWithImage>;
export type ICarImage = z.infer<typeof imageSchema>;
export type ICarImageResponse = z.infer<typeof imageSchemaResponse>;
export type ICarImageUpdate = z.infer<typeof imageUpdate>;
export type ICarImageCreate = z.infer<typeof imageCreateSchema>;

export type TFilterRequest = {
  brand?: string;
  model?: string;
  year?: string;
  fueltype?: string;
  color?: string;
  minkm?: number;
  maxkm?: number;
  minprice?: number;
  maxprice?: number;
  pageNumber?: number;
  pageSize?: number;
};

export type TFilterResponse = {
  nextPage: string | null;
  prevPage: string | null;
  pages: number;
  items: number;
  data: Cars[]| [];
};
