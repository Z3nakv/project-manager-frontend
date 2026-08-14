import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon 
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import type { Task } from "../../../../types/task";
import { useDeleteTaskMutation } from "../../../../hooks/mutations/useTaskMutations";
import useProjectId from "../../../../hooks/useProjectId";

type TaskMenuItemsProps = {
  canEdit: boolean;
  taskId: Task["_id"];
};

const TaskMenuItems = ({ canEdit, taskId }: TaskMenuItemsProps) => {
  const navigate = useNavigate();
  const projectId = useProjectId();

  const { mutate } = useDeleteTaskMutation({ projectId });

  return (
    <>
      <Menu as="div" className="relative flex-none font-mono text-xs">
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
          <MenuItems className="absolute right-0 top-8 z-10 min-w-40 rounded-xl overflow-hidden border border-border bg-surface-elevated shadow-lifted focus:outline-none">
            
            <MenuItem>
              <button
                onClick={() =>
                  navigate(location.pathname + `?viewTask=${taskId}`)
                }
                className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-text-secondary transition-colors duration-100 data-focus:bg-surface-hover"
              >
                <EyeIcon className="h-4 w-4 text-text-muted" />
                Ver tarea
              </button>
            </MenuItem>

            <div className="border-t border-border-subtle" />

            {canEdit ? (
              <>
                <MenuItem>
                  <button
                    onClick={() =>
                      navigate(location.pathname + `?editTask=${taskId}`)
                    }
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-text-secondary transition-colors duration-100 data-focus:bg-surface-hover"
                  >
                    <PencilSquareIcon className="h-4 w-4 text-text-muted" />
                    Editar tarea
                  </button>
                </MenuItem>

                <div className="border-t border-border-subtle" />

                <MenuItem>
                  <button
                    onClick={() =>
                      navigate(location.pathname + `?viewAssignMember=${taskId}`)
                    }
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-text-secondary transition-colors duration-100 data-focus:bg-surface-hover"
                  >
                    <UserGroupIcon className="h-4 w-4 text-text-muted" />
                    Asignar
                  </button>
                </MenuItem>

                <div className="border-t border-border-subtle" />

                <MenuItem>
                  <button
                    onClick={() => mutate({ projectId, taskId: taskId })}
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-error transition-colors duration-100 data-focus:bg-error-subtle"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Eliminar tarea
                  </button>
                </MenuItem>

                
              </>
            ) : null}
          </MenuItems>
        </Transition>
      </Menu>
    </>
  );
};

export default TaskMenuItems;
