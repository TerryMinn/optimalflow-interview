import { Router } from "express";
import { transfer, getAllTransfers } from "@/controllers/transfer.controller";
import authGuard from "@/middleware/auth-guard";
import { validateBody } from "@/middleware/validator";
import { transferSchema } from "@/validation/transfer.schema";
const router = Router();

router.post("/transfer", authGuard, validateBody(transferSchema), transfer);
router.get("/transfer", authGuard, getAllTransfers);

export default router;
