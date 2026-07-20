import type { Task } from "../../../types/task";

type handleTeamMembersProps = {
    taskData?: Task
}

export const handleTeamMembers = ({taskData} : handleTeamMembersProps) =>  { 
    if (!taskData) return [];
    return [
    ...new Set([
      ...(taskData?.project?.team?.map((member) => member._id) ?? []),
      ...(taskData?.project?.manager?._id
        ? [taskData.project.manager._id]
        : []),
    ]),
  ]}