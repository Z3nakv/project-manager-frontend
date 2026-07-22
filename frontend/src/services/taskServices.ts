import { api } from "../lib/axios"
import type { ProjectItemType } from "../types/project"
import type { Task, TaskFormType, TaskProjectType } from "../types/task"

type TaskDataProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
}

export const getProjectTaskById = async ({ projectId, taskId } : TaskDataProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api<Task>(url);
    return data;
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