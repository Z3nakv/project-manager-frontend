import DogEar from "../DogEar";

type Task = {
  title: string;
  meta: string;
  badge?: string;
  badgeCls?: string;
  avatar?: string;
  avatarCls?: string;
};

type Column = {
  name: string;
  color: string;
  tasks: Task[];
};

const columns: Column[] = [
  {
    name: "Pendiente",
    color: "var(--status-pending)",
    tasks: [
      {
        title: "Diseño de login",
        meta: "Límite 15 jun",
        badge: "Vence pronto",
        badgeCls: "text-warning bg-warning-subtle border-warning/30",
        avatar: "AR",
        avatarCls: "bg-primary-subtle text-primary",
      },
      {
        title: "API de productos",
        meta: "Límite 20 jun",
        badge: "A tiempo",
        badgeCls: "text-success bg-success-subtle border-success/30",
        avatar: "LP",
        avatarCls: "bg-primary-subtle text-primary",
      },
    ],
  },
  {
    name: "En progreso",
    color: "var(--status-inprogress)",
    tasks: [
      {
        title: "Checkout flow",
        meta: "Asignado a: Ana",
        badge: "En progreso",
        badgeCls: "text-warning bg-warning-subtle border-warning/30",
        avatar: "AN",
        avatarCls: "bg-success-subtle text-success",
      },
    ],
  },
  {
    name: "En revisión",
    color: "var(--status-underreview)",
    tasks: [
      {
        title: "Diseño responsive",
        meta: "Esperando aprobación",
        avatar: "JM",
        avatarCls: "bg-info-subtle text-info",
      },
    ],
  },
  {
    name: "Completado",
    color: "var(--status-completed)",
    tasks: [
      {
        title: "Setup inicial",
        meta: "Hace 2 días",
        badge: "✓ Listo",
        badgeCls: "text-success bg-success-subtle border-success/30",
        avatar: "CM",
        avatarCls: "bg-error-subtle text-error",
      },
    ],
  },
];

/**
 * Mock visual del tablero Kanban del producto.
 * Renderiza columnas y tarjetas con la misma estética real
 * (bg-[#0f1117], DogEar, avatares, badges y dots de estado).
 */
const BoardPreview = () => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3" style={{ minWidth: "max-content" }}>
        {columns.map((col) => (
          <div key={col.name} className="w-48 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: col.color }}
              />
              <span className="text-xs font-semibold text-text-secondary font-mono">
                {col.name}
              </span>
              <span className="text-xs text-text-muted ml-auto">
                {col.tasks.length}
              </span>
            </div>
            <div
              className="h-0.5 rounded-full mb-3"
              style={{ background: col.color }}
            />
            {col.tasks.map((task) => (
              <div
                key={task.title}
                className="relative bg-surface-base text-text-primary border border-border-subtle rounded-lg p-3 pt-2.5 mb-2 hover:border-primary/40 transition-colors"
              >
                <DogEar />
                <p className="text-[13px] font-semibold text-text-primary mb-1 pr-2">
                  {task.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-text-secondary">{task.meta}</p>
                  {task.avatar && (
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold ${task.avatarCls}`}
                    >
                      {task.avatar}
                    </span>
                  )}
                </div>
                {task.badge && (
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 uppercase tracking-wide border ${task.badgeCls}`}
                  >
                    {task.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPreview;
