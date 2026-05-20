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
    <header className="fixed top-5 left-0 right-0 z-50 px-4">
      <div
        className={`
          max-w-6xl mx-auto
          transition-all duration-500
          rounded-2xl
          border border-white/20
          backdrop-blur-xl
          bg-blackback
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          ${
            scrolled
              ? "py-3 bg-[#212121]/80"
              : "py-4"
          }
        `}
      >
        <div className="flex items-center justify-between px-6">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Image
                src="/logoblanco.png"
                alt="Freject"
                width={90}
                height={90}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-2">
          <Link href="#problem"
            className="
              px-4 py-2
              text-sm
              font-medium
              text-white
              rounded-xl
              transition-all
              duration-300
              hover:bg-lightpink
              hover:text-slate-900
              hover:shadow-sm
            ">
            Problema
          </Link>

          <Link href="#solution"
            className="
              px-4 py-2
              text-sm
              font-medium
              text-white
              rounded-xl
              transition-all
              duration-300
              hover:bg-lightpurple
              hover:text-slate-900
              hover:shadow-sm
            "
          >Solución
          </Link>

          <Link href="#preview"
            className="
              px-4 py-2
              text-sm
              font-medium
              text-white
              rounded-xl
              transition-all
              duration-300
              hover:bg-lightgreen
              hover:text-slate-900
              hover:shadow-sm
            "
          > Producto
          </Link>
        </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="
                hidden sm:flex
                text-sm
                font-medium
                text-white
                hover:text-white/80
                transition-colors
              "
            >
              Iniciar sesión
            </Link>

            <Link
              href="/register"
              className="
                relative
                inline-flex
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                bg-linear-to-r
                from-lightpink
                to-lightpurple
                hover:scale-[1.03]
                hover:shadow-[0_8px_25px_rgba(139,92,246,0.35)]
                active:scale-[0.98]
              "
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}