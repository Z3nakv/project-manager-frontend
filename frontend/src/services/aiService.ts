import { api } from "../lib/axios"
import { parseOrThrow } from "../lib/parseOrThrow";
import { taskSuggestionsSchema } from "../types/aiSchema";

export const getTaskSuggestions = async (projectId:string, selectedFields:string[], quantity: number) => {
    const url = `/projects/${projectId}/suggest-tasks`;
    const { data : taskSuggestions } = await api.post(url, {selectedFields, quantity});
    return parseOrThrow(taskSuggestionsSchema, taskSuggestions, 'getTaskSuggestions');
}