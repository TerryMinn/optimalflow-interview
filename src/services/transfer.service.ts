import { prisma } from "@/config/db";
import { BasePaginationQuery } from "@/types";
import { HttpError } from "@/util/error-handler";

export const transferCreate = async (
  amount: number,
  senderId: string,
  receiverId: string
) => {
  await prisma.$transaction(async (tx) => {
    const sender = await tx.user.findUnique({
      where: {
        id: senderId,
      },
    });
    const receiver = await tx.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    if (!sender || !receiver) {
      throw new HttpError(400, "User not found");
    }

    if (sender.balance < amount) {
      throw new HttpError(400, "Insufficient balance");
    }
    await tx.user.update({
      where: { id: senderId },
      data: {
        balance: { decrement: Number(amount) || 0 },
      },
    });

    // Increment receiver balance
    await tx.user.update({
      where: { id: receiverId },
      data: {
        balance: { increment: Number(amount) || 0 },
      },
    });

    await tx.transfer.create({
      data: {
        amount: Number(amount),
        fromUserId: senderId,
        toUserId: receiverId,
      },
    });
  });
};

export const allTransfers = async ({
  limit = 10,
  page = 1,
  sort_by = "createdAt",
  sort_dir = "desc",
}: BasePaginationQuery) => {
  const skip = (page - 1) * limit || 0;

  const [transfers, count] = await Promise.all([
    prisma.transfer.findMany({
      take: Number(limit),
      skip: skip,
      orderBy: {
        [sort_by as string]: sort_dir,
      },
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
    }),
    prisma.transfer.count(),
  ]);

  return { transfers, count };
};
