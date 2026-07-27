import { api } from "../lib/axios";
import { httpGet } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";
import { attachmentsSchema } from "../types/attachment";

type UploadAttachmentParams = {
  projectId: string;
  taskId: string;
  formData: FormData;
};

export async function uploadAttachment({ projectId, taskId, formData }: UploadAttachmentParams) {
  const url = `/projects/${projectId}/tasks/${taskId}/images`;
  const { data } = await api.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

type GetTaskAttachmentsParams = {
  projectId: string;
  taskId: string;
};

export async function getTaskAttachments({ projectId, taskId }: GetTaskAttachmentsParams) {
  const url = `/projects/${projectId}/tasks/${taskId}/images`;
  const data = await httpGet<unknown>(url);
  parseOrThrow(attachmentsSchema, data, "getTaskAttachments");
}

