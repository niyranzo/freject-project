import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/8 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-[#1A1A18] flex items-center justify-center font-serif text-sm text-white">
            F
          </div>
          <span className="font-serif text-lg text-[#1A1A18]">Freject</span>
          <span className="text-black/20 mx-1">·</span>
          <span className="text-xs text-[#9A9A8E]">Gestión freelance reinventada</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[#9A9A8E]">
          <Link href="/privacy" className="hover:text-[#1A1A18] transition-colors">Privacidad</Link>
          <Link href="/terms" className="hover:text-[#1A1A18] transition-colors">Términos</Link>
          <Link href="/blog" className="hover:text-[#1A1A18] transition-colors">Blog</Link>
          <Link href="mailto:hola@freject.io" className="hover:text-[#1A1A18] transition-colors">Contacto</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#9A9A8E]">
          © 2025 Freject. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}