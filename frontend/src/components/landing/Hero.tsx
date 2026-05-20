"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-violet-100 shadow-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-500 tracking-wide">
            Organización real para freelancers
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-slate-900 leading-[1.05] mb-6 max-w-4xl mx-auto">
          Todos tus proyectos.{" "}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 bg-clip-text text-transparent">
            Todo bajo control.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Freject centraliza clientes, proyectos y tu flujo de trabajo en un solo lugar.
          Deja el caos atrás y trabaja con claridad.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Link
            href="/register"
            className="w-full sm:w-auto px-7 py-3.5 text-[15px] font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:opacity-90 transition-all shadow-xl shadow-violet-300/40 hover:shadow-violet-300/60 hover:-translate-y-0.5"
          >
            Empezar gratis
          </Link>
          <Link
            href="#preview"
            className="w-full sm:w-auto px-7 py-3.5 text-[15px] font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-0.5 shadow-sm"
          >
            Ver cómo funciona →
          </Link>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-4 bg-gradient-to-b from-violet-200/30 to-indigo-200/20 rounded-3xl blur-2xl" />

          <div className="relative rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/60 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 border-b border-slate-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="mx-auto flex items-center gap-2 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
                app.freject.io/dashboard
              </div>
              <div className="w-16" />
            </div>

            {/* Content */}
            <div className="flex h-[420px] bg-[#f8f9fb]">
              {/* Sidebar */}
              <div className="w-52 bg-white border-r border-slate-100 p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-600 to-indigo-600" />
                  <span className="text-sm font-semibold text-slate-800">Freject</span>
                </div>

                {["Dashboard", "Proyectos", "Clientes", "Tareas", "Configuración"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-2.5 py-2 rounded-lg text-xs font-medium ${
                      i === 0
                        ? "bg-violet-50 text-violet-700"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="flex-1 p-6">
                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Proyectos activos", value: "6" },
                    { label: "Clientes", value: "12" },
                    { label: "Tareas", value: "28" },
                    { label: "Completado", value: "74%" },
                  ].map((card) => (
                    <div key={card.label} className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm">
                      <div className="text-[10px] text-slate-400 mb-1">{card.label}</div>
                      <div className="text-base font-bold text-slate-800">{card.value}</div>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      name: "App móvil",
                      client: "Rayo Labs",
                      status: "En progreso",
                    },
                    {
                      name: "Web corporativa",
                      client: "Grupo Alva",
                      status: "Completado",
                    },
                    {
                      name: "Dashboard",
                      client: "DataPro",
                      status: "En revisión",
                    },
                    {
                      name: "Landing SaaS",
                      client: "Nova Studio",
                      status: "En progreso",
                    },
                    {
                      name: "Ecommerce",
                      client: "Shoply",
                      status: "Completado",
                    },
                    {
                      name: "Branding",
                      client: "Vision Co",
                      status: "Pendiente",
                    },
                  ].map((project) => (
                    <div
                      key={project.name}
                      className="bg-white rounded-xl border border-slate-100 p-3.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-[10px] font-bold text-violet-600">
                          {project.name[0]}
                        </div>

                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                            project.status === "Completado"
                              ? "bg-emerald-100 text-emerald-700"
                              : project.status === "En progreso"
                              ? "bg-indigo-100 text-indigo-700"
                              : project.status === "En revisión"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="text-[11px] font-semibold text-slate-700 truncate">
                          {project.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {project.client}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}