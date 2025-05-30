"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = exports.generateJWToken = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const hashPassword = (password) => {
    const salt = Number(process.env.SALT_ROUNDS) || 10;
    return (0, bcryptjs_1.hashSync)(password, salt);
};
exports.hashPassword = hashPassword;
const generateJWToken = async (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
exports.generateJWToken = generateJWToken;
const sanitize = (input) => {
    for (const key in input) {
        input[key] = (0, sanitize_html_1.default)(input[key], {
            allowedTags: [],
            allowedAttributes: {},
        });
    }
    return input;
};
exports.sanitize = sanitize;
