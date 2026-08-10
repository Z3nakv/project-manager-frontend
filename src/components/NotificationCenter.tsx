import { Fragment } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useClearAllMutation, useMarkAsReadMutation } from "../hooks/mutations/useNotificationMutation";
import { useGetNotificationsQuery } from "../hooks/queries/useNotificationQueries";
import type { Notification } from "../types/notification";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";

const NotificationCenter = () => {
  const navigate = useNavigate();

  const { data: notifications = []} = useGetNotificationsQuery();
  const { mutate: readMutate } = useMarkAsReadMutation();
  const { mutate: clearMutate } = useClearAllMutation();

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
    <Popover className="relative">

      <PopoverButton
        className="relative p-2 text-slate-400 hover:text-slate-100 transition-colors"
        aria-label="notifications"
      >
        <FaBell className="h-5 w-5 cursor-pointer" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
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
                
        <PopoverPanel className="overflow-hidden absolute left-15 w-80 bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-2xl z-50">
          {({ close }) => ( 
          
          <div>
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#2d3348]">
            <h3 className="text-slate-200 font-semibold text-sm">
              Notificaciones
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={() => {clearMutate(); close();}}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Limpiar todo
              </button>
            )}
          </div>

          
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
                  close();
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
        </PopoverPanel>
        </Transition>
    </Popover>
  );
};

export default NotificationCenter;
