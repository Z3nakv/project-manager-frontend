import { api } from "../lib/axios";
import { parseOrThrow } from "../lib/parseOrThrow";
import {
  dashboardProjectSchema,
  projectItemSchemaDetailsById,
  type ProjectFormDataType,
  type ProjectItemType,
} from "../types/project";

export const getAllProjects = async () => {
  const url = "/projects";
  const { data: projects } = await api(url);
  return parseOrThrow(dashboardProjectSchema, projects, "projects");
};

type getProjectByIdProps = {
  projectId: ProjectItemType["_id"];
};

export const getProjectById = async ({projectId}: getProjectByIdProps) => {
  const url = `/projects/${projectId}`;
  const { data: project } = await api(url);
  return parseOrThrow(projectItemSchemaDetailsById, project, "getProjectById");
};

type CreateProjectProps = {
  formData: ProjectFormDataType;
};

export const createProject = async ({ formData }: CreateProjectProps) => {
  const url = "/projects/create-project";
  const { data } = await api.post<string>(url, formData);
  return data;
};

type updateProjectProps = {
  projectId: ProjectItemType["_id"];
  formData: ProjectFormDataType;
};
export const updateProject = async ({ projectId, formData }: updateProjectProps) => {
  const url = `/projects/${projectId}`;
  const { data } = await api.put<string>(url, formData);
  return data;
};

export const deleteProject = async (projectId: ProjectItemType["_id"]) => {
  const url = `/projects/${projectId}`;
  const { data } = await api.delete<string>(url);
  return data;
};
