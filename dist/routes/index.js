"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferRouter = exports.UserRouter = void 0;
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
var transfer_route_1 = require("./transfer.route");
Object.defineProperty(exports, "TransferRouter", { enumerable: true, get: function () { return __importDefault(transfer_route_1).default; } });
