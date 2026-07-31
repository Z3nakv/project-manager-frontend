import z from "zod"
import { httpDelete, httpGet, httpPost, httpPut } from "../lib/http"
import { parseOrThrow } from "../lib/parseOrThrow"
import type { ProjectItemType } from "../types/project"
import { taskSchema, type TaskFormType, type TaskProjectType } from "../types/task"

type TaskDataProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
}

export const getProjectTaskById = async ({ projectId, taskId } : TaskDataProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const  task = await httpGet<unknown>(url);
    return parseOrThrow(taskSchema, task, "getProjectTaskById");
}

type CreateTaskdataProps = {
    formData: TaskFormType
    projectId: ProjectItemType['_id'] 
}

const createTaskResponse = z.object({
    message: z.string(),
    project: z.object({
        projectName: z.string(),
        projectTeam: z.array(z.string()),
        projectId: z.string()
    })
})
export const createTask = async ({formData, projectId} : CreateTaskdataProps) => {
    const url = `/projects/${projectId}/tasks`
    const data = await httpPost<unknown>(url, formData);
    return parseOrThrow(createTaskResponse, data, "createTask")
}

type UpdateTaskProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
    formData: TaskFormType
}

const updateTaskResponse = z.object({
    message: z.string(),
    project: z.object({
        projectTeam: z.array(z.string()),
        projectId: z.string()
    }),
    taskName: z.string()
})

export const updateTask = async ({projectId, taskId, formData} : UpdateTaskProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const data = await httpPut(url, formData);
    return parseOrThrow(updateTaskResponse, data, "updateTask")
}

type DeleteTaskProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
}

export const deleteTask = async ({projectId, taskId}: DeleteTaskProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const data = await httpDelete(url);
    return parseOrThrow(createTaskResponse, data, "deleteTask")
}

type UpdateStatusTaskProps = {
    projectId: ProjectItemType['_id'] 
    taskId: TaskProjectType['_id']
    status: TaskProjectType['status']
};

const updateStatusResponse = z.object({
    message: z.string(),
    task: z.object({taskName: z.string()}),
    user: z.object({userName: z.string(), userId: z.string()})
});

export const updateStatus = async ({projectId, taskId, status} : UpdateStatusTaskProps) => {
    const url = `/projects/${projectId}/tasks/${taskId}/status`
    const data = await httpPost(url, {status});
    return parseOrThrow(updateStatusResponse, data, "updateStatus")
}