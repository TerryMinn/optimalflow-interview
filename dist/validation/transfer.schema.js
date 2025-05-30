"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferSchema = void 0;
const zod_1 = require("zod");
exports.transferSchema = zod_1.z.object({
    amount: zod_1.z.number().nonnegative("Amount must be a positive number"),
    senderId: zod_1.z.string().nonempty("Sender ID is required"),
    receiverId: zod_1.z.string().nonempty("Receiver ID is required"),
});
