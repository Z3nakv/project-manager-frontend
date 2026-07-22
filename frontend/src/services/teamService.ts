import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { teamMemberSchema, TeamMembersSchema, type TeamMember, type TeamMemberForm } from "../types/team";
import type { ProjectFormType } from "../types/project";
import { parseOrThrow } from "../lib/parseOrThrow";

export const findUserByEmail = async ({projectId, formData}: 
{projectId: ProjectFormType['_id'], formData: TeamMemberForm }) => {
  try {
    const url = `/projects/${projectId}/team/find`
    const { data: user } = await api.post(url, formData)
    return parseOrThrow(teamMemberSchema, user, 'findUserByEmail');
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error })
    }
    throw error
  }
}

export const addUserToProject = async ({projectId, _id} : {projectId: ProjectFormType['_id'], _id: TeamMember['_id']}) => {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post<string>(url, {_id});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
    throw error;
  }
}

export const getProjectTeam = async (projectId: ProjectFormType['_id']) => {
  try {
    const url = `/projects/${projectId}/team`;
    const { data: team } = await api(url);
    return parseOrThrow(TeamMembersSchema, team, 'getProjectTeam');
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
    throw error;
  }
}

export const removeUserFromProject = async ({projectId, userId} : {projectId: ProjectFormType['_id'], userId: TeamMember['_id']}) => {
  try {
    const url = `/projects/${projectId}/team/${userId}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
    throw error;
  }
}
