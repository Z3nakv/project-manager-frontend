import z, { object, string } from "zod";
import { LABEL_COLORS } from "../constants/labelColorClasses";

export const labelSchema = object({
  text: string(),
  color: z.enum(LABEL_COLORS),
});

export type Label = z.infer<typeof labelSchema>;