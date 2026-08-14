import SectionHeading from "./SectionHeading";

type Activity = {
  initials: string;
  color: string;
  text: string;
  time: string;
  unread?: boolean;
};

const activities: Activity[] = [
  {
    initials: "AR",
    color: "bg-primary-subtle text-primary",
    text: 'Adrián movió "Checkout flow" a En revisión',
    time: "ahora",
    unread: true,
  },
  {
    initials: "JM",
    color: "bg-success-subtle text-success",
    text: 'Jorge completó "Tests unitarios"',
    time: "2m",
    unread: true,
  },
  {
    initials: "LP",
    color: "bg-warning-subtle text-warning",
    text: 'Laura agregó una nota en "API de productos"',
    time: "5m",
  },
  {
    initials: "CM",
    color: "bg-error-subtle text-error",
    text: 'Carlos creó la tarea "Deploy a producción"',
    time: "12m",
  },
];

const RealtimeSection = () => {
  return (
    <section className="border-y border-border-subtle bg-bg text-text-primary px-6 py-20">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1 w-full">
          <SectionHeading
            eyebrow="En tiempo real"
            align="left"
            title="Tu equipo siempre sincronizado"
            subtitle="Cuando alguien mueve una tarea, todos lo ven al instante. Sin recargar, sin perder contexto."
          />
        </div>

        <div className="flex-1 w-full space-y-3">
          {activities.map((n, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-surface-base text-text-primary border border-border rounded-xl px-4 py-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${n.color}`}
              >
                {n.initials}
              </div>
              <p className="text-xs text-text-secondary flex-1 leading-snug">
                {n.text}
              </p>
              <span className="text-xs text-text-muted shrink-0">
                {n.time}
              </span>
              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealtimeSection;
