"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import { getProjects } from "@/lib/api/projects";
import { getClients } from "@/lib/api/clients";
import { getTasks } from "@/lib/api/tasks";
import { useRouter } from "next/navigation"
import { IM_Fell_French_Canon } from "next/font/google";

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
});

const imFellItalic = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});



export default function DashboardPage() {

  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchDashboardData = async () => {

    try {

      const [projectsData, clientsData, tasksData] = await Promise.all([
        getProjects(),
        getClients(),
        getTasks(),
      ]);

      setProjects(projectsData.projects || projectsData);
      setClients(clientsData.clients || clientsData);
      setTasks(tasksData.tasks || tasksData);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchDashboardData();

    const handlePageShow = () => {
      fetchDashboardData();
    };

    window.addEventListener(
      "pageshow",
      handlePageShow
    );

    return () => {

      window.removeEventListener(
        "pageshow",
        handlePageShow
      );

    };

  }, []);

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="flex h-screen bg-skin">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        {/* METRICS */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-lightpink/50 p-5 rounded-2xl border border-dashed border-blackback shadow-sm
          flex flex-col items-center">
            <p className="text-sm text-blackback border-b pb-0.5 font-bold">
              Proyectos activos
            </p>

            <h2 className={imFell.className + " text-4xl font-bold text-slate-900 mt-1"}>
              {projects.length}
            </h2>
          </div>

          <div className="bg-lightpurple/50 p-5 rounded-2xl border border-dashed border-blackback shadow-sm
          flex flex-col items-center">
            <p className="text-sm text-blackback border-b pb-0.5 font-bold">
              Clientes
            </p>

            <h2 className={imFell.className + " text-4xl font-bold text-slate-900 mt-1"}>
              {clients.length}
            </h2>
          </div>

          <div className="bg-lightgreen/50 p-5 rounded-2xl border border-dashed border-blackback shadow-sm
          flex flex-col items-center">
            <p className="text-sm text-blackback border-b pb-0.5 font-bold">
              Tareas pendientes
            </p>

            <h2 className={imFell.className + " text-4xl font-bold text-slate-900 mt-1"}>
              {
                tasks.filter(
                  (task) =>
                    task.status !== "completed"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* RECENT PROJECTS */}
        <div className="mt-8">

          <div className="flex items-center justify-between mb-4">

            <h2 className={imFellItalic.className + " text-4xl font-semibold text-slate-900"}>
              Proyectos recientes
            </h2>

            <p className="text-sm text-blackback">
              Últimos proyectos modificados
            </p>

          </div>

          <div className="grid grid-cols-3 gap-4">

            {loading ? (

              <p>Cargando proyectos...</p>

            ) : recentProjects.length === 0 ? (

              <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center col-span-3">

                <h3 className="text-lg font-semibold text-slate-800">
                  No tienes proyectos todavía
                </h3>

                <p className="text-blackback mt-2">
                  Crea tu primer proyecto para empezar
                </p>

              </div>

            ) : (

              recentProjects.map((project: any) => (

                <div
                  key={project.id}
                  onClick={() =>
                    router.push(`/projects/${project.id}`)
                  }
                  className="rounded-2xl border border-blackback shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >

                  <div className={`flex justify-center bg-blackback p-4 rounded-t-2xl`}>
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

              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}