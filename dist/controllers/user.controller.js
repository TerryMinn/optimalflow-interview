"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferDataByUserId = exports.getUser = exports.LoginUser = exports.RegisterUser = exports.getAllUser = void 0;
const user_service_1 = require("@/services/user.service");
const util_1 = require("@/util");
const error_handler_1 = require("@/util/error-handler");
const bcryptjs_1 = require("bcryptjs");
const getAllUser = async (req, res, next) => {
    try {
        const { count, users } = await (0, user_service_1.getUsers)(req.query);
        res.status(200).json({
            success: true,
            message: "Success",
            data: users,
            meta: {
                total: count,
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                sort_by: req.query.sort_by || "createdAt",
                sort_dir: req.query.sort_dir || "desc",
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUser = getAllUser;
const RegisterUser = async (req, res, next) => {
    try {
        const userFinder = await (0, user_service_1.getUserByEmail)(req.body.email);
        if (userFinder) {
            throw new error_handler_1.HttpError(400, "User already exists");
        }
        const user = await (0, user_service_1.createUser)(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.RegisterUser = RegisterUser;
const LoginUser = async (req, res, next) => {
    try {
        const userFinder = await (0, user_service_1.getUserByEmail)(req.body.email);
        if (!userFinder) {
            throw new error_handler_1.HttpError(400, "User not found");
        }
        const comparePassword = (0, bcryptjs_1.compareSync)(req.body.password, userFinder.password);
        if (!comparePassword) {
            throw new error_handler_1.HttpError(400, "Invalid credentials");
        }
        const token = await (0, util_1.generateJWToken)(userFinder.id);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                name: userFinder.name,
                email: userFinder.email,
                id: userFinder.id,
            },
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.LoginUser = LoginUser;
const getUser = async (req, res, next) => {
    try {
        const user = await (0, user_service_1.getUserById)(req.params.id);
        if (!user) {
            throw new error_handler_1.HttpError(400, "User not found");
        }
        res.status(200).json({
            success: true,
            message: "Success",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const getTransferDataByUserId = async (req, res, next) => {
    try {
        const { count, transfers } = await (0, user_service_1.getUserTransferData)(req.params.id, req.query);
        res.status(200).json({
            success: true,
            message: "Success",
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
exports.getTransferDataByUserId = getTransferDataByUserId;
