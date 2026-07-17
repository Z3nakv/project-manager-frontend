import { api } from "../lib/axios";
import z from "zod";

type UploadAttachmentParams = {
  projectID: string;
  taskID: string;
  formData: FormData;
};

export async function uploadAttachment({ projectID, taskID, formData }: UploadAttachmentParams) {
  const url = `/projects/${projectID}/tasks/${taskID}/images`;
  const { data } = await api.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export const attachmentSchema = z.object({
  _id: z.string(),
  filename: z.string(),
  url: z.string(),
  publicID: z.string(),
  mimeType: z.string(),
  size: z.string(),
  task: z.string(),
  uploadedBy: z.string(),
  createdAt: z.string(),
});

export const attachmentsSchema = z.array(attachmentSchema);
export type attachmentsSchemaType = z.infer<typeof attachmentsSchema>

type GetTaskAttachmentsParams = {
  projectID: string;
  taskID: string;
};

export async function getTaskAttachments({ projectID, taskID }: GetTaskAttachmentsParams) {
  const url = `/projects/${projectID}/tasks/${taskID}/images`;
  const { data } = await api.get(url);
  const response = attachmentsSchema.safeParse(data);
  if (response.success) {
    return response.data;
  }

  throw new Error("Datos de attachments no válidos");
}

