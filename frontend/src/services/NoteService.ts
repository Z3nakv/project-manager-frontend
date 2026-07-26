import { del, post, put, throwApiError } from "../lib/axios";
import type { Note, NoteFormData } from "../types/note";
import type { ProjectItemSchemaDetailsType } from "../types/project";
import type { Task } from "../types/task";

type NoteAPIType = {
  formData: NoteFormData;
  projectId: ProjectItemSchemaDetailsType["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};

export const createNote = async ({ formData, projectId, taskId }: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes`;
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const deleteNote = async ({ projectId, taskId, noteId }: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
  try {
    return await del<string>(url);
  } catch (error) {
    throwApiError(error);
  }
};

export const updateNoteStatus = async ({ projectId, taskId, noteId }: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}/status`;
  try {
    return await put<string>(url);
  } catch (error) {
    throwApiError(error);
  }
};