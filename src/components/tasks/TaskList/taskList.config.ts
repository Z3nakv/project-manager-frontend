import type { IconType } from "react-icons";
import type { TaskStatus } from "../../../types/task";
import { LuFolderClock } from "react-icons/lu";
import { LuFolderSearch } from "react-icons/lu";
import { LuFolderPen } from "react-icons/lu";
import { FaFolderOpen } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";

type StatusGroups<T> = Record<TaskStatus, T[]>;


export const initialStatusGroups: Record<TaskStatus, unknown[]> = {
    pending: [],
    inProgress: [],
    onHold: [],
    underReview: [],
    completed: [],
}

type StatusConfig = Record<string, { label: string; color: string; icon: IconType }>

export const statusConfig: StatusConfig = {
    pending: { label: "Pendiente", color: "#6366f1", icon: FaRegFolder },
    inProgress: { label: "En progreso", color: "#f59e0b", icon: LuFolderPen },
    onHold: { label: "En pausa", color: "#ef4444", icon: LuFolderClock },
    underReview: { label: "En revisión", color: "#0ea5e9", icon: LuFolderSearch },
    completed: { label: "Completado", color: "#10b981", icon: FaFolderOpen },
}

export const taskReducer =<T extends { _id: string; status: TaskStatus }>(tasks : T[]): StatusGroups<T>  => {
  const groups = structuredClone(initialStatusGroups) as StatusGroups<T>;

  for (const task of tasks) {
    groups[task.status].push(task);
  }

  return groups;
};