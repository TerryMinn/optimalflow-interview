import { getUserById } from "@/services/user.service";
import { HttpError } from "@/util/error-handler";
import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export default async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next(new HttpError(401, "Unauthorized"));
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new HttpError(401, "Unauthorized"));
    }

    const data = verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id?: string;
    };

    if (!data || !data.id) {
      return next(new HttpError(401, "Invalid token payload"));
    }

    const user = await getUserById(data.id);
    if (!user) {
      return next(new HttpError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof Error) {
      next(new HttpError(401, err.message));
    }
  }
}
