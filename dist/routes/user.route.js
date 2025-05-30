"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("@/controllers/user.controller");
const validator_1 = require("@/middleware/validator");
const auth_guard_1 = __importDefault(require("@/middleware/auth-guard"));
const user_schema_1 = require("@/validation/user.schema");
const router = (0, express_1.Router)();
router.get("/users", auth_guard_1.default, user_controller_1.getAllUser);
router.get("/users/:id", auth_guard_1.default, user_controller_1.getUser);
router.post("/users", (0, validator_1.validateBody)(user_schema_1.userSchema), user_controller_1.RegisterUser);
router.post("/login", (0, validator_1.validateBody)(user_schema_1.loginSchema), user_controller_1.LoginUser);
router.get("/users/:id/transfer", auth_guard_1.default, user_controller_1.getTransferDataByUserId);
exports.default = router;
