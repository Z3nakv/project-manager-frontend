import { isAxiosError } from "axios";
import { api } from "../lib/axios";
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
  try {
    const { data } = await api.post(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const deleteNote = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
  try {
    const { data } = await api.delete(url);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const updateNoteStatus = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}/status`;
  try {
    const { data } = await api.put(url);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};
