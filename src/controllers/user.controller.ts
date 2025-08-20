import {
  getUsers,
  getUserByEmail,
  createUser,
  getUserById,
  getUserTransferData,
} from "@/services/user.service";
import { generateJWToken } from "@/util";
import { HttpError } from "@/util/error-handler";
import { compareSync } from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {} = await getUsers(req.query);

    res.status(200).json({
      success: true,
      message: "Success",
      data: null,
      meta: {
        total: 0,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort_by: req.query.sort_by || "createdAt",
        sort_dir: req.query.sort_dir || "desc",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userFinder = await getUserByEmail(req.body.email);

    if (userFinder) {
      throw new HttpError(400, "User already exists");
    }

    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const userFinder = await getUserByEmail(req.body.email);
    // if (!userFinder) {
    //   throw new HttpError(400, "User not found");
    // }
    // const comparePassword = compareSync(req.body.password, "");
    // if (!comparePassword) {
    //   throw new HttpError(400, "Invalid credentials");
    // }
    // // const token = await generateJWToken(userFinder.id);
    // res.status(200).json({
    //   success: true,
    //   message: "User logged in successfully",
    //   data: {
    //     name: userFinder.name,
    //     email: userFinder.email,
    //     id: userFinder.id,
    //   },
    //   token,
    // });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = await getUserById(req.params.id);
    // if (!user) {
    //   throw new HttpError(400, "User not found");
    // }
    // res.status(200).json({
    //   success: true,
    //   message: "Success",
    //   data: user,
    // });
  } catch (error) {
    next(error);
  }
};

export const getTransferDataByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { count, transfers } = await getUserTransferData(
    //   req.params.id,
    //   req.query
    // );
    // res.status(200).json({
    //   success: true,
    //   message: "Success",
    //   data: transfers,
    //   meta: {
    //     total: count,
    //     page: Number(req.query.page) || 1,
    //     limit: Number(req.query.limit) || 10,
    //     sort_by: req.query.sort_by || "createdAt",
    //     sort_dir: req.query.sort_dir || "desc",
    //   },
    // });
  } catch (err) {
    next(err);
  }
};
