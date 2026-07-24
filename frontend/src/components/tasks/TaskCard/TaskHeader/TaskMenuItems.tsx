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
import { useNavigate, useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import type { Task } from "../../../../types/task";
import { useDeleteTaskMutation } from "../../../../hooks/mutations/useTaskMutatios";

type TaskMenuItemsProps = {
  canEdit: boolean;
  taskId: Task["_id"];
};

const TaskMenuItems = ({ canEdit, taskId }: TaskMenuItemsProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useDeleteTaskMutation({ projectId });

  return (
    <>
      <Menu as="div" className="relative flex-none">
        <MenuButton className="p-1 rounded-md text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150">
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
          <MenuItems className="absolute right-0 top-8 z-10 min-w-40 rounded-xl overflow-hidden border border-[#2d3348] bg-[#252d3d] shadow-[0_8px_24px_rgba(0,0,0,0.4)] focus:outline-none">
            <MenuItem>
              <button
                onClick={() =>
                  navigate(location.pathname + `?viewTask=${taskId}`)
                }
                className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
              >
                <EyeIcon className="h-4 w-4 text-slate-400" />
                Ver tarea
              </button>
            </MenuItem>

            <div className="border-t border-[#2d3348]" />

            {canEdit ? (
              <>
                <MenuItem>
                  <button
                    onClick={() =>
                      navigate(location.pathname + `?editTask=${taskId}`)
                    }
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
                  >
                    <PencilSquareIcon className="h-4 w-4 text-slate-400" />
                    Editar tarea
                  </button>
                </MenuItem>

                <div className="border-t border-[#2d3348]" />

                <MenuItem>
                  <button
                    onClick={() =>
                      navigate(location.pathname + `?viewAssignMember=${taskId}`)
                    }
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-300 transition-colors duration-100 data-focus:bg-[#2d3a4f]"
                  >
                    <UserGroupIcon className="h-6 w-6 text-gray-500" />
                    Asignar
                  </button>
                </MenuItem>

                <div className="border-t border-[#2d3348]" />

                <MenuItem>
                  <button
                    onClick={() => mutate({ projectId, taskId: taskId })}
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 transition-colors duration-100 data-focus:bg-red-500/10"
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
