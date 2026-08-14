// constants/labels.ts
export const PREDEFINED_LABELS = [
  { text: "Bug", color: "red" },
  { text: "Feature", color: "emerald" },
  { text: "Urgent", color: "orange" },
  { text: "Frontend", color: "sky" },
  { text: "Backend", color: "indigo" },
  { text: "Documentation", color: "slate" },
] as const;

export const LABEL_COLORS = [
  "red", "orange", "amber", "emerald", 
  "sky", "indigo", "purple", "pink", "slate"
] as const;

export const labelColorClasses: Record<string, string> = {
  red:     "bg-error-subtle text-error border-error/30",
  orange:  "bg-warning-subtle text-warning border-warning/30",
  amber:   "bg-warning-subtle text-warning border-warning/30",
  emerald: "bg-success-subtle text-success border-success/30",
  sky:     "bg-info-subtle text-info border-info/30",
  indigo:  "bg-primary-subtle text-primary border-primary/30",
  purple:  "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  pink:    "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
  slate:   "bg-surface-hover text-text-secondary border-border",
};