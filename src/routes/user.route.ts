import { Router } from "express";
import {
  getAllUser,
  RegisterUser,
  LoginUser,
} from "@/controllers/user.controller";
import { validateBody } from "@/middleware/validator";
import authGuard from "@/middleware/auth-guard";
import { loginSchema, userSchema, UserType } from "@/validation/user.schema";

const router = Router();

router.get("/users", authGuard, getAllUser);
router.post("/users", validateBody(userSchema), RegisterUser);
router.post("/login", validateBody(loginSchema), LoginUser);

export default router;
