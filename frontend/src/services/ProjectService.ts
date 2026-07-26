import { del, get, post, put, throwApiError } from "../lib/axios";
import { parseOrThrow } from "../lib/parseOrThrow";
import {
  dashboardProjectSchema,
  projectItemSchemaDetailsById,
  type ProjectFormDataType,
  type ProjectItemType,
} from "../types/project";

export const getAllProjects = async () => {
  const url = "/projects";
  try {
    const projects = await get<unknown>(url);
    return parseOrThrow(dashboardProjectSchema, projects, "projects");
  } catch (error) {
    throwApiError(error);
  }
};

type getProjectByIdProps = {
  projectId: ProjectItemType["_id"];
};

export const getProjectById = async ({ projectId }: getProjectByIdProps) => {
  const url = `/projects/${projectId}`;
  try {
    const project = await get<unknown>(url);
    return parseOrThrow(projectItemSchemaDetailsById, project, "getProjectById");
  } catch (error) {
    throwApiError(error);
  }
};

type CreateProjectProps = {
  formData: ProjectFormDataType;
};

export const createProject = async ({ formData }: CreateProjectProps) => {
  const url = "/projects/create-project";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

type updateProjectProps = {
  projectId: ProjectItemType["_id"];
  formData: ProjectFormDataType;
};

export const updateProject = async ({ projectId, formData }: updateProjectProps) => {
  const url = `/projects/${projectId}`;
  try {
    return await put<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const deleteProject = async (projectId: ProjectItemType["_id"]) => {
  const url = `/projects/${projectId}`;
  try {
    return await del<string>(url);
  } catch (error) {
    throwApiError(error);
  }
};