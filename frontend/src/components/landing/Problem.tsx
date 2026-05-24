const tools = [
  { label: "Excel", emoji: "📊", desc: "Seguimiento manual" },
  { label: "Notas", emoji: "📝", desc: "Tareas sueltas" },
  { label: "Email", emoji: "📧", desc: "Comunicación" },
  { label: "Trello", emoji: "📋", desc: "Proyectos" },
  { label: "Timer", emoji: "⏱", desc: "Tiempo" },
  { label: "Drive", emoji: "📁", desc: "Archivos" },
];

const pains = [
  { icon: "⚡", title: "Pierdes tiempo", desc: "Saltando entre herramientas para encontrar información básica de tus proyectos." },
  { icon: "🧠", title: "Sin visión global", desc: "No tienes una vista clara de en qué estás trabajando ni qué está pendiente." },
  { icon: "🌀", title: "Desorganización", desc: "Tareas, clientes y proyectos sin un sistema que los conecte de verdad." },
];

export default function Problem() {
  return (
    <section id="problem" className="py-28 bg-[#1A1A18] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
            El problema
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl font-normal text-white leading-tight tracking-tight">
            Demasiadas herramientas,{" "}
            <span className="text-white/35">poco control.</span>
          </h2>
          <p className="mt-5 text-lg text-white/50 max-w-xl font-light leading-relaxed">
            Como freelancer acabas gestionando tu trabajo con mil apps distintas.
            Todo está separado, desordenado y es difícil ver el panorama completo.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {tools.map((tool) => (
            <div
              key={tool.label}
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/8 rounded-2xl hover:bg-white/8 hover:-translate-y-0.5 transition-all"
            >
              <div className="text-2xl">{tool.emoji}</div>
              <div>
                <div className="text-sm font-medium text-white/70">{tool.label}</div>
                <div className="text-xs text-white/30">{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pain points */}
        <div className="grid sm:grid-cols-3 gap-4">
          {pains.map((p) => (
            <div key={p.title} className="p-7 rounded-2xl bg-white/4 border border-white/7">
              <div className="text-3xl mb-4">{p.icon}</div>
              <div className="text-sm font-semibold text-white mb-2">{p.title}</div>
              <div className="text-sm text-white/40 leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}