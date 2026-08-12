import Button from "./Button";
import { HiMiniCheck } from "react-icons/hi2";

const perks = ["Sin tarjeta de crédito", "Sin límites de proyectos", "Configuración en 1 minuto"];

const CTASection = () => {
  return (
    <section id="cta" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-4xl mx-auto bg-linear-to-br from-indigo-600/20 via-[#151921] to-[#0f1117] border border-indigo-500/25 rounded-3xl px-6 py-16 text-center shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3">
          Empieza gratis
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50 mb-4">
          Empieza hoy.{" "}
          <span className="text-indigo-400">Gratis para siempre.</span>
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Sin tarjeta de crédito y sin límites en proyectos. Solo tú y tu equipo
          trabajando mejor.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Button to="/auth/register" variant="primary" size="lg">
            Crear cuenta gratis →
          </Button>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-1.5 text-xs text-slate-400">
              <HiMiniCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CTASection;
