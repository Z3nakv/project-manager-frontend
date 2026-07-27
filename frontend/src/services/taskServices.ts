import { api } from "../lib/axios"
import { parseOrThrow } from "../lib/parseOrThrow"
import type { ProjectItemType } from "../types/project"
import { taskSchema, type Task, type TaskFormType, type TaskProjectType } from "../types/task"

type TaskDataProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
}

export const getProjectTaskById = async ({ projectId, taskId } : TaskDataProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data: task } = await api<Task>(url);
    return parseOrThrow(taskSchema, task, "getProjectTaskById");
}

type CreateTaskdataProps = {
    formData: TaskFormType
    projectId: ProjectItemType['_id'] 
}
export const createTask = async ({formData, projectId} : CreateTaskdataProps) => {
    const url = `/projects/${projectId}/tasks`
    const { data } = await api.post(url, formData);
    return data;
}

type UpdateTaskProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
    formData: TaskFormType
}

export const updateTask = async ({projectId, taskId, formData} : UpdateTaskProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.put(url, formData);
    return data;
}

type DeleteTaskProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
}

export const deleteTask = async ({projectId, taskId}: DeleteTaskProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.delete(url);
    return data
}

type UpdateStatusTaskProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
    status: TaskProjectType['status']
}

export const updateStatus = async ({projectId, taskId, status} : UpdateStatusTaskProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}/status`
    const { data } = await api.post(url, {status});
    return data;
}