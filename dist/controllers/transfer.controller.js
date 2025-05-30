"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransfers = exports.transfer = void 0;
const transfer_service_1 = require("@/services/transfer.service");
const transfer = async (req, res, next) => {
    try {
        const { amount, senderId, receiverId } = req.body;
        await (0, transfer_service_1.transferCreate)(amount, senderId, receiverId);
        res.status(201).json({
            success: true,
            message: "Transfer successful",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.transfer = transfer;
const getAllTransfers = async (req, res, next) => {
    try {
        const { count, transfers } = await (0, transfer_service_1.allTransfers)(req.query);
        res.status(200).json({
            success: true,
            data: transfers,
            meta: {
                total: count,
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                sort_by: req.query.sort_by || "createdAt",
                sort_dir: req.query.sort_dir || "desc",
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllTransfers = getAllTransfers;
