import type { ProjectFormType } from "../types/project";
import type { TeamMember } from "../types/team";


export const isManager = (managerId: ProjectFormType['manager']['_id'], userId: TeamMember['_id']) => managerId === userId;