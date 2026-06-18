import { z } from "zod";
import { CATEGORY_COLORS } from "@/lib/constants";

export const potSchema = z.object({
  name: z
    .string()
    .min(1, "Pot name is required")
    .max(30, "Pot name must be 30 characters or fewer"),
  target: z.coerce
    .number()
    .positive("Target must be greater than 0"),
  color: z.enum(CATEGORY_COLORS),
});

export type PotFormValues = z.infer<typeof potSchema>;
