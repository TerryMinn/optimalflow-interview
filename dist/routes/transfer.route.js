"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transfer_controller_1 = require("@/controllers/transfer.controller");
const auth_guard_1 = __importDefault(require("@/middleware/auth-guard"));
const validator_1 = require("@/middleware/validator");
const transfer_schema_1 = require("@/validation/transfer.schema");
const router = (0, express_1.Router)();
router.post("/transfer", auth_guard_1.default, (0, validator_1.validateBody)(transfer_schema_1.transferSchema), transfer_controller_1.transfer);
router.get("/transfer", auth_guard_1.default, transfer_controller_1.getAllTransfers);
exports.default = router;
