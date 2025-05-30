"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTransfers = exports.transferCreate = void 0;
const db_1 = require("@/config/db");
const error_handler_1 = require("@/util/error-handler");
const transferCreate = async (amount, senderId, receiverId) => {
    await db_1.prisma.$transaction(async (tx) => {
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
            throw new error_handler_1.HttpError(400, "User not found");
        }
        if (sender.balance < amount) {
            throw new error_handler_1.HttpError(400, "Insufficient balance");
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
exports.transferCreate = transferCreate;
const allTransfers = async ({ limit = 10, page = 1, sort_by = "createdAt", sort_dir = "desc", }) => {
    const skip = (page - 1) * limit || 0;
    const [transfers, count] = await Promise.all([
        db_1.prisma.transfer.findMany({
            take: Number(limit),
            skip: skip,
            orderBy: {
                [sort_by]: sort_dir,
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
        db_1.prisma.transfer.count(),
    ]);
    return { transfers, count };
};
exports.allTransfers = allTransfers;
