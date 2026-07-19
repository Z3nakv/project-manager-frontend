import { dashboardProjectSchema, projectItemSchemaDetailsByID, type ProjectFormDataType, type ProjectItemType } from "../types";
import { api } from "../lib/axios";

export const getAllProjects = async () => {

    const {data} = await api('/projects');
    const response = dashboardProjectSchema.safeParse(data);
    if(response.success) return response.data;
}

export const getProjectByID = async(projectID : ProjectItemType['_id']) => {
    const {data} = await api(`/projects/${projectID}`);
    const response = projectItemSchemaDetailsByID.safeParse(data);
    if(response.success) return response.data ?? [];
}

type CreateProjectType = {
    formData: ProjectFormDataType
}

export const createProject = async ({formData} : CreateProjectType) => {
    try {
        const {data} = await api.post<string>('/projects/create-project', formData);
        return data;
    } catch (error) {
        console.log(error);
    }
}

type dataTypes = {
    projectID: ProjectItemType['_id'];
    formData: ProjectFormDataType;
}
export const updateProject = async ({projectID, formData} : dataTypes) => {
    const url = `/projects/${projectID}`
    const {data} = await api.put<string>(url, formData);
    return data;
}

export const deleteProject = async (projectID : ProjectItemType['_id']) => {
    const url = `/projects/${projectID}`
    const {data} = await api.delete<string>(url);
    return data;
}