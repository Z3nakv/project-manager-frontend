import { del, get, post, put, throwApiError } from "../lib/axios";
import { parseOrThrow } from "../lib/parseOrThrow";
import type { ProjectItemType } from "../types/project";
import { taskSchema, type TaskFormType, type TaskProjectType } from "../types/task";

type TaskDataProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
};

type TaskMutationResponse = {
  message: string;
  project: { projectName: string };
  task?: { name: string };
};

export const getProjectTaskById = async ({ projectId, taskId }: TaskDataProps) => {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    const task = await get<unknown>(url);
    return parseOrThrow(taskSchema, task, "getProjectTaskById");
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

type CreateTaskdataProps = {
  formData: TaskFormType;
  projectId: ProjectItemType["_id"];
};

export const createTask = async ({ formData, projectId }: CreateTaskdataProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks`;
  try {
    return await post<TaskMutationResponse>(url, formData);
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

type UpdateTaskProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
  formData: TaskFormType;
};

export const updateTask = async ({ projectId, taskId, formData }: UpdateTaskProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    return await put<TaskMutationResponse>(url, formData);
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

type DeleteTaskProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
};

export const deleteTask = async ({ projectId, taskId }: DeleteTaskProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    return await del<TaskMutationResponse>(url);
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

type UpdateStatusTaskProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
  status: TaskProjectType["status"];
};

type UpdateStatusResponse = {
  message: string;
  task?: { name: string };
};

export const updateStatus = async ({ projectId, taskId, status }: UpdateStatusTaskProps): Promise<UpdateStatusResponse> => {
  const url = `/projects/${projectId}/tasks/${taskId}/status`;
  try {
    return await post<UpdateStatusResponse>(url, { status });
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};