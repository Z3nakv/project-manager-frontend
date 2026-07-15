export const getDeadlineStatus = (deadline?: string) => {
  if (!deadline) return null;
  const today = new Date();
  const due = new Date(deadline);
  const diffDays = Math.ceil(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0)
    return {
      label: "Vencida",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/25",
    };
  if (diffDays <= 2)
    return {
      label: "Vence pronto",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/25",
    };
  return {
    label: "A tiempo",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/25",
  };
};