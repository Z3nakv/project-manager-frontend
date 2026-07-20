import z, { array, object, string } from "zod";

export const assignTaskSchema = object({
  userIDs: array(string()).min(0),
});

export type assignTaskType = z.infer<typeof assignTaskSchema>
