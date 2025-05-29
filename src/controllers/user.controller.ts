import { getUsers, getUserByEmail, createUser } from "@/services/user.service";
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
    const users = await getUsers();

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    res.status(200).json({
      success: true,
      message: "Success",
      data: users,
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
    const userFinder = await getUserByEmail(req.body.email);
    if (!userFinder) {
      throw new HttpError(400, "User not found");
    }

    const comparePassword = compareSync(req.body.password, userFinder.password);

    if (!comparePassword) {
      throw new HttpError(400, "Invalid credentials");
    }

    const token = await generateJWToken(userFinder.id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userFinder,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
