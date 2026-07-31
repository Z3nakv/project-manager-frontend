import type { ProjectItemSchemaDetailsType } from "../../../types/project";

type handleTeamMembersProps = {
    project?: ProjectItemSchemaDetailsType
}

export const handleTeamMembers = ({project} : handleTeamMembersProps) =>  { 
    if (!project) return [];
    return [
    ...new Set([
      ...(project?.team?.map((member) => member._id) ?? []),
      ...(project?.manager?._id
        ? [project.manager._id]
        : []),
    ]),
  ]}