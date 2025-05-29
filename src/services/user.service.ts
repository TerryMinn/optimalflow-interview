import { PrismaClient } from "@/generated/prisma/client";
import { hashPassword } from "@/util";
import { UserType } from "@/validation/user.schema";

const prisma = new PrismaClient();

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const createUser = async (user: UserType) => {
  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: hashPassword(user.password),
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: false,
    },
  });
  return newUser;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });
  return user;
};
