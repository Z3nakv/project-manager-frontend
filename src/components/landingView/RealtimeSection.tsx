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
    color: "bg-indigo-500/20 text-indigo-300",
    text: 'Adrián movió "Checkout flow" a En revisión',
    time: "ahora",
    unread: true,
  },
  {
    initials: "JM",
    color: "bg-emerald-500/20 text-emerald-300",
    text: 'Jorge completó "Tests unitarios"',
    time: "2m",
    unread: true,
  },
  {
    initials: "LP",
    color: "bg-amber-500/20 text-amber-300",
    text: 'Laura agregó una nota en "API de productos"',
    time: "5m",
  },
  {
    initials: "CM",
    color: "bg-red-500/20 text-red-300",
    text: 'Carlos creó la tarea "Deploy a producción"',
    time: "12m",
  },
];

const RealtimeSection = () => {
  return (
    <section className="border-y border-[#1e2330] bg-[#151921] px-6 py-20">
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
              className="flex items-center gap-3 bg-[#1e2330] border border-[#2d3348] rounded-xl px-4 py-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${n.color}`}
              >
                {n.initials}
              </div>
              <p className="text-xs text-slate-400 flex-1 leading-snug">
                {n.text}
              </p>
              <span className="text-xs text-slate-400 shrink-0">
                {n.time}
              </span>
              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealtimeSection;
