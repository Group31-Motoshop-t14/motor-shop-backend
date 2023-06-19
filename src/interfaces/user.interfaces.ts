import { z } from "zod";
import {
  addressPartialSchema,
  addressSchema,
  createUserSchema,
  createUserSchemaResponse,
  updateUserSchema,
  updateUserSchemaResponse,
  userListSchema,
  userSchema,
} from "../schemas";

export type IUser = z.infer<typeof userSchema>;
export type IListUser = z.infer<typeof userListSchema>;
export type IAddress = z.infer<typeof addressSchema>;
export type IAddressPartial = z.infer<typeof addressPartialSchema>;
export type ICreateUser = z.infer<typeof createUserSchema>;
export type ICreateUserResponse = z.infer<typeof createUserSchemaResponse>;
export type IUpdateUser = z.infer<typeof updateUserSchema>;
export type IUpdateUserResponse = z.infer<typeof updateUserSchemaResponse>;
