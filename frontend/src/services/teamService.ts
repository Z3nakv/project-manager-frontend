import { del, get, post, throwApiError } from "../lib/axios";
import { parseOrThrow } from "../lib/parseOrThrow";
import { teamMemberSchema, TeamMembersSchema, type TeamMember, type TeamMemberForm } from "../types/team";
import type { ProjectFormType } from "../types/project";

type RemoveUserFromProjectResponse = {
  message: string;
  manager: string;
  colaborador: string;
};

export const findUserByEmail = async ({ projectId, formData }: { projectId: ProjectFormType["_id"]; formData: TeamMemberForm }) => {
  try {
    const url = `/projects/${projectId}/team/find`;
    const user = await post<unknown>(url, formData);
    return parseOrThrow(teamMemberSchema, user, "findUserByEmail");
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

export const addUserToProject = async ({ projectId, _id }: { projectId: ProjectFormType["_id"]; _id: TeamMember["_id"] }) => {
  try {
    const url = `/projects/${projectId}/team`;
    return await post<string>(url, { _id });
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

export const getProjectTeam = async (projectId: ProjectFormType["_id"]) => {
  try {
    const url = `/projects/${projectId}/team`;
    const team = await get<unknown>(url);
    return parseOrThrow(TeamMembersSchema, team, "getProjectTeam");
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};

export const removeUserFromProject = async ({ projectId, userId }: { projectId: ProjectFormType["_id"]; userId: TeamMember["_id"] }): Promise<RemoveUserFromProjectResponse> => {
  try {
    const url = `/projects/${projectId}/team/${userId}`;
    return await del<RemoveUserFromProjectResponse>(url);
  } catch (error) {
    throwApiError(error);
    return Promise.reject(error);
  }
};