import { httpGet, httpPost } from "../lib/http";
import z from "zod";

type UploadAttachmentParams = {
  projectId: string;
  taskId: string;
  formData: FormData;
};

export async function uploadAttachment({ projectId, taskId, formData }: UploadAttachmentParams) {
  const url = `/projects/${projectId}/tasks/${taskId}/images`;
  return httpPost(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export const attachmentSchema = z.object({
  _id: z.string(),
  filename: z.string(),
  url: z.string(),
  publicId: z.string(),
  mimeType: z.string(),
  size: z.string(),
  task: z.string(),
  uploadedBy: z.string(),
  createdAt: z.string(),
});

export const attachmentsSchema = z.array(attachmentSchema);
export type attachmentsSchemaType = z.infer<typeof attachmentsSchema>;

type GetTaskAttachmentsParams = {
  projectId: string;
  taskId: string;
};

export async function getTaskAttachments({ projectId, taskId }: GetTaskAttachmentsParams) {
  const url = `/projects/${projectId}/tasks/${taskId}/images`;
  const data = await httpGet<unknown>(url);
  const response = attachmentsSchema.safeParse(data);
  if (response.success) return response.data;
  throw new Error("Datos de attachments no válidos");
}

