import type { ProjectFormType, TeamMember } from "../types";


export const isManager = (managerID: ProjectFormType['manager']['_id'], userID: TeamMember['_id']) => managerID === userID;