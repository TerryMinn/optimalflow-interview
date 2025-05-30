"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.createUser = exports.getUserByEmail = exports.getUserTransferData = exports.getUsers = void 0;
const db_1 = require("@/config/db");
const util_1 = require("@/util");
const getUsers = async ({ limit = 10, page = 1, q = "", sort_by = "createdAt", sort_dir = "desc", }) => {
    const skip = (page - 1) * limit || 0;
    const [users, count] = await Promise.all([
        db_1.prisma.user.findMany({
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
                [sort_by]: sort_dir,
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
        db_1.prisma.user.count({
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
exports.getUsers = getUsers;
const getUserTransferData = async (id, { limit = 10, page = 1, sort_by = "createdAt", sort_dir = "desc", }) => {
    const skip = (page - 1) * limit || 0;
    const [transfers, count] = await Promise.all([
        db_1.prisma.transfer.findMany({
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
                [sort_by]: sort_dir,
            },
        }),
        db_1.prisma.user.count({
            where: {
                id,
            },
        }),
    ]);
    return { transfers, count };
};
exports.getUserTransferData = getUserTransferData;
const getUserByEmail = async (email) => {
    const user = await db_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
};
exports.getUserByEmail = getUserByEmail;
const createUser = async (user) => {
    const newUser = await db_1.prisma.user.create({
        data: {
            ...user,
            password: (0, util_1.hashPassword)(user.password),
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
exports.createUser = createUser;
const getUserById = async (id) => {
    const user = await db_1.prisma.user.findUnique({
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
exports.getUserById = getUserById;
