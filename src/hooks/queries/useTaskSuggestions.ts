import { useQuery } from "@tanstack/react-query";
import { getTaskSuggestions } from "../../services/aiService";

export function useTaskSuggestions (projectId: string, selectedFields: string[], quantity: number, enabled: boolean) {
    return useQuery({
        queryKey: ['taskSuggestions', projectId, selectedFields, quantity],
        queryFn: () => getTaskSuggestions(projectId, selectedFields, quantity),
        enabled,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    })
}