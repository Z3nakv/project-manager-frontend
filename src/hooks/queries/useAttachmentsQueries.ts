import { useQuery } from "@tanstack/react-query";
import { getTaskAttachments } from "../../services/AttachmentService";

type UseTaskAttachmentsParams = {
  projectId: string;
  taskId: string;
};

export function useTaskAttachments({ projectId, taskId }: UseTaskAttachmentsParams) {
  return useQuery({
    queryKey: ["taskAttachments", taskId],
    queryFn: () => getTaskAttachments({ projectId, taskId }),
    enabled: !!taskId,
    refetchOnWindowFocus: false
  });
}

