import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { teamMemberSchema, TeamMembersSchema, type TeamMember, type TeamMemberForm } from "../types/team";
import type { ProjectFormType } from "../types/project";

export const findUserByEmail = async ({projectId, formData} : {projectId: ProjectFormType['_id'], formData: TeamMemberForm}) => {

  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post<TeamMember>(url, formData);
    const response = teamMemberSchema.safeParse(data);
    if(response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
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
  }
}

export const getProjectTeam = async (projectId: ProjectFormType['_id']) => {
    
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api(url);
    const response = TeamMembersSchema.safeParse(data);
    if(response.success){
        return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
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
  }
}
