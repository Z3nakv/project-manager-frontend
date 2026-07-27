import { httpDelete, httpGet, httpPost, httpPut } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";
import {
  dashboardProjectSchema,
  editProjectSchema,
  projectItemSchemaDetailsById,
  type ProjectFormDataType,
  type ProjectItemType,
} from "../types/project";

export const getAllProjects = async () => {
  const url = "/projects";
  const projects = await httpGet<unknown>(url);
  return parseOrThrow(dashboardProjectSchema, projects, "projects");
};

type getProjectByIdProps = {
  projectId: ProjectItemType["_id"];
};

export const getProjectById = async ({projectId}: getProjectByIdProps) => {
  const url = `/projects/${projectId}`;
  const project = await httpGet<unknown>(url);
  return parseOrThrow(projectItemSchemaDetailsById, project, "getProjectById");
};

export const getEditProjectById = async ({projectId}: getProjectByIdProps) => {
  const url = `/projects/${projectId}/edit`;
  const project = await httpGet<unknown>(url);
  return parseOrThrow(editProjectSchema, project, "getEditProjectById");
}

type CreateProjectProps = {
  formData: ProjectFormDataType;
};
type MessageResponse = { message: string };

export const createProject = async ({ formData }: CreateProjectProps) => {
  const url = "/projects/create-project";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

type updateProjectProps = {
  projectId: ProjectItemType["_id"];
  formData: ProjectFormDataType;
};
export const updateProject = async ({ projectId, formData }: updateProjectProps) => {
  const url = `/projects/${projectId}`;
  const data = await httpPut<MessageResponse>(url, formData);
  return data.message
};

export const deleteProject = async (projectId: ProjectItemType["_id"]) => {
  const url = `/projects/${projectId}`;
  const data = await httpDelete<MessageResponse>(url);
  return data.message;
};
