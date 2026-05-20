"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import CreateProjectModal from "@/components/dashboard/modals/CreateProjectModal";
import CreateClientModal from "@/components/dashboard/modals/CreateClientModal";

import { getProjects } from "@/lib/api/projects";
import { getClients } from "@/lib/api/clients";

interface Project {
  id: number;
  name: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  price: number;
  create_date: string;
  tasks?: any[];
}

export default function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([]);
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

  const getStatusStyles = (status: string) => {

    switch (status) {

      case "completed":
        return "bg-emerald-100 text-emerald-700";

      case "in_progress":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  const getStatusText = (status: string) => {

    switch (status) {

      case "completed":
        return "Completado";

      case "in_progress":
        return "En progreso";

      case "cancelled":
        return "Cancelado";

      default:
        return "Pendiente";
    }
  };

  return (

    <div className="flex h-screen bg-skin">

      <Sidebar />

      <main className="flex-1 p-6">

        <Topbar />

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Proyectos
            </h2>

            <p className="text-slate-500 mt-2">
              Gestiona todos tus proyectos freelance
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              px-5
              py-3
              bg-violet-600
              hover:bg-violet-700
              text-white
              text-sm
              font-medium
              rounded-2xl
              transition
              shadow-sm
            "
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

              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="
                  group
                  bg-white
                  rounded-2xl
                  border
                  border-slate-100
                  shadow-sm
                  p-5
                  hover:shadow-md
                  hover:border-violet-200
                  transition-all
                  duration-200
                "
              >

                {/* TOP */}
                <div className="flex items-start justify-between">

                  <div>

                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-slate-800
                        group-hover:text-violet-600
                        transition-colors
                      "
                    >
                      {project.name}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Creado el{" "}
                      {new Date(
                        project.create_date
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${getStatusStyles(project.status)}
                    `}
                  >
                    {getStatusText(project.status)}
                  </span>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 mt-6">

                  <div className="bg-slate-50 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Presupuesto
                    </p>

                    <h4 className="text-lg font-semibold text-slate-800 mt-1">
                      €{project.price}
                    </h4>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Tareas
                    </p>

                    <h4 className="text-lg font-semibold text-slate-800 mt-1">
                      {project.tasks?.length || 0}
                    </h4>

                  </div>

                </div>

              </Link>
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