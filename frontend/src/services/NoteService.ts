
import type { Note, NoteFormData, ProjectItemSchemaDetailsType, Task } from "../types";
import { api } from "../lib/axios";

type NoteAPIType = {
    formData: NoteFormData
    projectID: ProjectItemSchemaDetailsType['_id']
    taskID: Task['_id']
    noteID: Note['_id']
}

export const createNote = async ({formData, projectID, taskID} : Pick<NoteAPIType, 'projectID' | 'taskID' | 'formData'>) => {
    const url = `/projects/${projectID}/tasks/${taskID}/notes`
    
    const { data } = await api.post<string>(url, formData);
    
    return data;
}

export const deleteNote = async ({projectID, taskID, noteID} : Pick<NoteAPIType, 'projectID' | 'taskID' | 'noteID'>) => {
    const url = `/projects/${projectID}/tasks/${taskID}/notes/${noteID}`
    const { data } = await api.delete<string>(url);
    
    return data;
}