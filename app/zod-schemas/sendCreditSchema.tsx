import { z } from "zod";

export const sendCreditSchema = z.object({
  userId: z.string().min(1, "Please select a user"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => Number(val) > 0, "Amount must be greater than 0"),
});

export type SendCreditFormValues = z.infer<typeof sendCreditSchema>;
