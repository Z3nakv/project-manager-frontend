import { api } from "../lib/axios";
import { type assignTaskType } from "../types/assignTaskSchema";

type assignTaskProps = {
    projectID: string
    taskID: string
    userIDs: assignTaskType
}
export async function assignTask({projectID, taskID, userIDs} : assignTaskProps) {
    const url = `/projects/${projectID}/tasks/${taskID}/assign`;
    const { data } = await api.post(url, userIDs)    
    if(!data) throw new Error("Datos no válidos");
    return data;
}