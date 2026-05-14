"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const items = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Proyectos", href: "/projects" },
    { name: "Clientes", href: "/clients" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 p-5 flex flex-col">
      
      {/* Logo */}
      <div className="mb-10 text-lg font-semibold text-slate-900">
        Freject
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}