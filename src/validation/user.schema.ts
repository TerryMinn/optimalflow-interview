import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 character(s")
    .nonempty("Password is required"),
});

export const userSchema = loginSchema.extend({
  name: z
    .string()
    .min(3, "Name must contain at least 3 character(s)")
    .max(20, "Name must contain at most 20 character(s)")
    .nonempty("Name is required"),
});

export type UserType = z.infer<typeof userSchema>;
