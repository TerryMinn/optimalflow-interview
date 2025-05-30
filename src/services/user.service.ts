import { prisma } from "@/config/db";
import { BasePaginationQuery } from "@/types";
import { hashPassword } from "@/util";
import { UserType } from "@/validation/user.schema";

export const getUsers = async ({
  limit = 10,
  page = 1,
  q = "",
  sort_by = "createdAt",
  sort_dir = "desc",
}: BasePaginationQuery) => {
  const skip = (page - 1) * limit || 0;

  const [users, count] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      take: Number(limit),
      skip: skip,
      orderBy: {
        [sort_by as string]: sort_dir,
      },
      select: {
        id: true,
        email: true,
        name: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    }),
  ]);

  return { users, count };
};

export const getUserTransferData = async (
  id: string,
  {
    limit = 10,
    page = 1,
    sort_by = "createdAt",
    sort_dir = "desc",
  }: BasePaginationQuery
) => {
  const skip = (page - 1) * limit || 0;

  const [transfers, count] = await Promise.all([
    prisma.transfer.findMany({
      where: { OR: [{ fromUserId: id }, { toUserId: id }] },
      take: Number(limit),
      skip: skip,
      include: {
        fromUser: {
          select: {
            id: true,
            email: true,
            balance: true,
            name: true,
          },
        },
        toUser: {
          select: {
            id: true,
            email: true,
            balance: true,
            name: true,
          },
        },
      },
      orderBy: {
        [sort_by as string]: sort_dir,
      },
    }),
    prisma.user.count({
      where: {
        id,
      },
    }),
  ]);

  return { transfers, count };
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
