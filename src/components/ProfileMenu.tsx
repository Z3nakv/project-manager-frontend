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
      className="inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-[#2d3348] hover:bg-[#353d55] border border-[#3d4663] transition-colors duration-150 focus:outline-none"
      aria-label="menu"
      >
        <FaBars className="cursor-pointer w-6 h-6 text-slate-300" />
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
            <div className="rounded-xl overflow-hidden border border-[#2d3348] bg-[#252d3d] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">

              <div className="px-4 py-3 border-b border-[#2d3348]">
                <p className="text-xs text-slate-500 uppercase tracking-widest">Sesión iniciada como</p>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">{name}</p>
              </div>

              <div className="py-1.5">
                <Link
                  to="/profile"
                  onClick={() => close()} 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-[#2d3a4f] transition-colors duration-100"
                >
                  <FaUserCircle  className="h-4 w-4 text-slate-400" />
                  Mi Perfil
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => close()} 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-[#2d3a4f] transition-colors duration-100"
                >
                  <FaFolderOpen  className="h-4 w-4 text-slate-400" />
                  Mis Proyectos
                </Link>
              </div>

              <div className="border-t border-[#2d3348] py-1.5">
                <button
                  type="button"
                  onClick={() => { logout(); close(); }}
                  className="cursor-pointer flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-100"
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