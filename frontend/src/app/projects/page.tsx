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
import MobileNavbar from "@/components/dashboard/MobileNavbar";
import Spinner from "@/components/ui/Spinner";

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
  const [showClientModal, setShowClientModal] = useState(false);
  const [search, setSearch] = useState("");
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );
  
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

  {filteredProjects.map(project => (
    <ProjectCard key={project.id} project={project} />
  ))}

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-skin">

      <MobileNavbar />
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">

        <Topbar />

        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h2 className={imFell.className + " text-5xl font-bold text-slate-900"}>
              Proyectos
            </h2>

            <p className="text-slate-500 mt-2">
              Gestiona todos tus proyectos  
            </p>

          </div>
          <div className="flex items-center gap-3">

            <input type="text" placeholder="Buscar proyecto..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-100 px-4 py-2 border text-blackback text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
            />
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
            >
              + Nuevo proyecto
            </button>
            
          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <Spinner />
        )}

        {/* PROJECTS */}
        {!loading && filteredProjects.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredProjects.length === 0 && (

          <div className="flex flex-col items-center justify-center text-center mt-24">
            <h3 className="text-2xl font-semibold text-blackback mt-6 border-b border-blackback/50 rounded-xl px-3 py-1">
              No tienes proyectos todavía o no se encontró el que buscabas
            </h3>

            <p className="text-slate-500 mt-2 max-w-md">
              Empieza creando tu primer proyecto freelance
              y organiza mejor tu trabajo con Freject.
            </p>
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