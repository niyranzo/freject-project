"use client";
import { useEffect, useState } from "react";
import { IM_Fell_French_Canon } from "next/font/google";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import ProjectCard from "@/components/projects/ProjectCard";

import CreateProjectModal from "@/components/dashboard/modals/CreateProjectModal";
import CreateClientModal from "@/components/dashboard/modals/CreateClientModal";

import { getProjects } from "@/lib/api/projects";
import { getClients } from "@/lib/api/clients";

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

export default function ProjectsPage() {

  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  

  const [showClientModal, setShowClientModal] =
    useState(false);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const [projectsData, clientsData] =
        await Promise.all([
          getProjects(),
          getClients(),
        ]);

      setProjects(projectsData);

      setClients(clientsData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="flex h-screen bg-skin">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className={imFell.className + " text-5xl font-bold text-slate-900"}>
              Proyectos
            </h2>

            <p className="text-slate-500 mt-2">
              Gestiona todos tus proyectos  
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
          >
            + Nuevo proyecto
          </button>

        </div>

        {/* LOADING */}
        {loading && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-3
              gap-5
            "
          >

            {Array.from({ length: 6 }).map((_, index) => (

              <div
                key={index}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-100
                  p-5
                  animate-pulse
                "
              >

                <div className="h-5 bg-slate-200 rounded w-40" />

                <div className="h-4 bg-slate-100 rounded w-24 mt-4" />

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <div className="h-20 bg-slate-100 rounded-xl" />

                  <div className="h-20 bg-slate-100 rounded-xl" />

                </div>

              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {!loading && projects.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-3
              gap-5
            "
          >

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />

            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && projects.length === 0 && (

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              text-center
              mt-24
            "
          >

            <div
              className="
                w-24
                h-24
                rounded-3xl
                bg-violet-100
                flex
                items-center
                justify-center
                text-4xl
              "
            >
              🚀
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-6">
              No tienes proyectos todavía
            </h3>

            <p className="text-slate-500 mt-2 max-w-md">
              Empieza creando tu primer proyecto freelance
              y organiza mejor tu trabajo con Flowance.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="
                mt-6
                px-5
                py-3
                bg-violet-600
                hover:bg-violet-700
                text-white
                text-sm
                font-medium
                rounded-2xl
                transition
              "
            >
              Crear proyecto
            </button>

          </div>
        )}

        <CreateProjectModal
          showModal={showModal}
          setShowModal={setShowModal}
          clients={clients}
          setShowClientModal={setShowClientModal}
        />

        <CreateClientModal
          showClientModal={showClientModal}
          setShowClientModal={setShowClientModal}
          setClients={setClients}
        />

      </main>

    </div>
  );
}