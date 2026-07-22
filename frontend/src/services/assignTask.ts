import { api } from "../lib/axios";
import { type assignTaskType } from "../types/assignTaskSchema";

type assignTaskProps = {
    projectId: string
    taskId: string
    userIds: assignTaskType
}
export async function assignTask({projectId, taskId, userIds} : assignTaskProps) {
    const url = `/projects/${projectId}/tasks/${taskId}/assign`;
    const { data } = await api.post(url, userIds)    
    if(!data) throw new Error("Datos no válidos");
    return data;
}