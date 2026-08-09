import type { projectTask } from "../../../types/task";

type AssignTaskMembersProps = {
  AssignedMembers: projectTask['assignedTo'];
};
const AssignTaskMembers = ({ AssignedMembers }: AssignTaskMembersProps) => {
  const team = AssignedMembers ? AssignedMembers.length : 0 ;  
  return (
    <div className="flex -space-x-2 justify-end">
      {team
        ? AssignedMembers?.map((user, i) => {
            if (i + 1 === 4) return;
            return (
              <img
                key={user._id}
                src={user.avatar ?? "/default-profile-picture-24.webp"}
                className="w-6 h-6 rounded-full border-2 border-[#1e2330]"
                title={user.name}
              />
            );
          })
        : null}
      {team > 4 && (
        <div className="flex justify-center items-center w-6 h-6 rounded-full text-white border-2 border-black bg-black">
          <p className="text-[10px]">
            {`${team - 4}`}+
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignTaskMembers;
