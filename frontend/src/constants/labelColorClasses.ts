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
  red:     "bg-red-500/20 text-red-400 border-red-500/30",
  orange:  "bg-orange-500/20 text-orange-400 border-orange-500/30",
  amber:   "bg-amber-500/20 text-amber-400 border-amber-500/30",
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  sky:     "bg-sky-500/20 text-sky-400 border-sky-500/30",
  indigo:  "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  purple:  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  pink:    "bg-pink-500/20 text-pink-400 border-pink-500/30",
  slate:   "bg-slate-500/20 text-slate-400 border-slate-500/30",
};