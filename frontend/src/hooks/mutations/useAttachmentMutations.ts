// hooks/useAttachmentMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"; // tu función de API
import { uploadAttachment } from "../../services/AttachmentService";

type UploadAttachmentParams = {
  projectId: string;
  taskId: string;
  formData: FormData;
};

export function useUploadAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, taskId, formData }: UploadAttachmentParams) =>
      uploadAttachment({ projectId, taskId, formData }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["taskAttachments", variables.taskId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}