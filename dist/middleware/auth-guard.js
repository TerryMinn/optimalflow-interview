"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authGuard;
const user_service_1 = require("@/services/user.service");
const error_handler_1 = require("@/util/error-handler");
const jsonwebtoken_1 = require("jsonwebtoken");
async function authGuard(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            next(new error_handler_1.HttpError(401, "Unauthorized"));
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return next(new error_handler_1.HttpError(401, "Unauthorized"));
        }
        const data = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (!data || !data.id) {
            return next(new error_handler_1.HttpError(401, "Invalid token payload"));
        }
        const user = await (0, user_service_1.getUserById)(data.id);
        if (!user) {
            return next(new error_handler_1.HttpError(401, "User not found"));
        }
        req.user = user;
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            next(new error_handler_1.HttpError(401, err.message));
        }
    }
}
