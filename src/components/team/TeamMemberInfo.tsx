import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import {
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import type { TeamMember } from "../../types/team";

type TeamMemberInfoProps = {
  member: TeamMember
  index: number
  teamMemberLength: number
  handleRemoveUserFromProject: (memberId: string) => void
}

const TeamMemberInfo = ({member, index, teamMemberLength, handleRemoveUserFromProject} : TeamMemberInfoProps) => {
  return (
    <>
      <li
        key={member._id}
        className={`flex items-center justify-between px-4 sm:px-6 py-4 ${index !== teamMemberLength - 1 ? "border-b border-border-subtle" : ""}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-sm">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              {member.name}
            </p>
            <p className="text-xs text-text-muted truncate">{member.email}</p>
          </div>
        </div>

        <Menu as="div" className="relative flex-none ml-2">
          <MenuButton className="p-1 rounded-md text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors duration-150">
            <EllipsisVerticalIcon
              className="cursor-pointer h-6 w-6"
              aria-hidden="true"
            />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-6 top-8 z-10 min-w-44 rounded-xl overflow-hidden border border-border bg-surface-elevated shadow-[0_8px_24px_rgba(0,0,0,0.4)] focus:outline-none">
              <MenuItem>
                <button
                  type="button"
                  onClick={() => handleRemoveUserFromProject(member._id)}
                  className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error transition-colors duration-100 data-focus:bg-error/10"
                >
                  <TrashIcon className="h-4 w-4" />
                  Eliminar del proyecto
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </li>
    </>
  );
};

export default TeamMemberInfo;
