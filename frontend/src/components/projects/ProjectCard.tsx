"use client";

import { useRouter } from "next/navigation";
import { IM_Fell_French_Canon } from "next/font/google";

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
});

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    status: string;
    price: number;
  };
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {

  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/projects/${project.id}`)
      }
      className="rounded-2xl border border-blackback shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
    >

      <div className="flex justify-center bg-blackback p-4 rounded-t-2xl">

        <h3 className={imFell.className + " text-white text-xl"}>
          {project.name}
        </h3>

      </div>

      <div className="h-px bg-slate-100 my-4" />

      <div className="space-y-3 m-5">

        <div className="flex items-center justify-between text-sm">

          <span className="text-blackback">
            Estado
          </span>

          <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-600 text-xs font-medium capitalize">
            {project.status}
          </span>

        </div>

        <div className="h-px w-mg bg-gray-300"></div>

        <div className="flex items-center justify-between text-sm">

          <span className="text-blackback">
            Precio
          </span>

          <span className="font-semibold text-slate-800">
            ${project.price}
          </span>

        </div>

        <div className="h-px w-mg bg-gray-300"></div>

      </div>

      <div className="mt-5 flex items-center justify-between m-5">

        <span className="text-xs text-blackback">
          Ver detalles
        </span>

        <div className="text-blackback group-hover:translate-x-1 transition">
          →
        </div>

      </div>
    </div>
  );
}