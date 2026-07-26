import { post, throwApiError } from "../lib/axios";
import { type assignTaskType } from "../types/assignTaskSchema";

type assignTaskProps = {
  projectId: string;
  taskId: string;
  userIds: assignTaskType;
};

type AssignTaskResponse = {
  message: string;
  userId: string;
  taskName: string;
  projectName: string;
  projectId: string;
  userIds: string[];
};

export async function assignTask({ projectId, taskId, userIds }: assignTaskProps): Promise<AssignTaskResponse> {
  const url = `/projects/${projectId}/tasks/${taskId}/assign`;
  try {
    const data = await post<AssignTaskResponse>(url, userIds);
    if (!data) throw new Error("Datos no válidos");
    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "Datos no válidos") {
      throw error;
    }
    throwApiError(error);
    return Promise.reject(error);
  }
}