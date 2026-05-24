"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "fa-bars-staggered",
    color: "#E5A5C7",
  },
  {
    href: "/projects",
    label: "Proyectos",
    icon: "fa-box-open",
    color: "#AD8EBF",
  },
  {
    href: "/clients",
    label: "Clientes",
    icon: "fa-users",
    color: "#9FB196",
  },
];

export default function Sidebar() {

  return (

    <aside className="hidden md:flex w-64 min-w-64 border border-white/5 p-5 flex-col bg-[#121212] rounded-3xl m-5">
      {/* LOGO */}

      <div className="shrink-0">

        <Image
          src="/logoblanco.png"
          alt="Freject"
          width={150}
          height={150}
          className="w-32 md:w-[150px] h-auto"
        />

      </div>

      {/* MENU */}

      <nav className="flex md:flex-col gap-2 md:w-full">

        {links.map((link) => (

          <Link
            key={link.href}
            href={link.href}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
          >

            <span
              style={{ backgroundColor: link.color }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 rounded-full transition-all duration-300 group-hover:h-6"
            />

            <i
              className={`fa-solid ${link.icon} text-lg transition-all duration-300`}
              style={{
                color: "inherit",
              }}
            />

            <span className="hidden md:block font-medium">
              {link.label}
            </span>

          </Link>

        ))}

      </nav>

    </aside>

  );

}