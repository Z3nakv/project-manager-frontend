import { post, throwApiError } from "../lib/axios";
import { parseOrThrow } from "../lib/parseOrThrow";
import { taskSuggestionsSchema } from "../types/aiSchema";

export const getTaskSuggestions = async (projectId: string, selectedFields: string[], quantity: number) => {
  const url = `/projects/${projectId}/suggest-tasks`;
  try {
    const taskSuggestions = await post<unknown>(url, { selectedFields, quantity });
    return parseOrThrow(taskSuggestionsSchema, taskSuggestions, "getTaskSuggestions");
  } catch (error) {
    throwApiError(error);
  }
};