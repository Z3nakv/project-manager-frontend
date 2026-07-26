import { httpDelete, httpGet, httpPost } from "../lib/http";
import { teamMemberSchema, TeamMembersSchema, type TeamMember, type TeamMemberForm } from "../types/team";
import type { ProjectFormType } from "../types/project";
import { parseOrThrow } from "../lib/parseOrThrow";

type RemoveUserFromProjectResponse = {
  manager: string;
  colaborador: string;
  message?: string;
};

export const findUserByEmail = async ({projectId, formData}: 
{projectId: ProjectFormType['_id'], formData: TeamMemberForm }) => {
  const url = `/projects/${projectId}/team/find`;
  const user = await httpPost<TeamMember>(url, formData);
  return parseOrThrow(teamMemberSchema, user, 'findUserByEmail');
};

export const addUserToProject = async ({projectId, _id} : {projectId: ProjectFormType['_id'], _id: TeamMember['_id']}) => {
  const url = `/projects/${projectId}/team`;
  return httpPost<string>(url, {_id});
};

export const getProjectTeam = async (projectId: ProjectFormType['_id']) => {
  const url = `/projects/${projectId}/team`;
  const team = await httpGet<unknown>(url);
  return parseOrThrow(TeamMembersSchema, team, 'getProjectTeam');
};

export const removeUserFromProject = async ({projectId, userId} : {projectId: ProjectFormType['_id'], userId: TeamMember['_id']}) => {
  const url = `/projects/${projectId}/team/${userId}`;
  return httpDelete<RemoveUserFromProjectResponse>(url);
};
