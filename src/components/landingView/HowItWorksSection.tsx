import SectionHeading from "./SectionHeading";
import {
  HiMiniPlus,
  HiMiniArrowPath,
  HiMiniUserGroup,
} from "react-icons/hi2";

const steps = [
  {
    icon: HiMiniPlus,
    step: "01",
    title: "Crea tu proyecto",
    desc: "Define el tablero, asigna roles y agrega a tu equipo en segundos.",
  },
  {
    icon: HiMiniArrowPath,
    step: "02",
    title: "Arrastra tus tareas",
    desc: "Mueve el flujo con drag & drop entre columnas de un Kanban sencillo.",
  },
  {
    icon: HiMiniUserGroup,
    step: "03",
    title: "Equipo sincronizado",
    desc: "Todos ven los cambios al instante con notificaciones en tiempo real.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="beneficios"
      className="border-y border-[#1e2330] bg-[#151921] px-6 py-20 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Beneficios"
          title="Del caos al flujo en tres pasos"
          subtitle="Una curva de aprendizaje mínima para que tu equipo arranque a trabajar de inmediato."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {steps.map(({ icon: Icon, ...s }) => (
            <div
              key={s.step}
              className="bg-[#0f1117] border border-[#2d3348] rounded-2xl p-6 transition-colors duration-150 hover:border-indigo-500/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs text-slate-600 font-bold">
                  {s.step}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-100 mb-1.5">
                {s.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
