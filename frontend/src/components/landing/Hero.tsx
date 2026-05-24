"use client";

import Link from "next/link";

const projects = [
  { name: "Web Nucleoo", client: "Nucleoo Studio", status: "Completado", statusClass: "bg-[#D4E4D8] text-[#2A6B3C]" },
  { name: "App móvil", client: "Rayo Labs", status: "En progreso", statusClass: "bg-[#DDD4EE] text-[#4A3A8A]" },
  { name: "Dashboard SaaS", client: "DataPro", status: "En revisión", statusClass: "bg-[#EDE4D4] text-[#7A5A2A]" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#DDD4EE] rounded-full opacity-35 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-[#F5D4DC] rounded-full opacity-30 blur-[60px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-1.5 mb-8 text-sm text-[#5A5A52]">
          <span className="w-2 h-2 rounded-full bg-[#6BC98A] animate-pulse" />
          Organización real para freelancers
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal text-[#1A1A18] leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto">
          Tu trabajo,{" "}
          <em className="not-italic text-[#9A9A8E]">finalmente</em>
          <br />
          bajo control.
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-[#5A5A52] max-w-xl mx-auto font-light leading-relaxed mb-10">
          Freject centraliza clientes, proyectos y tareas en un solo lugar.
          Sin saltar entre apps. Sin perder el hilo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-16">
          <Link
            href="/register"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#1A1A18] rounded-xl hover:bg-[#2A2A26] hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            Empezar gratis →
          </Link>
          <Link
            href="#preview"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium text-[#1A1A18] bg-white border border-black/10 rounded-xl hover:bg-[#EDE4D4] hover:-translate-y-0.5 transition-all"
          >
            Ver cómo funciona
          </Link>
        </div>

        {/* Dashboard mockup */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="absolute -inset-4 sm:-inset-8 bg-[#DDD4EE]/20 rounded-3xl blur-3xl" />

          <div className="relative rounded-2xl border border-black/8 bg-white shadow-2xl shadow-black/10 overflow-hidden">

            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-[#F4F1EA] border-b border-black/6">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF6058]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD30]" />
                <div className="w-3 h-3 rounded-full bg-[#29CA42]" />
              </div>
              <div className="mx-auto bg-white border border-black/8 rounded-md px-3 py-1 text-[10px] sm:text-xs text-[#9A9A8E] font-mono truncate max-w-[160px] sm:max-w-none">
                app.freject.io/dashboard
              </div>
              <div className="w-12 sm:w-16 shrink-0" />
            </div>

            {/* Body */}
            <div className="flex bg-[#FCF9F2]">

              {/* Sidebar — hidden on mobile */}
              <div className="hidden sm:flex w-44 md:w-52 bg-[#1A1A18] p-4 flex-col gap-1 flex-shrink-0">
                <div className="flex items-center gap-2 px-2 py-1 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#F5D4DC] flex items-center justify-center font-serif text-xs text-[#1A1A18]">F</div>
                  <span className="font-serif text-base text-white">Freject</span>
                </div>
                {["Dashboard", "Proyectos", "Clientes", "Tareas", "Configuración"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg text-xs font-medium ${
                      i === 0 ? "bg-white/10 text-white" : "text-white/40"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="flex-1 p-4 sm:p-6 overflow-hidden min-w-0">

                {/* Mobile top bar replacing sidebar */}
                <div className="flex sm:hidden items-center gap-2 mb-4 pb-3 border-b border-black/6">
                  <div className="w-5 h-5 rounded-md bg-[#F5D4DC] flex items-center justify-center font-serif text-[10px] text-[#1A1A18]">F</div>
                  <span className="font-serif text-sm text-[#1A1A18]">Freject</span>
                  <span className="ml-auto text-xs text-[#9A9A8E]">Dashboard</span>
                </div>

                <p className="text-xs text-[#5A5A52] mb-4 font-light">
                  Bienvenida, <strong className="font-semibold text-[#1A1A18]">Nicole ☕</strong>
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                  {[
                    { label: "Proyectos activos", value: "6", bg: "bg-[#F5D4DC]" },
                    { label: "Clientes", value: "12", bg: "bg-[#DDD4EE]" },
                    { label: "Tareas pendientes", value: "18", bg: "bg-[#D4E4D8]" },
                  ].map((card) => (
                    <div key={card.label} className={`${card.bg} rounded-xl sm:rounded-2xl p-2.5 sm:p-4`}>
                      <div className="text-[9px] sm:text-[10px] text-[#1A1A18]/60 font-medium mb-1 leading-tight">{card.label}</div>
                      <div className="font-serif text-2xl sm:text-3xl text-[#1A1A18] leading-none">{card.value}</div>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-xs font-semibold text-[#1A1A18]">Proyectos recientes</span>
                  <span className="text-[10px] text-[#9A9A8E] hidden sm:block">Últimos modificados</span>
                </div>

                <div className="flex flex-col gap-2">
                  {projects.map((p) => (
                    <div key={p.name} className="flex items-center justify-between bg-white border border-black/6 rounded-xl px-3 sm:px-4 py-2.5">
                      <div className="min-w-0 mr-2">
                        <div className="text-xs font-semibold text-[#1A1A18] truncate">{p.name}</div>
                        <div className="text-[10px] text-[#9A9A8E] truncate">{p.client}</div>
                      </div>
                      <span className={`text-[10px] font-medium px-2 sm:px-2.5 py-1 rounded-full shrink-0 ${p.statusClass}`}>
                        {p.status}
                      </span>
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