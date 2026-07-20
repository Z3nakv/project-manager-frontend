import type { User } from "../../../types/user";

type AssignTaskMembersProps = {
    AssignedMembers?: User[]
}
const AssignTaskMembers = ({AssignedMembers} : AssignTaskMembersProps) => {
    
  return (
    <div className="flex -space-x-2 justify-end">
      {AssignedMembers?.length ? AssignedMembers?.map((user) => (
        <img
          key={user._id}
          src={user.avatar ?? "/default-profile-picture-24.webp"}
          className="w-6 h-6 rounded-full border-2 border-[#1e2330]"
          title={user.name}
        />
      ))
      : null
    }
    </div>
  );
};

export default AssignTaskMembers;
