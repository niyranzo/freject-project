"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import { getProjects } from "@/lib/api/projects";

export default function DashboardPage() {

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const data = await getProjects();

        // 👇 por si el backend devuelve { projects: [...] }
        setProjects(data.projects || data);

      } catch (error) {

        console.error(error);

        setProjects([]);

      } finally {

        setLoading(false);

      }
    };

    fetchProjects();

  }, []);

  return (
    <div className="flex h-screen bg-[#f8f9fb]">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">

            <p className="text-sm text-slate-400">
              Proyectos activos
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {projects.length}
            </h2>

          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">

            <p className="text-sm text-slate-400">
              Clientes
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-1">
              --
            </h2>

          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">

            <p className="text-sm text-slate-400">
              Tareas pendientes
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-1">
              --
            </h2>

          </div>

        </div>

        {/* Projects */}
        <div className="grid grid-cols-3 gap-4 mt-6">

          {loading ? (

            <p>Cargando proyectos...</p>

          ) : projects.length === 0 ? (

            <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center col-span-3">

              <h3 className="text-lg font-semibold text-slate-800">
                No tienes proyectos todavía
              </h3>

              <p className="text-slate-400 mt-2">
                Crea tu primer proyecto para empezar
              </p>

            </div>

          ) : (

            projects.map((project: any) => (

              <div
                key={project.id}
                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
              >

                <p className="font-semibold text-slate-800">
                  {project.name}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {project.status}
                </p>

              </div>

            ))

          )}

        </div>

      </main>
    </div>
  );
}