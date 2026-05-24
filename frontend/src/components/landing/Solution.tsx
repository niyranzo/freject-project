const solutions = [
  {
    number: "01",
    title: "Todo en un solo lugar",
    description:
      "Clientes, proyectos y tareas en una única plataforma. Sin saltar entre apps. Sin perder el control.",
    visual: (
      <div className="bg-[#FCF9F2] rounded-2xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9A9A8E] mb-3">Vista de proyecto</p>
        {[
          { task: "Diseño de wireframes", done: true },
          { task: "Desarrollo frontend", done: true },
          { task: "Revisión con cliente", done: false },
          { task: "Entrega final", done: false },
        ].map((t) => (
          <div key={t.task} className="flex items-center gap-2.5 mb-2.5">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                t.done ? "bg-[#6BC98A] border-[#6BC98A]" : "border-black/15"
              }`}
            >
              {t.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className={`text-xs ${t.done ? "line-through text-[#9A9A8E]" : "text-[#1A1A18]"}`}>
              {t.task}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    title: "Visión clara siempre",
    description:
      "Consulta el estado de tus proyectos y tareas desde un dashboard limpio y fácil de entender.",
    visual: (
      <div className="bg-[#FCF9F2] rounded-2xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9A9A8E] mb-3">Estado de proyectos</p>
        {[
          { name: "App móvil", status: "En progreso", badgeClass: "bg-[#DDD4EE] text-[#4A3A8A]" },
          { name: "Web corporativa", status: "Completado", badgeClass: "bg-[#D4E4D8] text-[#2A6B3C]" },
          { name: "Dashboard", status: "En revisión", badgeClass: "bg-[#EDE4D4] text-[#7A5A2A]" },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between mb-2.5">
            <span className="text-xs text-[#1A1A18]">{p.name}</span>
            <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${p.badgeClass}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-28 bg-[#FCF9F2] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9A9A8E]">
            La solución
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl font-normal text-[#1A1A18] leading-tight tracking-tight">
            Un solo lugar para{" "}
            <span className="text-[#9A9A8E]">organizar tu trabajo.</span>
          </h2>
          <p className="mt-5 text-lg text-[#5A5A52] max-w-xl font-light leading-relaxed">
            Freject reemplaza el caos de múltiples herramientas con una plataforma
            clara, simple y diseñada para freelancers que quieren trabajar mejor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((s) => (
            <div
              key={s.number}
              className="bg-white border border-black/8 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 hover:border-black/15 transition-all group"
            >
              <div className="font-serif text-5xl text-black/8 group-hover:text-black/15 transition-colors mb-5 leading-none">
                {s.number}
              </div>
              <h3 className="text-base font-semibold text-[#1A1A18] mb-2">{s.title}</h3>
              <p className="text-sm text-[#5A5A52] leading-relaxed mb-6">{s.description}</p>
              {s.visual}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}