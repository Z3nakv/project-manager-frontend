import { httpDelete, httpPost, httpPut } from "../lib/http";
import type { Note, NoteFormData } from "../types/note";
import type { ProjectItemSchemaDetailsType } from "../types/project";
import type { Task } from "../types/task";

type NoteAPIType = {
  formData: NoteFormData;
  projectId: ProjectItemSchemaDetailsType["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};

export const createNote = async ({
  formData,
  projectId,
  taskId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes`;
  return httpPost<string>(url, formData);
};

export const deleteNote = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
  return httpDelete<string>(url);
};

export const updateNoteStatus = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}/status`;
  return httpPut<string>(url);
};
