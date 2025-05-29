import { NextFunction, Request, Response } from "express";
import { transferCreate, allTransfers } from "@/services/transfer.service";

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

export const getAllTransfers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { count, transfers } = await allTransfers(req.query);

    res.status(200).json({
      success: true,
      data: transfers,
      meta: {
        total: count,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort_by: req.query.sort_by || "createdAt",
        sort_dir: req.query.sort_dir || "desc",
      },
    });
  } catch (err) {
    next(err);
  }
};
