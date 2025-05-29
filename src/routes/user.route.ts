import { Router } from "express";
import {
  getAllUser,
  RegisterUser,
  LoginUser,
  getUser,
} from "@/controllers/user.controller";
import { validateBody } from "@/middleware/validator";
import authGuard from "@/middleware/auth-guard";
import { loginSchema, userSchema } from "@/validation/user.schema";

const router = Router();

router.get("/users", authGuard, getAllUser);
router.get("/users/:id", authGuard, getUser);
router.post("/users", validateBody(userSchema), RegisterUser);
router.post("/login", validateBody(loginSchema), LoginUser);

export default router;
