import z from "zod";

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
export type attachmentsSchemaType = z.infer<typeof attachmentsSchema>