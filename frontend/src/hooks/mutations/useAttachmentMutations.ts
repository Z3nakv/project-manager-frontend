// hooks/useAttachmentMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"; // tu función de API
import { uploadAttachment } from "../../services/AttachmentService";

type UploadAttachmentParams = {
  projectID: string;
  taskID: string;
  formData: FormData;
};

export function useUploadAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectID, taskID, formData }: UploadAttachmentParams) =>
      uploadAttachment({ projectID, taskID, formData }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["taskAttachments", variables.taskID] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}