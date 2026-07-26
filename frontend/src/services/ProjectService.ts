import { httpDelete, httpGet, httpPost, httpPut } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";
import {
  dashboardProjectSchema,
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

type CreateProjectProps = {
  formData: ProjectFormDataType;
};

export const createProject = async ({ formData }: CreateProjectProps) => {
  const url = "/projects/create-project";
  return httpPost<string>(url, formData);
};

type updateProjectProps = {
  projectId: ProjectItemType["_id"];
  formData: ProjectFormDataType;
};
export const updateProject = async ({ projectId, formData }: updateProjectProps) => {
  const url = `/projects/${projectId}`;
  return httpPut<string>(url, formData);
};

export const deleteProject = async (projectId: ProjectItemType["_id"]) => {
  const url = `/projects/${projectId}`;
  return httpDelete<string>(url);
};
