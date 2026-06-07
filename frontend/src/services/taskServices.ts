
import type { ProjectItemType, Task, TaskFormType, TaskProjectType } from "../types"
import { api } from "../lib/axios"

type TaskDataProps = {
    projectID: ProjectItemType['_id'] 
    taskID: TaskProjectType['_id']
}

export const getProjectTaskByID = async ({ projectID, taskID } : TaskDataProps) => {
    const url = `/projects/${projectID}/tasks/${taskID}`
    const { data } = await api<Task>(url);
    
    return data;
}

type CreateTaskdataProps = {
    formData: TaskFormType
    projectID: ProjectItemType['_id'] 
}
export const createTask = async ({formData, projectID} : CreateTaskdataProps) => {
    const url = `/projects/${projectID}/tasks`
    const { data } = await api.post<string>(url, formData);
    
    console.log(data);
    
    return data;
}

type UpdateTaskProps = {
    projectID: ProjectItemType['_id'] 
    taskID: TaskProjectType['_id']
    formData: TaskFormType
}

export const updateTask = async ({projectID, taskID, formData} : UpdateTaskProps) => {
    const url = `/projects/${projectID}/tasks/${taskID}`
    const { data } = await api.put<string>(url, formData);
    return data
} 

type DeleteTaskProps = {
    projectID: ProjectItemType['_id'] 
    taskID: TaskProjectType['_id']
}

export const deleteTask = async ({projectID, taskID}: DeleteTaskProps) => {
    const url = `/projects/${projectID}/tasks/${taskID}`
    const { data } = await api.delete<string>(url);
    return data
}

type UpdateStatusTaskProps = {
    projectID: ProjectItemType['_id'] 
    taskID: TaskProjectType['_id']
    status: TaskProjectType['status']
}

export const updateStatus = async ({projectID, taskID, status} : UpdateStatusTaskProps) => {
    const url = `/projects/${projectID}/tasks/${taskID}/status`
    const { data } = await api.post(url, {status});
    return data;
}