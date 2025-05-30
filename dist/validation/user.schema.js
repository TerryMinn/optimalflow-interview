"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().nonempty("Email is required"),
    password: zod_1.z
        .string()
        .min(8, "Password must contain at least 8 character(s")
        .nonempty("Password is required"),
});
exports.userSchema = exports.loginSchema.extend({
    name: zod_1.z
        .string()
        .min(3, "Name must contain at least 3 character(s)")
        .max(20, "Name must contain at most 20 character(s)")
        .nonempty("Name is required"),
});
