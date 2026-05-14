export default function Preview() {
  return (
    <section
      id="preview"
      className="py-28 bg-gradient-to-b from-[#f8f9fb] to-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Label */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            El producto
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Todo tu trabajo,{" "}
            <span className="text-slate-400">en un solo lugar.</span>
          </h2>

          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto">
            Visualiza tus proyectos, tareas y clientes en una interfaz clara,
            limpia y diseñada para que trabajes sin distracciones.
          </p>
        </div>

        {/* Dashboard */}
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-b from-violet-100/20 to-indigo-100/10 rounded-3xl blur-3xl" />

          <div className="relative rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/40 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600" />
                <span className="text-sm font-semibold text-slate-800">Freject</span>
                <div className="h-4 w-px bg-slate-200 mx-1" />
                <span className="text-sm text-slate-400">Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-violet-50 text-xs font-medium text-violet-700">
                  Hoy
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white text-xs flex items-center justify-center font-medium">
                  N
                </div>
              </div>
            </div>

            <div className="flex">
              
              {/* Sidebar */}
              <div className="w-52 bg-white border-r border-slate-100 p-4 min-h-[500px]">
                {["Dashboard", "Proyectos", "Clientes", "Tareas", "Configuración"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-xl text-xs font-medium mb-1 ${
                        i === 0
                          ? "bg-violet-600 text-white"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* Main */}
              <div className="flex-1 p-6 bg-[#fafbfc]">
                
                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Proyectos activos", value: "6" },
                    { label: "Clientes", value: "12" },
                    { label: "Tareas pendientes", value: "18" },
                    { label: "Completado", value: "74%" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <div className="text-[10px] text-slate-400 mb-1">
                        {card.label}
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        {card.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "App móvil", client: "Rayo Labs", status: "En progreso" },
                    { name: "Web corporativa", client: "Grupo Alva", status: "Completado" },
                    { name: "Dashboard", client: "DataPro", status: "En revisión" },
                    { name: "Landing SaaS", client: "Nova Studio", status: "En progreso" },
                    { name: "Ecommerce", client: "Shoply", status: "Completado" },
                    { name: "Branding", client: "Vision Co", status: "Pendiente" },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className="bg-white rounded-xl border border-slate-100 p-3.5 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-[10px] font-bold text-violet-600">
                          {p.name[0]}
                        </div>

                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {p.status}
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-700">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {p.client}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insight */}
                <div className="mt-5 flex items-center gap-3 p-3.5 bg-violet-50 rounded-2xl border border-violet-100">
                  <div className="w-7 h-7 rounded-xl bg-violet-100 flex items-center justify-center text-sm">
                    💡
                  </div>
                  <p className="text-xs text-violet-800">
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