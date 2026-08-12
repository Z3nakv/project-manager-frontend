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
    color: "#6366f1",
    tasks: [
      {
        title: "Diseño de login",
        meta: "Límite 15 jun",
        badge: "Vence pronto",
        badgeCls: "text-amber-300 bg-amber-500/10 border-amber-500/20",
        avatar: "AR",
        avatarCls: "bg-indigo-500/20 text-indigo-300",
      },
      {
        title: "API de productos",
        meta: "Límite 20 jun",
        badge: "A tiempo",
        badgeCls: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
        avatar: "LP",
        avatarCls: "bg-purple-500/20 text-purple-300",
      },
    ],
  },
  {
    name: "En progreso",
    color: "#f59e0b",
    tasks: [
      {
        title: "Checkout flow",
        meta: "Asignado a: Ana",
        badge: "En progreso",
        badgeCls: "text-amber-300 bg-amber-500/10 border-amber-500/20",
        avatar: "AN",
        avatarCls: "bg-emerald-500/20 text-emerald-300",
      },
    ],
  },
  {
    name: "En revisión",
    color: "#0ea5e9",
    tasks: [
      {
        title: "Diseño responsive",
        meta: "Esperando aprobación",
        avatar: "JM",
        avatarCls: "bg-sky-500/20 text-sky-300",
      },
    ],
  },
  {
    name: "Completado",
    color: "#10b981",
    tasks: [
      {
        title: "Setup inicial",
        meta: "Hace 2 días",
        badge: "✓ Listo",
        badgeCls: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
        avatar: "CM",
        avatarCls: "bg-red-500/20 text-red-300",
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
              <span className="text-xs font-semibold text-slate-300 font-mono">
                {col.name}
              </span>
              <span className="text-xs text-slate-600 ml-auto">
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
                className="relative bg-[#0f1117] border border-zinc-800 rounded-lg p-3 pt-2.5 mb-2 hover:border-indigo-500/40 transition-colors"
              >
                <DogEar />
                <p className="text-[13px] font-semibold text-slate-200 mb-1 pr-2">
                  {task.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">{task.meta}</p>
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
