export default function Problem() {
  const tools = [
    { label: "Excel", emoji: "📊", desc: "Seguimiento manual" },
    { label: "Notas", emoji: "📝", desc: "Tareas sueltas" },
    { label: "Email", emoji: "📧", desc: "Comunicación" },
    { label: "Trello", emoji: "📋", desc: "Proyectos" },
    { label: "Timer", emoji: "⏱", desc: "Tiempo" },
    { label: "Drive", emoji: "📁", desc: "Archivos" },
  ];

  return (
    <section id="problem" className="py-28 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            El problema
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Demasiadas herramientas,{" "}
            <span className="text-slate-400">poco control.</span>
          </h2>

          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Como freelancer, acabas gestionando tu trabajo con mil herramientas distintas. 
            Todo está separado, desordenado y es difícil tener una visión clara de lo que estás haciendo.
          </p>
        </div>

        {/* Tools chaos */}
        <div className="relative max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl shrink-0 shadow-sm">
                  {tool.emoji}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    {tool.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {tool.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pain points */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "⚡",
                title: "Pierdes tiempo",
                desc: "Saltando entre herramientas para encontrar información básica de tus proyectos.",
              },
              {
                icon: "🧠",
                title: "Falta de visión",
                desc: "No tienes una vista clara de en qué estás trabajando ni qué está pendiente.",
              },
              {
                icon: "🌀",
                title: "Desorganización",
                desc: "Tareas, clientes y proyectos sin un sistema que realmente los conecte.",
              },
            ].map((point) => (
              <div
                key={point.title}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="text-2xl mb-3">{point.icon}</div>
                <div className="text-sm font-semibold text-slate-800 mb-1.5">
                  {point.title}
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  {point.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}