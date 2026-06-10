import type { TaskProjectType } from "../../types";

type GroupedTasks = {
  [key: string]: TaskProjectType[];
};

export const initialStatusGroups: GroupedTasks = {
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