import Button from "./Button";
import { HiMiniCheck } from "react-icons/hi2";

const perks = ["Sin tarjeta de crédito", "Sin límites de proyectos", "Configuración en 1 minuto"];

const CTASection = () => {
  return (
    <section id="cta" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-4xl mx-auto bg-linear-to-br from-primary/15 via-surface-1 to-surface-base border border-primary/25 rounded-3xl px-6 py-16 text-center shadow-lifted">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Empieza gratis
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary mb-4">
          Empieza hoy.{" "}
          <span className="text-primary">Gratis para siempre.</span>
        </h2>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
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
            <li key={p} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <HiMiniCheck className="h-4 w-4 text-success" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CTASection;