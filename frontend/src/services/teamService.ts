import { addUserToProjectSchema, removeUserFromProjectSchema, teamMemberSchema, TeamMembersSchema, type TeamMember, type TeamMemberForm } from "../types/team";
import type { ProjectFormType } from "../types/project";
import { parseOrThrow } from "../lib/parseOrThrow";
import { httpDelete, httpGet, httpPost } from "../lib/http";

export const findUserByEmail = async ({projectId, formData}: 
{projectId: ProjectFormType['_id'], formData: TeamMemberForm }) => {
    const url = `/projects/${projectId}/team/find`
    const user = await httpPost<unknown>(url, formData)
    return parseOrThrow(teamMemberSchema, user, 'findUserByEmail');
}

export const addUserToProject = async ({projectId, _id} : {projectId: ProjectFormType['_id'], _id: TeamMember['_id']}) => {
    const url = `/projects/${projectId}/team`;
    const data = await httpPost<string>(url, {_id});
    return parseOrThrow(addUserToProjectSchema, data, "addUserToProject")
}

export const getProjectTeam = async (projectId: ProjectFormType['_id']) => {
    const url = `/projects/${projectId}/team`;
    const team = await httpGet<unknown>(url);
    return parseOrThrow(TeamMembersSchema, team, 'getProjectTeam');
}

export const removeUserFromProject = async ({projectId, userId} : {projectId: ProjectFormType['_id'], userId: TeamMember['_id']}) => {
    const url = `/projects/${projectId}/team/${userId}`;
    const response = await httpDelete<unknown>(url);
    return parseOrThrow(removeUserFromProjectSchema, response, "removeUserFromProject");
}
