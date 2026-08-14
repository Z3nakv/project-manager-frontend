export const statusTranslations: { [key: string]: string } = {
  pending:     "Pendiente",
  inProgress:  "En Progreso",
  onHold:      "En Espera",
  underReview: "Bajo Revisión",
  completed:   "Completado",
};

export const statusColors: { [key: string]: string } = {
  pending:     "bg-surface-hover text-text-secondary border-border",
  inProgress:  "bg-primary-subtle text-accent border-primary/30",
  onHold:      "bg-warning-subtle text-warning border-warning/30",
  underReview: "bg-info-subtle text-info border-info/30",
  completed:   "bg-success-subtle text-success border-success/30",
};