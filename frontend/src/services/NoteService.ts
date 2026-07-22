
import { api } from "../lib/axios";
import type { Note, NoteFormData } from "../types/note";
import type { ProjectItemSchemaDetailsType } from "../types/project";
import type { Task } from "../types/task";

type NoteAPIType = {
    formData: NoteFormData
    projectId: ProjectItemSchemaDetailsType['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export const createNote = async ({formData, projectId, taskId} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`
    const { data } = await api.post<string>(url, formData);
    return data;
}

export const deleteNote = async ({projectId, taskId, noteId} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
    const { data } = await api.delete<string>(url);
    return data;
}

export const updateNoteStatus = async ({projectId, taskId, noteId} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}/status`;
    const { data } = await api.put<string>(url);
    return data;
}