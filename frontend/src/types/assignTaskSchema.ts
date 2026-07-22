import z, { array, object, string } from "zod";

export const assignTaskSchema = object({
  userIds: array(string()).min(0),
});

export type assignTaskType = z.infer<typeof assignTaskSchema>
