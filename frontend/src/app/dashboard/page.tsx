"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import ProjectCard from "@/components/projects/ProjectCard";
import { Client } from "@/interfaces/client";
import { Project  } from "@/interfaces/project";
import { Task  } from "@/interfaces/task";


import { getProjects } from "@/lib/api/projects";
import { getClients } from "@/lib/api/clients";
import { getTasks } from "@/lib/api/tasks";
import { IM_Fell_French_Canon } from "next/font/google";
import MobileNavbar from "@/components/dashboard/MobileNavbar";
import Spinner from "@/components/ui/Spinner";

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

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex flex-col md:flex-row min-h-screen bg-skin">

      <MobileNavbar />
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-lightpink/50 p-4 md:p-5 rounded-3xl border border-dashed border-blackback shadow-sm flex items-center justify-between md:flex-col md:items-center">

            <p className="text-base md:text-sm text-blackback border-b pb-0.5 font-bold">
              Proyectos activos
            </p>

            <h2 className={imFell.className + " text-5xl md:text-4xl leading-none text-slate-900"}>
              {projects.length}
            </h2>

          </div>

          <div className="bg-lightpurple/50 p-4 md:p-5 rounded-3xl border border-dashed border-blackback shadow-sm flex items-center justify-between md:flex-col md:items-center">

            <p className="text-base md:text-sm text-blackback border-b pb-0.5 font-bold">
              Clientes
            </p>

            <h2 className={imFell.className + " text-5xl md:text-4xl leading-none text-slate-900"}>
              {clients.length}
            </h2>

          </div>

          <div className="bg-lightgreen/50 p-4 md:p-5 rounded-3xl border border-dashed border-blackback shadow-sm flex items-center justify-between md:flex-col md:items-center">

            <p className="text-base md:text-sm text-blackback border-b pb-0.5 font-bold">
              Tareas pendientes
            </p>

            <h2 className={imFell.className + " text-5xl md:text-4xl leading-none text-slate-900"}>
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

          <div className="flex items-center justify-between mb-7">

            <h2 className={imFell.className + " text-4xl leading-none"}>
              Proyectos recientes
            </h2>

            <p className="hidden md:block text-slate-500 mt-3">
              Últimos proyectos modificados
            </p>

        </div>

            {loading ? (
            <Spinner />
            ) : recentProjects.length === 0 ? (

              <div className="flex flex-col items-center justify-center text-center mt-24">
                <h3 className="text-2xl font-semibold text-blackback mt-6 border-b border-blackback/50 rounded-xl px-3 py-1">
                  No tienes proyectos todavía
                </h3>

                <p className="text-slate-500 mt-2 max-w-md">
                  Empieza creando tu primer proyecto freelance
                  y organiza mejor tu trabajo con Freject .
                </p>
              </div>

            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
              {recentProjects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
            )}
        </div>
      </main>
    </div>
  );
}