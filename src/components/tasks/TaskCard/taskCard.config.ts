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
      color: "text-error",
      bg: "bg-error-subtle border-error/25",
    };
  if (diffDays <= 2)
    return {
      label: "Vence pronto",
      color: "text-warning",
      bg: "bg-warning-subtle border-warning/25",
    };
  return {
    label: "A tiempo",
    color: "text-success",
    bg: "bg-success-subtle border-success/25",
  };
};