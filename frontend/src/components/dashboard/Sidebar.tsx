"use client";

import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border border-white/5 p-5 flex flex-col bg-[#121212] rounded-3xl m-5">

      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/logoblanco.png"
          alt="Freject"
          width={180}
          height={180}
        />
      </div>

      {/* Menu */}
      <nav className="space-y-2">

        <Link
          href="/dashboard"
          className="
            group
            relative
            flex
            items-center
            gap-4
            px-4
            py-3
            rounded-2xl
            text-slate-400
            hover:text-white
            hover:bg-white/5
            transition-all
            duration-300
          "
        >
          {/* Left line */}
          <span
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              h-0
              w-1
              rounded-full
              bg-[#E5A5C7]
              transition-all
              duration-300
              group-hover:h-6
            "
          />

          <i className="fa-solid fa-bars-staggered text-lg transition-all duration-300 group-hover:text-[#E5A5C7]"></i>

          <span className="font-medium">
            Dashboard
          </span>
        </Link>

        <Link
          href="/projects"
          className="
            group
            relative
            flex
            items-center
            gap-4
            px-4
            py-3
            rounded-2xl
            text-slate-400
            hover:text-white
            hover:bg-white/5
            transition-all
            duration-300
          "
        >
          <span
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              h-0
              w-1
              rounded-full
              bg-[#AD8EBF]
              transition-all
              duration-300
              group-hover:h-6
            "
          />

          <i className="fa-solid fa-box-open text-lg transition-all duration-300 group-hover:text-[#AD8EBF]"></i>

          <span className="font-medium">
            Proyectos
          </span>
        </Link>

        <Link
          href="/clients"
          className="
            group
            relative
            flex
            items-center
            gap-4
            px-4
            py-3
            rounded-2xl
            text-slate-400
            hover:text-white
            hover:bg-white/5
            transition-all
            duration-300
          "
        >
          <span
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              h-0
              w-1
              rounded-full
              bg-[#9FB196]
              transition-all
              duration-300
              group-hover:h-6
            "
          />

          <i className="fa-solid fa-users text-lg transition-all duration-300 group-hover:text-[#9FB196]"></i>

          <span className="font-medium">
            Clientes
          </span>
        </Link>

      </nav>
    </aside>
  );
}