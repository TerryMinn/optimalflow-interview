import { NextFunction, Request, Response } from "express";
import { transferCreate } from "@/services/transfer.service";

export const transfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, senderId, receiverId } = req.body;

    await transferCreate(amount, senderId, receiverId);
    res.status(201).json({
      success: true,
      message: "Transfer successful",
    });
  } catch (err) {
    next(err);
  }
};
