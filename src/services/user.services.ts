import { Address, Users } from "@prisma/client";
import { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import {
  IAddress,
  ICreateUser,
  ICreateUserResponse,
  IUpdateUserResponse,
  IUser,
} from "../interfaces";
import {
  IAddressPartial,
  IListUser,
  IUpdateUser,
} from "../interfaces/user.interfaces";
import {
  addressPartialSchema,
  addressSchema,
  createUserSchemaResponse,
  updateUserSchema,
  userListSchema,
  userPartialSchema,
  userSchema,
} from "../schemas";
import { prisma } from "../server";

const createUserService = async (
  data: ICreateUser
): Promise<ICreateUserResponse> => {
  const userData: IUser = userSchema.parse(data);
  const addressData: IAddress = addressSchema.parse(data);

  const newUser: Users = await prisma.users.create({
    data: {
      ...userData,
      password: hashSync(userData.password, 9),
      birthDate: new Date(userData.birthDate),
    },
  });

  const userAddress: Address = await prisma.address.create({
    data: {
      ...addressData,
      userId: newUser.id,
    },
  });

  const objResponse: ICreateUserResponse = {
    ...newUser,
    birthDate: newUser.birthDate.toISOString(),
    createdAt: newUser.createdAt.toISOString(),
    updatedAt: newUser.updatedAt.toISOString(),
    address: { ...userAddress },
  };

  return createUserSchemaResponse.parse(objResponse);
};
const updateUserService = async (
  data: IUpdateUser,
  userId: string
): Promise<any> => {
  const userData: IUpdateUser = userPartialSchema.parse(data);
  const addressData: IAddressPartial = addressPartialSchema.parse(data);

  const oldDataUser: Users | null = await prisma.users.findFirst({
    where: { id: userId },
  });
  const oldDataAddress: Address | null = await prisma.address.findFirst({
    where: { userId: userId },
  });
  if (Object.keys(userData).length > 0) {
    await prisma.users.update({
      where: { id: userId },
      data: {
        name: userData.name ? userData.name : oldDataUser!.name,
        email: userData.email ? userData.email : oldDataUser!.email,
        password: userData.password
          ? hashSync(userData.password, 9)
          : oldDataUser!.password,
        phone: userData.phone ? userData.phone : oldDataUser!.phone,
        birthDate: userData.birthDate
          ? new Date(userData.birthDate)
          : oldDataUser!.birthDate,
        description: userData.description
          ? userData.description
          : oldDataUser!.description,
        isAdvertiser: userData.isAdvertiser
          ? userData.isAdvertiser
          : oldDataUser!.isAdvertiser,
      },
    });
  }

  if (Object.keys(addressData).length > 0) {
    await prisma.address.update({
      where: { userId: userId },
      data: {
        zipCode: addressData.zipCode
          ? addressData.zipCode
          : oldDataAddress!.zipCode,
        state: addressData.state ? addressData.state : oldDataAddress!.state,
        city: addressData.city ? addressData.city : oldDataAddress!.city,
        street: addressData.street
          ? addressData.street
          : oldDataAddress!.street,
        number: addressData.number
          ? addressData.number
          : oldDataAddress!.number,
        complement: addressData.complement
          ? addressData.complement
          : oldDataAddress!.complement,
      },
    });
  }

  const newUser: Users | null = await prisma.users.findFirst({
    where: { id: userId },
  });
  const newAddress: Address | null = await prisma.address.findFirst({
    where: { userId: userId },
  });

  const objResponse = {
    ...newUser,
    birthDate: newUser!.birthDate.toISOString(),
    createdAt: newUser!.createdAt.toISOString(),
    updatedAt: newUser!.updatedAt.toISOString(),
    address: { ...newAddress! },
  };

  return createUserSchemaResponse.parse(objResponse);
};

const listUserService = async (
  userId: string
): Promise<IUpdateUserResponse> => {
  const user: Users | null = await prisma.users.findFirstOrThrow({
    where: { id: userId },
  });

  return updateUserSchema.parse({
    ...user,
    birthDate: user.birthDate.toISOString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  });
};
const listAllUsersService = async (): Promise<IListUser[]> => {
  const allUsers: Users[] = await prisma.users.findMany();
  const parsedUsers: IListUser[] = userListSchema.array().parse(allUsers);

  return parsedUsers;
};

const deleteUserService = async (userId: string): Promise<void> => {
  await prisma.users.update({
    where: { id: userId },
    data: { isDeleted: true },
  });
};
const recoverUserService = async (
  token: string,
  userEmail: string
): Promise<void> => {
  const tokenResponse = { isDeleted: false };
  jwt.verify(token, process.env.SECRET_KEY!, async (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    tokenResponse.isDeleted = decoded.isDeleted;
  });
  if (!tokenResponse.isDeleted) {
    throw new AppError("This user is already active", 400);
  }

  await prisma.users.update({
    where: { email: userEmail },
    data: { isDeleted: false },
  });
};

export {
  createUserService,
  updateUserService,
  listUserService,
  listAllUsersService,
  deleteUserService,
  recoverUserService,
};
