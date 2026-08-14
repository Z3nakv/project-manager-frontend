import Button from "./Button";
import BoardPreview from "./BoardPreview";
import { HiMiniSparkles } from "react-icons/hi2";
import { useDemoLoginMutation } from "../../hooks/mutations/useAuthMutation";

const HeroSection = () => {

  const { mutate: loginDemo, isPending } = useDemoLoginMutation();
  return (
    <section className="px-6 pt-16 pb-20 max-w-6xl mx-auto font-mono">
      {/* Eyebrow pill */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 bg-primary-subtle border border-primary/30 text-primary text-xs font-semibold px-3 py-1.5 rounded-full font-mono uppercase tracking-wider">
          <HiMiniSparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Gestión de proyectos en tiempo real · IA incluida
        </span>
      </div>

      {/* Headline */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-primary mb-5">
          Organiza tu equipo.
          <br />
          <span className="text-primary">Entrega a tiempo.</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Un tablero Kanban colaborativo que se sincroniza al instante: roles de
          equipo, notificaciones en vivo y sugerencias de tareas con IA — todo
          en un solo lugar.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
        <Button to="/auth/register" variant="primary">
          + Comenzar gratis
        </Button>

        <button
          onClick={() => loginDemo()}
          disabled={isPending}
          className="cursor-pointer px-5 py-2.5 text-sm font-semibold rounded-xl bg-success hover:bg-success/90 hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-150 focus:outline-none text-text-on-primary"
        >
          {isPending ? "Cargando demo..." : "Ver demo sin registrarte"}
        </button>
      </div>

      <p className="text-center text-xs text-text-muted font-mono mb-14">
        Gratis para siempre · Sin tarjeta de crédito · Configuración en 1 minuto
      </p>

      {/* Product mock */}
      <div
        aria-hidden="true"
        className="bg-surface-base text-text-primary border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted p-5"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="ml-2 text-xs text-text-muted font-semibold uppercase tracking-wider font-mono">
            ecommerce ADIDAS — Sprint actual
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-success font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            En vivo
          </span>
        </div>
        <BoardPreview />
      </div>
    </section>
  );
};

export default HeroSection;
