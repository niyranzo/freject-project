const benefits = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    color: "text-violet-600 bg-violet-50",
    title: "Todo organizado",
    description:
      "Proyectos, clientes y tareas en un solo lugar. Dejas de perder tiempo buscando información y todo tiene sentido.",
    stat: "Menos caos en tu día a día",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: "text-indigo-600 bg-indigo-50",
    title: "Control de tu tiempo",
    description:
      "Visualiza fácilmente en qué estás trabajando y cuánto tiempo dedicas a cada proyecto sin complicaciones.",
    stat: "Más claridad en tu trabajo",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v4H3z"/><path d="M3 9h18v12H3z"/>
      </svg>
    ),
    color: "text-emerald-600 bg-emerald-50",
    title: "Visión clara",
    description:
      "Consulta el estado de tus proyectos, tareas pendientes y progreso desde un dashboard limpio y fácil de entender.",
    stat: "Todo bajo control",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
      </svg>
    ),
    color: "text-blue-600 bg-blue-50",
    title: "Trabaja mejor",
    description:
      "Con menos herramientas y más claridad, puedes enfocarte en lo importante: avanzar en tus proyectos.",
    stat: "Flujo de trabajo más simple",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Label */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            Beneficios
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Trabaja con más orden,{" "}
            <br className="hidden md:block" />
            y menos caos
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group p-7 rounded-3xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/50 transition-all hover:shadow-sm"
            >
              <div className={`w-10 h-10 rounded-2xl ${benefit.color} flex items-center justify-center mb-5`}>
                {benefit.icon}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2.5">
                {benefit.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {benefit.description}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="text-xs font-medium text-slate-600">
                  {benefit.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}