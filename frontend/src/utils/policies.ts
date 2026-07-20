import type { ProjectFormType } from "../types/project";
import type { TeamMember } from "../types/team";


export const isManager = (managerID: ProjectFormType['manager']['_id'], userID: TeamMember['_id']) => managerID === userID;