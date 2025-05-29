import { z } from "zod";

export const transferSchema = z.object({
  amount: z.number().nonnegative("Amount must be a positive number"),
  senderId: z.string().nonempty("Sender ID is required"),
  receiverId: z.string().nonempty("Receiver ID is required"),
});
