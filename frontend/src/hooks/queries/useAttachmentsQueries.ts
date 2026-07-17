import { useQuery } from "@tanstack/react-query";
import { getTaskAttachments } from "../../services/AttachmentService";

type UseTaskAttachmentsParams = {
  projectID: string;
  taskID: string;
};

export function useTaskAttachments({ projectID, taskID }: UseTaskAttachmentsParams) {
  return useQuery({
    queryKey: ["taskAttachments", taskID],
    queryFn: () => getTaskAttachments({ projectID, taskID }),
    enabled: !!taskID,
    refetchOnWindowFocus: false
  });
}

