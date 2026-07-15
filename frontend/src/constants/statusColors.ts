export const statusTranslations: { [key: string]: string } = {
  pending:     "Pendiente",
  inProgress:  "En Progreso",
  onHold:      "En Espera",
  underReview: "Bajo Revisión",
  completed:   "Completado",
};

export const statusColors: { [key: string]: string } = {
  pending:     "bg-slate-500/20 text-slate-400 border-slate-500/30",
  inProgress:  "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  onHold:      "bg-amber-500/20  text-amber-400  border-amber-500/30",
  underReview: "bg-sky-500/20    text-sky-400    border-sky-500/30",
  completed:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};