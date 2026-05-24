const projects = [
  { name: "App móvil", client: "Rayo Labs", status: "En progreso", badgeClass: "bg-[#DDD4EE] text-[#4A3A8A]" },
  { name: "Web corporativa", client: "Grupo Alva", status: "Completado", badgeClass: "bg-[#D4E4D8] text-[#2A6B3C]" },
  { name: "Dashboard", client: "DataPro", status: "En revisión", badgeClass: "bg-[#EDE4D4] text-[#7A5A2A]" },
  { name: "Landing SaaS", client: "Nova Studio", status: "En progreso", badgeClass: "bg-[#DDD4EE] text-[#4A3A8A]" },
  { name: "Ecommerce", client: "Shoply", status: "Completado", badgeClass: "bg-[#D4E4D8] text-[#2A6B3C]" },
  { name: "Branding", client: "Vision Co", status: "Pendiente", badgeClass: "bg-black/6 text-[#5A5A52]" },
];

export default function Preview() {
  return (
    <section id="preview" className="py-20 sm:py-28 bg-[#FCF9F2] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9A9A8E]">
            El producto
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-6xl font-normal text-[#1A1A18] leading-tight tracking-tight">
            Todo tu trabajo,{" "}
            <span className="text-[#9A9A8E]">en un solo lugar.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A5A52] max-w-xl mx-auto font-light leading-relaxed">
            Visualiza tus proyectos, tareas y clientes en una interfaz clara,
            limpia y diseñada para que trabajes sin distracciones.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="relative">
          <div className="absolute -inset-4 sm:-inset-8 bg-[#DDD4EE]/15 rounded-3xl blur-3xl" />

          <div className="relative rounded-2xl sm:rounded-3xl border border-black/8 bg-white shadow-2xl shadow-black/8 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-black/6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#F5D4DC] flex items-center justify-center font-serif text-xs text-[#1A1A18]">
                  F
                </div>
                <span className="text-sm font-serif text-[#1A1A18]">Freject</span>
                <div className="h-4 w-px bg-black/10 mx-1 hidden sm:block" />
                <span className="text-sm text-[#9A9A8E] hidden sm:block">Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#F5D4DC] text-xs font-medium text-[#1A1A18]">Hoy</div>
                <div className="w-7 h-7 rounded-full bg-[#1A1A18] text-white text-xs flex items-center justify-center font-medium">N</div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar — hidden on mobile */}
              <div className="hidden sm:block w-44 md:w-52 bg-[#1A1A18] p-4 min-h-[500px] shrink-0">
                {["Dashboard", "Proyectos", "Clientes", "Tareas", "Configuración"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-xl text-xs font-medium mb-1 ${
                      i === 0 ? "bg-white/10 text-white" : "text-white/40"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="flex-1 p-4 sm:p-6 bg-[#FCF9F2] min-w-0">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {[
                    { label: "Proyectos activos", value: "6", bg: "bg-[#F5D4DC]" },
                    { label: "Clientes", value: "12", bg: "bg-[#DDD4EE]" },
                    { label: "Tareas pendientes", value: "18", bg: "bg-[#D4E4D8]" },
                  ].map((card) => (
                    <div key={card.label} className={`${card.bg} p-3 sm:p-5 rounded-xl sm:rounded-2xl`}>
                      <div className="text-[9px] sm:text-[11px] text-[#1A1A18]/60 font-medium mb-1 leading-tight">{card.label}</div>
                      <div className="font-serif text-2xl sm:text-4xl text-[#1A1A18] leading-none">{card.value}</div>
                    </div>
                  ))}
                </div>

                {/* Projects header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-[#1A1A18]">Proyectos recientes</span>
                  <span className="text-xs text-[#9A9A8E] hidden sm:block">Últimos modificados</span>
                </div>

                {/* Projects — list on mobile, grid on desktop */}
                <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
                  {projects.map((p) => (
                    <div key={p.name} className="bg-white border border-black/6 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-all">
                      <div className="flex sm:flex-col sm:items-start items-center justify-between sm:justify-start gap-2 sm:gap-0">
                        {/* Mobile: inline layout. Desktop: stacked */}
                        <div className="flex items-center gap-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#F5D4DC] flex items-center justify-center text-[10px] font-bold text-[#1A1A18] shrink-0">
                            {p.name[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#1A1A18] truncate">{p.name}</div>
                            <div className="text-[10px] text-[#9A9A8E] truncate">{p.client}</div>
                          </div>
                        </div>
                        <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${p.badgeClass}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insight */}
                <div className="mt-4 sm:mt-5 flex items-center gap-3 p-3 sm:p-4 bg-[#DDD4EE]/50 rounded-xl sm:rounded-2xl border border-[#DDD4EE]">
                  <div className="w-7 h-7 rounded-xl bg-[#DDD4EE] flex items-center justify-center text-sm shrink-0">💡</div>
                  <p className="text-xs text-[#4A3A8A]">
                    <span className="font-semibold">Tip:</span> Mantén todos tus proyectos actualizados para tener siempre una visión clara de tu trabajo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}