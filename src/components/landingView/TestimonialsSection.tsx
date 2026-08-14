import SectionHeading from "./SectionHeading";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Pasamos de planificar en hojas de cálculo a tener todo el proyecto visible en tiempo real. El tablero Kanban nos ahorra horas cada semana.",
    name: "Adrián R.",
    role: "Project Manager",
    initials: "AR",
    color: "bg-primary-subtle text-primary",
  },
  {
    quote:
      "Las notificaciones en vivo se acabaron los 'no sabía que eso había cambiado'. Todo el equipo está siempre alineado.",
    name: "Jorge M.",
    role: "Colaborador",
    initials: "JM",
    color: "bg-success-subtle text-success",
  },
  {
    quote:
      "Las sugerencias de tareas con IA me ahorran la página en blanco a la hora de arrancar un sprint nuevo.",
    name: "Laura P.",
    role: "Manager de producto",
    initials: "LP",
    color: "bg-warning-subtle text-warning",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonios"
      className="px-6 py-20 max-w-6xl mx-auto scroll-mt-24"
    >
      <SectionHeading
        eyebrow="Testimonios"
        title="Equipos que ya trabajan mejor"
        subtitle="Managers y colaboradores usando Project Manager a diario."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="bg-surface-base text-text-primary border border-border hover:border-primary/40 rounded-2xl p-6 transition-colors duration-150 flex flex-col"
          >
            <blockquote className="text-sm text-text-secondary leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle">
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${t.color}`}
              >
                {t.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-muted font-mono">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
