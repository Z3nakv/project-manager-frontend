import { httpDelete, httpGet, httpPost, httpPut } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";
import type { ProjectItemType } from "../types/project";
import { taskSchema, type Task, type TaskFormType, type TaskProjectType } from "../types/task";

type TaskMutationResponse = {
  message: string;
  project: {
    projectName: string;
  };
  task?: {
    name: string;
  };
};

type TaskDataProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
};

export const getProjectTaskById = async ({ projectId, taskId }: TaskDataProps) => {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  const task = await httpGet<Task>(url);
  return parseOrThrow(taskSchema, task, "getProjectTaskById");
};

type CreateTaskdataProps = {
  formData: TaskFormType;
  projectId: ProjectItemType["_id"];
};

export const createTask = async ({ formData, projectId }: CreateTaskdataProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks`;
  return httpPost<TaskMutationResponse>(url, formData);
};

type UpdateTaskProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
  formData: TaskFormType;
};

export const updateTask = async ({ projectId, taskId, formData }: UpdateTaskProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  return httpPut<TaskMutationResponse>(url, formData);
};

type DeleteTaskProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
};

export const deleteTask = async ({ projectId, taskId }: DeleteTaskProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  return httpDelete<TaskMutationResponse>(url);
};

type UpdateStatusTaskProps = {
  projectId: ProjectItemType["_id"];
  taskId: TaskProjectType["_id"];
  status: TaskProjectType["status"];
};

export const updateStatus = async ({ projectId, taskId, status }: UpdateStatusTaskProps): Promise<TaskMutationResponse> => {
  const url = `/projects/${projectId}/tasks/${taskId}/status`;
  return httpPost<TaskMutationResponse>(url, { status });
};