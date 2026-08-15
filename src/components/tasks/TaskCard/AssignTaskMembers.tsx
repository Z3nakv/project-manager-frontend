import type { projectTask } from "../../../types/task";

type AssignTaskMembersProps = {
  assignedMembers: projectTask['assignedTo'];
};
const AssignTaskMembers = ({ assignedMembers }: AssignTaskMembersProps) => {
  
  const team = assignedMembers ? assignedMembers.length : 0 ;  
  
  return (
    <div className="flex -space-x-2 justify-end">
      {team
        ? assignedMembers?.map((user, i) => {
            if (i + 1 === 4) return;
            return (
              <img
                key={user._id}
                src={user.avatarUrl ?? "/default-profile-picture-24.webp"}
                className="w-6 h-6 rounded-full border-2 border-surface-elevated"
                title={user.name}
              />
            );
          })
        : null}
      {team > 4 && (
        <div className="flex justify-center items-center w-6 h-6 rounded-full text-text-secondary border-2 border-surface-elevated bg-surface-hover">
          <p className="text-[10px]">
            {`${team - 4}`}+
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignTaskMembers;
