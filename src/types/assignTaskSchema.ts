import z, { array, object, string } from "zod";

export const assignTaskSchema = object({
  userIds: array(string()).min(0),
});

export const AssignTaskResponseSchema = object({
  message: string(),
  taskName: string(),
  projectName: string(),
  projectId: string(),
  userIds: array(string()),
});

export type assignTaskType = z.infer<typeof assignTaskSchema>
