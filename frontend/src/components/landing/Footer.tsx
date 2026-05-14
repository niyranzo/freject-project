import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h4M8 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">Freject</span>
            <span className="text-slate-300 mx-2">·</span>
            <span className="text-xs text-slate-400">Gestión freelance reinventada</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Términos</Link>
            <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="mailto:hola@freject.io" className="hover:text-slate-600 transition-colors">Contacto</Link>
          </div>

          <div className="text-xs text-slate-300">
            © 2025 Freject. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
