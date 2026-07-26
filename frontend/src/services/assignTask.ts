import { httpPost } from "../lib/http";
import { type assignTaskType } from "../types/assignTaskSchema";

type AssignTaskResponse = {
  message: string;
  userId: string;
  taskName: string;
  projectName: string;
  projectId: string;
  userIds: string[];
};

type assignTaskProps = {
  projectId: string;
  taskId: string;
  userIds: assignTaskType;
};

export async function assignTask({ projectId, taskId, userIds }: assignTaskProps): Promise<AssignTaskResponse> {
  const url = `/projects/${projectId}/tasks/${taskId}/assign`;
  const data = await httpPost<AssignTaskResponse>(url, userIds);
  if (!data) throw new Error("Datos no válidos");
  return data;
}