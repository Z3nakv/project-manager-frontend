import { httpPost } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";
import { taskSuggestionsSchema } from "../types/aiSchema";

export const getTaskSuggestions = async (projectId:string, selectedFields:string[], quantity: number) => {
    const url = `/projects/${projectId}/suggest-tasks`;
    const taskSuggestions = await httpPost<unknown>(url, {selectedFields, quantity});
    return parseOrThrow(taskSuggestionsSchema, taskSuggestions, 'getTaskSuggestions');
}