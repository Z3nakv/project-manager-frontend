import z, { array, number, object, string } from "zod"
import { labelSchema } from "./label"

export const taskSuggestionsSchema = array(
  object({
    name: string(),
    description: string(),
    labels: array(labelSchema).optional(),
    estimatedDays: number().optional(),
  })
)

export type TaskSuggestion = z.infer<typeof taskSuggestionsSchema>