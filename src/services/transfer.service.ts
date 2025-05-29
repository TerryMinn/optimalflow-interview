import { PrismaClient } from "@/generated/prisma/client";
import { HttpError } from "@/util/error-handler";

const prisma = new PrismaClient();

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
        balance: { decrement: amount },
      },
    });

    // Increment receiver balance
    await tx.user.update({
      where: { id: receiverId },
      data: {
        balance: { increment: amount },
      },
    });

    await tx.transfer.create({
      data: {
        amount,
        fromUserId: senderId,
        toUserId: receiverId,
      },
    });
  });
};
