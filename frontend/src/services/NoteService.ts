import type { Note, NoteFormData } from "../types/note";
import type { ProjectItemSchemaDetailsType } from "../types/project";
import type { Task } from "../types/task";
import { httpDelete, httpPost, httpPut } from "../lib/http";

type NoteAPIType = {
  formData: NoteFormData;
  projectId: ProjectItemSchemaDetailsType["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};
type MessageResponse = { message: string };

export const createNote = async ({
  formData,
  projectId,
  taskId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
};

export const deleteNote = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const data = await httpDelete<MessageResponse>(url);
    return data.message;
};

export const updateNoteStatus = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}/status`;
    const data = await httpPut<MessageResponse>(url);
    return data.message;
};
