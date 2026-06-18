import { z } from "zod";
import { CATEGORY_COLORS } from "@/lib/constants";

export const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  maximum: z.coerce
    .number()
    .positive("Maximum must be greater than 0"),
  color: z.enum(CATEGORY_COLORS),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
