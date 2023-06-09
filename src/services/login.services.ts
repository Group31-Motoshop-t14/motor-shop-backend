import { Users } from "@prisma/client";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import { ILogin } from "../interfaces";
import { prisma } from "../server";

const createLoginService = async (data: ILogin): Promise<string> => {
  const user: Users | null = await prisma.users.findFirst({
    where: { email: data.email },
  });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  const passwordCompare = await compare(data.password, user.password);

  if (!passwordCompare) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      name: user.name,
      isDeleted: user.isDeleted,
      isAdvertiser: user.isAdvertiser,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );
  return token;
};

export { createLoginService };
