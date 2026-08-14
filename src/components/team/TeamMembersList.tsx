

import {
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import TeamMemberInfo from "./TeamMemberInfo";
import type { TeamMember } from "../../types/team";

type TeamMembersListProps = {
    teamMembers: TeamMember[]
    handleRemoveUserFromProject: (memberId: string) => void
}

const TeamMembersList = ({teamMembers, handleRemoveUserFromProject} : TeamMembersListProps) => {
  return (
    <>
      {teamMembers.length ? (
        <ul>
          {teamMembers.map((member, index) => (
            <TeamMemberInfo
            key={member._id}
            member={member} 
            index={index} 
            teamMemberLength={teamMembers.length} 
            handleRemoveUserFromProject={handleRemoveUserFromProject} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-hover border border-border flex items-center justify-center">
            <UserGroupIcon className="h-6 w-6 text-text-muted" />
          </div>
          <p className="text-text-secondary text-sm font-medium">
            No hay miembros en este equipo
          </p>
          <p className="text-text-muted text-xs">
            Agrega colaboradores para comenzar
          </p>
        </div>
      )}
    </>
  );
};

export default TeamMembersList;
