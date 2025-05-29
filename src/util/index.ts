import { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string) => {
  const salt = Number(process.env.SALT_ROUNDS) || 10;
  return hashSync(password, salt);
};

export const generateJWToken = async (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
