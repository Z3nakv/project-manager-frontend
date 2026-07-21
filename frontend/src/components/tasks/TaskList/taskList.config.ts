import type { TaskStatus } from "../../../types/task";

type StatusGroups<T> = Record<TaskStatus, T[]>;


export const initialStatusGroups: Record<TaskStatus, unknown[]> = {
    pending: [],
    inProgress: [],
    onHold: [],
    underReview: [],
    completed: [],
}

type StatusConfig = Record<string, { label: string; color: string; icon: string }>

export const statusConfig: StatusConfig = {
    pending: { label: "Pendiente", color: "#6366f1", icon: "◎" },
    inProgress: { label: "En progreso", color: "#f59e0b", icon: "⟳" },
    onHold: { label: "En pausa", color: "#ef4444", icon: "⚠" },
    underReview: { label: "En revisión", color: "#0ea5e9", icon: "⊙" },
    completed: { label: "Completado", color: "#10b981", icon: "✓" },
}

/* export const taskReducer = (filteredItems) => {
    const response = filteredItems.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
    return response;
} */

export const taskReducer =<T extends { _id: string; status: TaskStatus }>(tasks : T[]): StatusGroups<T>  => {
  const groups = structuredClone(initialStatusGroups) as StatusGroups<T>;

  for (const task of tasks) {
    groups[task.status].push(task);
  }

  return groups;
};