export default function Solution() {
  const solutions = [
    {
      number: "01",
      title: "Todo en un solo lugar",
      description:
        "Clientes, proyectos y tareas organizados en una única plataforma. Sin saltar entre herramientas. Sin perder el control.",
      visual: (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-400 mb-3">
            Vista de proyecto
          </div>
          <div className="space-y-2">
            {[
              { task: "Diseño de wireframes", done: true },
              { task: "Desarrollo frontend", done: true },
              { task: "Revisión con cliente", done: false },
              { task: "Entrega final", done: false },
            ].map((t) => (
              <div key={t.task} className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    t.done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-200"
                  }`}
                >
                  {t.done && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-xs ${
                    t.done
                      ? "line-through text-slate-300"
                      : "text-slate-600"
                  }`}
                >
                  {t.task}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Controla tu tiempo",
      description:
        "Registra fácilmente el tiempo que dedicas a cada proyecto y entiende mejor cómo trabajas cada día.",
      visual: (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-400 mb-3">
            Tiempo por proyecto
          </div>
          <div className="space-y-2">
            {[
              { project: "App Fintech", hours: 14, pct: 45, color: "bg-violet-500" },
              { project: "Web Corporativa", hours: 8, pct: 26, color: "bg-indigo-500" },
              { project: "Dashboard", hours: 9, pct: 29, color: "bg-blue-500" },
            ].map((p) => (
              <div key={p.project}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-500">{p.project}</span>
                  <span className="text-slate-700 font-medium">{p.hours}h</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${p.color} rounded-full`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Ten una visión clara",
      description:
        "Consulta el estado de tus proyectos, tareas pendientes y progreso en tiempo real desde un dashboard limpio y sencillo.",
      visual: (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-400 mb-3">
            Estado de proyectos
          </div>
          <div className="space-y-2">
            {[
              { name: "App móvil", status: "En progreso", color: "bg-indigo-100 text-indigo-700" },
              { name: "Web corporativa", status: "Completado", color: "bg-emerald-100 text-emerald-700" },
              { name: "Dashboard", status: "En revisión", color: "bg-amber-100 text-amber-700" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{p.name}</span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.color}`}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="solution" className="py-28 bg-white   scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            La solución
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Un solo lugar para{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              organizar tu trabajo.
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Freject reemplaza el caos de múltiples herramientas con una plataforma
            clara, simple y diseñada para freelancers que quieren trabajar mejor.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div
              key={s.number}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-violet-100 transition-all group"
            >
              <div className="text-4xl font-bold text-slate-100 group-hover:text-violet-100 transition-colors mb-4 font-mono">
                {s.number}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {s.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {s.description}
              </p>

              {s.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}