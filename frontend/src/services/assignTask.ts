import { api } from "../lib/axios";
import { assignTaskSchema } from "../types/assignTaskSchema";

type assignTaskProps = {
    projectID: string
    taskID: string
    userIDs: string[]
}
export async function assignTask({projectID, taskID, userIDs} : assignTaskProps) {
    const url = `/projects/${projectID}/tasks/${taskID}/assign`;
    const { data } = await api.post(url, userIDs)
    const response = assignTaskSchema.safeParse(data);
    if (response.success) {
    return response.data;
  }
  throw new Error("Datos no válidos");
}