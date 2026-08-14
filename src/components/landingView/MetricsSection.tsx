const metrics = [
  { value: "Real-time", label: "Sincronización con Socket.io" },
  { value: "IA", label: "Sugerencias con Gemini AI" },
  { value: "0", label: "Tarjetas de crédito requeridas" },
  { value: "1 min", label: "Para configurar tu primer proyecto" },
];

const MetricsSection = () => {
  return (
    <section className="border-y border-border-subtle bg-bg text-text-primary">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <p className="font-mono text-2xl font-bold text-primary">
              {m.value}
            </p>
            <p className="text-xs text-text-secondary mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
