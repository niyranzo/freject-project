"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "fa-bars-staggered",
  },
  {
    href: "/projects",
    label: "Proyectos",
    icon: "fa-box-open",
  },
  {
    href: "/clients",
    label: "Clientes",
    icon: "fa-users",
  },
];

export default function MobileNavbar() {

  const [open, setOpen] = useState(false);

  return (

    <div className="md:hidden m-4">

      {/* TOPBAR */}
      <div className="flex items-center justify-between bg-[#121212] rounded-2xl p-4">

        <Image
          src="/logoblanco.png"
          alt="Freject"
          width={120}
          height={120}
          className="h-auto"
        />

        <button
          onClick={() => setOpen(!open)}
          className="text-white text-2xl"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

      </div>

      {/* MENU */}

      {open && (

        <div className="mt-3 bg-[#121212] rounded-2xl p-2 flex flex-col">

          {links.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 transition"
            >

              <i className={`fa-solid ${link.icon}`}></i>

              <span>
                {link.label}
              </span>

            </Link>

          ))}

        </div>

      )}

    </div>

  );

}