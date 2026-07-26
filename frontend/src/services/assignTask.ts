import { array, object, string } from "zod";
import { httpPost } from "../lib/http";
import { type assignTaskType } from "../types/assignTaskSchema";
import { parseOrThrow } from "../lib/parseOrThrow";

const AssignTaskResponseSchema = object({
  message: string(),
  taskName: string(),
  projectName: string(),
  projectId: string(),
  userIds: array(string()),
});
type assignTaskProps = {
    projectId: string
    taskId: string
    userIds: assignTaskType
}

export async function assignTask({projectId, taskId, userIds} : assignTaskProps) {
    const url = `/projects/${projectId}/tasks/${taskId}/assign`;
    const data = await httpPost<unknown>(url, userIds);
    return parseOrThrow(AssignTaskResponseSchema, data, "assignTask");
}