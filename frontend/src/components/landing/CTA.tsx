import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#1A1A18] rounded-3xl px-10 py-20 text-center overflow-hidden">

          {/* Subtle background blobs */}
          <div className="absolute top-[-80px] right-[-80px] w-80 h-80 bg-[#DDD4EE] rounded-full opacity-8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[-60px] w-60 h-60 bg-[#F5D4DC] rounded-full opacity-8 blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-sm text-white/60 relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#6BC98A] animate-pulse" />
            Empieza en segundos
          </div>

          {/* Title */}
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-white leading-tight tracking-tight mb-5 relative z-10">
            Deja el caos atrás.{" "}
            <br className="hidden md:block" />
            <span className="text-white/35">Organiza tu trabajo hoy.</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-white/50 max-w-md mx-auto mb-10 font-light leading-relaxed relative z-10">
            Centraliza tus proyectos, clientes y tareas en un solo lugar y empieza a trabajar con claridad desde el primer día.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-[#1A1A18] bg-white rounded-xl hover:bg-[#FCF9F2] hover:-translate-y-0.5 hover:shadow-2xl transition-all"
            >
              Empezar gratis →
            </Link>
            <Link
              href="#preview"
              className="w-full sm:w-auto px-8 py-4 text-sm font-medium text-white/70 border border-white/15 rounded-xl hover:bg-white/7 hover:text-white transition-all"
            >
              Ver cómo funciona
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            {[
              "Sin configuración complicada",
              "Empieza en minutos",
              "Todo en un solo lugar",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/30">
                <span className="text-[#6BC98A]">✓</span>
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}