// components/NotificationCenter.tsx
import { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/20/solid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
/* import { socket } from "../lib/socket"; */
import {
  clearAll,
  getNotifications,
  markAsRead,
} from "../services/notificationService";
import type { Notification } from "../types";

const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  
  const { mutate: readMutate } = useMutation({
    mutationFn: markAsRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const { mutate: clearMutate } = useMutation({
    mutationFn: clearAll,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  // cerrar al clickear fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unread = notifications.filter((n: Notification) => !n.read).length;
  
  const getColor = (id: string) => {
    const colors = [
        'bg-indigo-500/20 text-indigo-300',
        'bg-emerald-500/20 text-emerald-300',
        'bg-amber-500/20 text-amber-300',
        'bg-red-500/20 text-red-300',
    ]
    const index = id.charCodeAt(0) % colors.length
    return colors[index]
}
  
  return (
    <div className="absolute right-5 top-21" ref={ref}>
      {/* Icono */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-slate-400 hover:text-slate-100 transition-colors"
      >
        <BellIcon className="h-5 w-5 cursor-pointer" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="overflow-hidden absolute right-0 mt-2 w-80 bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-2xl z-50">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#2d3348]">
            <h3 className="text-slate-200 font-semibold text-sm">
              Notificaciones
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={() => clearMutate()}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Lista */}
          <ul className="max-h-96 overflow-y-auto divide-y divide-[#2d3348]">
            {notifications.length === 0 && (
              <li className="text-center text-slate-500 text-sm py-8">
                Sin notificaciones
              </li>
            )}
            {notifications.map((n: Notification) => (
              <li
                key={n._id}
                onClick={() => {
                  readMutate(n._id);
                  navigate(
                    `${n.project ? `/projects/${n.project._id}` : "/dashboard"}`,
                  );
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer hover:bg-[#252d3d] transition-colors ${!n.read ? "border-l-2 border-indigo-500" : ""}`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-md font-bold shrink-0 ${getColor(n._id)}`}
                  >
                    { n.triggeredBy.name.split(' ').map(w => w[0]).join('').toUpperCase() }
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 leading-snug">
                      {n.content}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
