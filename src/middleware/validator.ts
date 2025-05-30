import { HttpError } from "@/util/error-handler";
import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { sanitize } from "@/util";

export const validateBody = <T extends Record<string, any>>(
  schema: ZodObject<T>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      next(new HttpError(400, validation.error.issues[0].message));
      return;
    }

    // xss filter
    req.body = sanitize(validation.data);

    next();
  };
};
