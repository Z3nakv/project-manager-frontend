import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { teamMemberSchema, TeamMembersSchema, type ProjectFormType, type TeamMember, type TeamMemberForm } from "../types";
import throttle from "lodash/throttle";

export const findUserByEmail = throttle(async ({projectID, formData} : {projectID: ProjectFormType['_id'], formData: TeamMemberForm}) => {

  try {
    const url = `/projects/${projectID}/team/find`;
    const { data } = await api.post<TeamMember>(url, formData);
    const response = teamMemberSchema.safeParse(data);
    if(response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
  }
},3000)

export const addUserToProject = throttle(async ({projectID, _id} : {projectID: ProjectFormType['_id'], _id: TeamMember['_id']}) => {
    
  try {
    const url = `/projects/${projectID}/team`;
    const { data } = await api.post<string>(url, {_id});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
  }
},3000)

export const getProjectTeam = async (projectID: ProjectFormType['_id']) => {
    
  try {
    const url = `/projects/${projectID}/team`;
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

export const removeUserFromProject = async ({projectID, userID} : {projectID: ProjectFormType['_id'], userID: TeamMember['_id']}) => {
    
  try {
    const url = `/projects/${projectID}/team/${userID}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
  }
}
