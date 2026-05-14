"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white-50/80 backdrop-blur-sm `}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT - Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Freject logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Link>

          {/* CENTER - Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-500 font-medium">
            <Link href="#problem" className="hover:text-slate-900 transition-colors">
              Problema
            </Link>
            <Link href="#solution" className="hover:text-slate-900 transition-colors">
              Solución
            </Link>
            <Link href="#preview" className="hover:text-slate-900 transition-colors">
              Producto
            </Link>
          </div>

          {/* RIGHT - CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition-all shadow-md"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}