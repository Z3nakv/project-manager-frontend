import { Fragment } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { FaBars, FaUserCircle, FaFolderOpen  } from "react-icons/fa";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";
import { logoutUser } from "../services/authService";
import { setAccessToken } from "../utils/auth";

type NavMenuProps = {
  name: User['name']
}

export default function ProfileMenu({name} : NavMenuProps) {

  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const logout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    // igual continuamos con la limpieza local, aunque falle la llamada
  } finally {
    setAccessToken(null); 
    queryClient.clear();
    navigate("/");
  }
};

  return (
    <Popover className="relative font-mono">
      <PopoverButton 
      className="inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-surface-hover hover:bg-surface-base border border-border transition-colors duration-150 focus:outline-none"
      aria-label="menu"
      >
        <FaBars className="cursor-pointer w-6 h-6 text-text-secondary" />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-10 bottom-10 z-10 mt-3 w-56">
          {({ close }) => ( 
            <div className="rounded-xl overflow-hidden border border-border bg-surface-elevated shadow-lifted">

              <div className="px-4 py-3 border-b border-border-subtle">
                <p className="text-xs text-text-muted uppercase tracking-widest">Sesión iniciada como</p>
                <p className="text-sm font-semibold text-text-primary mt-0.5">{name}</p>
              </div>

              <div className="py-1.5">
                <Link
                  to="/profile"
                  onClick={() => close()} 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors duration-100"
                >
                  <FaUserCircle  className="h-4 w-4 text-text-muted" />
                  Mi Perfil
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => close()} 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors duration-100"
                >
                  <FaFolderOpen  className="h-4 w-4 text-text-muted" />
                  Mis Proyectos
                </Link>
              </div>

              <div className="border-t border-border-subtle py-1.5">
                <button
                  type="button"
                  onClick={() => { logout(); close(); }}
                  className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-error-subtle transition-colors duration-100"
                >
                  <HiMiniArrowRightStartOnRectangle className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </div>

            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}