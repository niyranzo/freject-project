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

const statusConfig = {

  pending: {
    label: "Pendiente",
    className:
      "bg-yellow-100 text-yellow-700",
  },

  in_progress: {
    label: "En progreso",
    className:
      "bg-blue-100 text-blue-700",
  },

  completed: {
    label: "Completado",
    className:
      "bg-emerald-100 text-emerald-700",
  },

  cancelled: {
    label: "Cancelado",
    className:
      "bg-red-100 text-red-700",
  },

};

export default function ProjectCard({
  project,
}: ProjectCardProps) {

  const router = useRouter();

  const currentStatus =
    statusConfig[
      project.status as keyof typeof statusConfig
    ];

  return (

    <div
      onClick={() =>
        router.push(`/projects/${project.id}`)
      }
      className="rounded-2xl border border-blackback shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
    >

      <div className="flex justify-center bg-blackback p-4 rounded-t-2xl">

        <h3
          className={
            imFell.className +
            " text-white text-xl"
          }
        >
          {project.name}
        </h3>

      </div>

      <div className="h-px bg-slate-100 my-4" />

      <div className="space-y-3 m-5">

        <div className="flex items-center justify-between text-sm">

          <span className="text-blackback">
            Estado
          </span>

          <span
            className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${currentStatus.className}`}
          >
            {currentStatus.label}
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