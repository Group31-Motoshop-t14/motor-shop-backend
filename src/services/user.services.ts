import { randomUUID } from "node:crypto";
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
import { emailService } from "../utils/sendEmail.utils";

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
      data: { ...oldDataUser, ...(userData as ICreateUser) },
    });
  }

  if (Object.keys(addressData).length > 0) {
    await prisma.address.update({
      where: { userId: userId },
      data: { ...oldDataAddress, ...(addressData as IAddress) },
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
): Promise<ICreateUserResponse> => {
  const user: Users | null = await prisma.users.findFirstOrThrow({
    where: { id: userId },
  });
  const address: Address | null = await prisma.address.findFirstOrThrow({
    where: { user: { id: userId } },
  });

  return createUserSchemaResponse.parse({
    ...user,
    birthDate: user.birthDate.toISOString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    address: { ...address },
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

const sendEmailResetPasswordService = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken = randomUUID();

  await prisma.users.update({
    where: { email },
    data: { reset_token: resetToken },
  });

  const resetPasswordTemplate = emailService.resetPasswordTemplate(
    user.name,
    email,
    resetToken
  );

  await emailService.sendEmail(resetPasswordTemplate);
};

const resetPasswordService = async (password: string, resetToken: string) => {
  const user = await prisma.users.findFirst({
    where: { reset_token: resetToken },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashSync(password, 10),
      reset_token: null,
    },
  });
};

export {
  createUserService,
  updateUserService,
  listUserService,
  listAllUsersService,
  deleteUserService,
  recoverUserService,
  sendEmailResetPasswordService,
  resetPasswordService,
};
