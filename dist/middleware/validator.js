"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const error_handler_1 = require("@/util/error-handler");
const util_1 = require("@/util");
const validateBody = (schema) => {
    return async (req, res, next) => {
        const validation = schema.safeParse(req.body);
        if (!validation.success) {
            next(new error_handler_1.HttpError(400, validation.error.issues[0].message));
            return;
        }
        // xss filter
        req.body = (0, util_1.sanitize)(validation.data);
        next();
    };
};
exports.validateBody = validateBody;
