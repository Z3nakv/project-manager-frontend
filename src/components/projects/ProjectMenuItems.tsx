import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router"
import { Fragment } from "react/jsx-runtime"
import { useDeleteProjectMutation } from "../../hooks/mutations/useProjectMutations"

type ProjectMenuItemsProps = {
    projectId: string,
    userIsManager: boolean
}
const ProjectMenuItems = ({projectId, userIsManager}:ProjectMenuItemsProps) => {
    const { mutate } = useDeleteProjectMutation();
  return (
    <Menu as="div" className="relative">
          <MenuButton
            aria-label="Opciones del proyecto"
            className="cursor-pointer p-1 rounded-md text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors duration-150"
          >
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
            <MenuItems className="text-[10px] absolute right-0 top-8 z-10 min-w-44 rounded-xl overflow-hidden border border-border bg-surface-elevated shadow-lifted focus:outline-none">
              <MenuItem>
                <Link
                  to={`/projects/${projectId}`}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-text-secondary transition-colors duration-100 data-focus:bg-surface-hover"
                >
                  <EyeIcon className="h-4 w-4 text-text-muted" />
                  Ver proyecto
                </Link>
              </MenuItem>

              {userIsManager && (
                <>
                  <div className="border-t border-border-subtle" />
                  <MenuItem>
                    <Link
                      to={`/projects/${projectId}/edit`}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-text-secondary transition-colors duration-100 data-focus:bg-surface-hover"
                    >
                      <PencilSquareIcon className="h-4 w-4 text-text-muted" />
                      Editar proyecto
                    </Link>
                  </MenuItem>

                  <div className="border-t border-border-subtle" />
                  <MenuItem>
                    <button
                      onClick={() => mutate(projectId)}
                      className="cursor-pointer flex items-center gap-3 w-full px-3 py-2.5 text-error transition-colors duration-100 data-focus:bg-error-subtle"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Eliminar proyecto
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
  )
}

export default ProjectMenuItems