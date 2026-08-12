import SectionHeading from "./SectionHeading";
import Button from "./Button";
import {
  HiMiniSparkles,
  HiMiniCheck,
  HiMiniPaperAirplane,
} from "react-icons/hi2";

const suggestions = [
  "Diseñar flujo de checkout",
  "Configurar pasarela de pago",
  "Tests de integración con la API",
  "Optimizar tiempos de carga del catálogo",
  "Revisión final de accesibilidad",
];

const AISection = () => {
  return (
    <section id="ia" className="px-6 py-20 max-w-6xl mx-auto scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="IA integrada"
            align="left"
            title={
              <>
                Deja que la IA{" "}
                <span className="text-indigo-400">arranque tu sprint</span>
              </>
            }
            subtitle="Describe el objetivo y deja que Gemini genere las tareas del sprint. Tú las apruebas, asignas y ejecutas."
          />
          <ul className="mt-6 space-y-2.5">
            {[
              "Sugerencias de tareas basadas en el objetivo del proyecto",
              "Ahorra horas de planificación y empieza a ejecutar hoy",
              "Ideal para arrancar proyectos nuevos sin página en blanco",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <HiMiniCheck className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button to="/auth/register" variant="primary">
              <HiMiniSparkles className="h-4 w-4" aria-hidden="true" />
              Probar sugerencias con IA
            </Button>
          </div>
        </div>

        {/* Demo: chat / task generator */}
        <div className="bg-[#151921] border border-[#2d3348] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2d3348]">
            <HiMiniSparkles className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">
              Generador de tareas con IA
            </span>
          </div>

          <div className="p-5 space-y-3">
            <div className="flex justify-end">
              <p className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-100 text-xs rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
                Genera 5 tareas para empezar el proyecto "ecommerce"
              </p>
            </div>

            <div className="flex justify-start">
              <p className="bg-[#1e2330] border border-[#2d3348] text-slate-300 text-xs rounded-xl rounded-bl-sm px-4 py-2.5 max-w-[90%]">
                Aquí tienes una propuesta para tu sprint inicial:
              </p>
            </div>

            <ul className="space-y-2 pt-1">
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2.5 bg-[#0f1117] border border-zinc-800 rounded-lg px-3 py-2.5"
                >
                  <HiMiniCheck className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span className="text-xs text-slate-200">{s}</span>
                </li>
              ))}
            </ul>

            <div
              aria-hidden="true"
              className="flex items-center gap-2 pt-2"
            >
              <div className="flex-1 bg-[#0f1117] border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-slate-400">
                ¿Genero el plan completo del sprint?
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <HiMiniPaperAirplane className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
