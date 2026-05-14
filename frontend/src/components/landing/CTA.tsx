import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden">
          
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700" />

          {/* Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full -translate-x-1/4 translate-y-1/4 blur-2xl" />

          <div className="relative z-10 px-10 py-16">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-7 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-white/80 tracking-wide">
                Empieza en segundos
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Deja el caos atrás.{" "}
              <br className="hidden md:block" />
              Organiza tu trabajo hoy.
            </h2>

            {/* Description */}
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Centraliza tus proyectos, clientes y tareas en un solo lugar y empieza a trabajar con claridad desde el primer día.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-indigo-700 bg-white rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Empezar gratis →
              </Link>

              <Link
                href="#preview"
                className="w-full sm:w-auto px-8 py-4 text-base font-medium text-white/90 border border-white/20 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Ver cómo funciona
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
              
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Sin configuración complicada
              </div>

              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Empieza en minutos
              </div>

              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Todo en un solo lugar
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}