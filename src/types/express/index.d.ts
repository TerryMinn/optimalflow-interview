import { User } from "../../generated/prisma/client"; // or your User type

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password" | "balance">;
    }
  }
}
