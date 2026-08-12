import SectionHeading from "./SectionHeading";
import {
  HiMiniSquares2X2,
  HiMiniBolt,
  HiMiniUserGroup,
  HiMiniBell,
  HiMiniCalendarDays,
  HiMiniDocumentText,
} from "react-icons/hi2";

type Feature = {
  icon: typeof HiMiniSquares2X2;
  tile: string;
  iconCls: string;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: HiMiniSquares2X2,
    tile: "bg-indigo-500/10",
    iconCls: "text-indigo-400",
    title: "Tablero Kanban",
    desc: "Arrastra y suelta tareas entre columnas. Visualiza el flujo de trabajo de un vistazo.",
  },
  {
    icon: HiMiniBolt,
    tile: "bg-amber-500/10",
    iconCls: "text-amber-400",
    title: "Tiempo real",
    desc: "Los cambios se reflejan al instante para todos los miembros vía Socket.io.",
  },
  {
    icon: HiMiniUserGroup,
    tile: "bg-emerald-500/10",
    iconCls: "text-emerald-400",
    title: "Roles de equipo",
    desc: "Managers y colaboradores con permisos diferenciados por proyecto.",
  },
  {
    icon: HiMiniBell,
    tile: "bg-sky-500/10",
    iconCls: "text-sky-400",
    title: "Notificaciones",
    desc: "Historial de actividad persistente. Entérate de cada cambio.",
  },
  {
    icon: HiMiniCalendarDays,
    tile: "bg-red-500/10",
    iconCls: "text-red-400",
    title: "Fechas límite",
    desc: "Asigna deadlines y recibe alertas visuales cuando una tarea vence.",
  },
  {
    icon: HiMiniDocumentText,
    tile: "bg-purple-500/10",
    iconCls: "text-purple-400",
    title: "Notas en tareas",
    desc: "Agrega contexto en cada tarea con historial de cambios.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="funcionalidades"
      className="px-6 py-20 max-w-6xl mx-auto scroll-mt-24"
    >
      <SectionHeading
        eyebrow="Funcionalidades"
        title="Todo lo que tu equipo necesita"
        subtitle="Construido para equipos que trabajan rápido y necesitan visibilidad total del proyecto."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {features.map(({ icon: Icon, ...f }) => (
          <div
            key={f.title}
            className="bg-[#1e2330] border border-[#2d3348] hover:border-indigo-500/40 rounded-2xl p-6 transition-colors duration-150"
          >
            <div
              className={`w-10 h-10 rounded-xl ${f.tile} ${f.iconCls} flex items-center justify-center mb-4`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-mono text-sm font-bold text-slate-100 mb-1.5">
              {f.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
