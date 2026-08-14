import { Fragment } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router";
import {
  useClearAllMutation,
  useMarkAsReadMutation,
} from "../hooks/mutations/useNotificationMutation";
import { useGetNotificationsQuery } from "../hooks/queries/useNotificationQueries";
import type { Notification } from "../types/notification";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { getColor } from "../utils/getColor";

const NotificationCenter = () => {
  const navigate = useNavigate();

  const { data: notifications = [] } = useGetNotificationsQuery();
  const { mutate: readMutate } = useMarkAsReadMutation();
  const { mutate: clearMutate } = useClearAllMutation();

  const unread = notifications.filter((n: Notification) => !n.read).length;

  return (
    <Popover className="relative">
      
        <PopoverButton
          className="relative cursor-pointer flex gap-2 text-text-muted hover:text-primary hover:-translate-y-1 transition-transform duration-150"
          aria-label="notifications"
        >
          <div className="relative">
          <FaBell className="h-5 w-5 cursor-pointer" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-text-on-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
          </div>
          <p className="font-mono hidden lg:block">Notificaciones</p>
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
        <PopoverPanel className="overflow-hidden absolute left-15 w-80 bg-surface-elevated border border-border rounded-xl shadow-lifted z-50">
          {({ close }) => (
            <div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-border-subtle">
                <h3 className="text-text-primary font-semibold text-sm">
                  Notificaciones
                </h3>
                {notifications.length > 0 && (
                  <button
                    onClick={() => {
                      clearMutate();
                      close();
                    }}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Limpiar todo
                  </button>
                )}
              </div>

              <ul className="max-h-96 overflow-y-auto divide-y divide-border-subtle">
                {notifications.length === 0 && (
                  <li className="text-center text-text-muted text-sm py-8">
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
                    className={`px-4 py-3 cursor-pointer hover:bg-surface-hover transition-colors ${!n.read ? "border-l-2 border-primary" : ""}`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-md font-bold shrink-0 ${getColor(n._id)}`}
                      >
                        {n.triggeredBy.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary leading-snug">
                          {n.content}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
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
