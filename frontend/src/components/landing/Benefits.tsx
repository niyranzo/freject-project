const benefits = [
  {
    emoji: "🗂",
    bg: "bg-[#F5D4DC]",
    title: "Todo organizado",
    description:
      "Proyectos, clientes y tareas en un solo lugar. Dejas de perder tiempo buscando información y todo tiene sentido.",
    tag: "Menos caos en tu día",
  },
  {
    emoji: "📊",
    bg: "bg-[#D4E4D8]",
    title: "Visión clara",
    description:
      "Consulta el estado de tus proyectos, tareas pendientes y progreso desde un dashboard limpio y fácil de entender.",
    tag: "Todo bajo control",
  },
  {
    emoji: "🚀",
    bg: "bg-[#EDE4D4]",
    title: "Trabaja mejor",
    description:
      "Con menos herramientas y más claridad, puedes enfocarte en lo importante: avanzar en tus proyectos.",
    tag: "Flujo más simple",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-28 bg-[#FCF9F2] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9A9A8E]">
            Beneficios
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl font-normal text-[#1A1A18] leading-tight tracking-tight">
            Trabaja con más orden,{" "}
            <span className="text-[#9A9A8E]">y menos caos.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className={`${b.bg} rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all`}
            >
              <div className="text-3xl mb-5">{b.emoji}</div>
              <h3 className="text-base font-semibold text-[#1A1A18] mb-2">{b.title}</h3>
              <p className="text-sm text-[#5A5A52] leading-relaxed mb-6">{b.description}</p>
              <span className="inline-block bg-black/8 text-[#1A1A18] text-xs font-medium px-3 py-1.5 rounded-full">
                {b.tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}