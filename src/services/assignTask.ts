import { httpPost } from "../lib/http";
import { AssignTaskResponseSchema, type assignTaskType } from "../types/assignTaskSchema";
import { parseOrThrow } from "../lib/parseOrThrow";


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