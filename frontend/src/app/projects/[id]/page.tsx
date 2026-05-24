"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IM_Fell_French_Canon } from "next/font/google";

import { useParams } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Project } from "@/interfaces/project";

import TasksSection from "@/components/projects/TasksSection";
import CostsSection from "@/components/projects/CostsSection";
import RequestsSection from "@/components/projects/RequestsSection";

import { getProjectById, updateProject, deleteProject } from "@/lib/api/projects";
import Spinner from "@/components/ui/Spinner";

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
});

export default function ProjectDetailsPage() {

  const params = useParams();
  const projectId = Number(params.id);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [ editingName,setEditingName ] = useState(false);
  const  [editingPrice, setEditingPrice ] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        setName(data.name);
        setPrice(String(data.price));
        setStatus(data.status);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }

  }, [projectId]);

  const handleUpdateProject =
    async (data: any) => {
      try {
        await updateProject(projectId,data);
        setProject((prev: any) => ({
            ...prev,
            ...data,
          })
        );

      } catch (error) {
        console.error(error);
      }
  };

  const handleDeleteProject =
    async () => {
      try {
        await deleteProject(projectId);
        window.location.href ="/dashboard";

      } catch (error) {
        console.error(error);
      }
  };
  

  if (loading) {
    return (
      <main className="p-6">
        <Spinner />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="p-6">
        <div className="text-red-500">
          Project not found
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-skin min-h-screen">
      {/* BACK BUTTON */}
    <div className="flex items-center gap-3 mb-6">
      <Link href="/dashboard" className=" inline-flex items-center gap-2 px-4 py-2 bg-blackback border
       text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border-blackback transition cursor-pointer">

        <ArrowLeft size={18} />
        Volver al dashboard

      </Link>

      <button onClick={() => setShowDeleteModal(true)}
      className=" inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm
      rounded-xl hover:bg-red-600 transition cursor-pointer">

        <Trash2 size={18} />
        Borrar proyecto

      </button>
    </div>

    {/* HEADER */}

    <div className="border border-slate-200 rounded-3xl p-7 shadow-sm mb-8 text-white bg-blackback">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        {/* LEFT */}

        <div>

          {editingName ? (
            <input value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
                setEditingName(false);
                handleUpdateProject({name});
              }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditingName(false);
                handleUpdateProject({
                    name,
                  }
                );
              }
            }}
            autoFocus
            className={imFell.className + `text-4xl font-bold text-white bg-transparent border-b border-white outline-none`}
            />

          ) : (
            <h1 onDoubleClick={() => setEditingName(true)}
              className={imFell.className + "text-4xl font-bold text-white cursor-pointer"}>
              {project.name}
            </h1>

          )}
          <p className="text-slate-400 mt-2">
            Gestiona tareas, costos y peticiones del cliente.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap gap-4">

          {/* PRICE */}
          <div className="border border-dashed border-white rounded-2xl px-5 py-4">
            <p className="text-xs text-white mb-1">
              Cliente
            </p>

            <p className="text-lg font-semibold">
              {project.Client?.name || "Sin cliente"}
            </p>
          </div>

          <div className="border border-dashed border-white rounded-2xl px-5 py-4 min-w-50">
            <p className="text-xs mb-1">
              Presupuesto
            </p>

            {editingPrice ? (

              <input type="number" value={price}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => {
                  setEditingPrice(false);
                  handleUpdateProject({price:Number(price),});
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditingPrice(false);
                    handleUpdateProject({price:Number(price),});
                  }
                }}
                autoFocus
                className="text-2xl font-bold bg-transparent border-b border-whiteoutline-none"
              />

            ) : (
              <p onDoubleClick={() => setEditingPrice(true)}
              className="text-2xl font-bold cursor-pointer">
                € {project.price}
              </p>
            )}

          </div>
          
          {/* STATUS */}
          <div className="border border-dashed border-white rounded-2xl px-5 py-4 min-w-50">

            <p className="text-xs mb-1">
              Estado
            </p>

            <select value={status} 
            onChange={(e) => {
              setStatus(e.target.value);
              handleUpdateProject({status: e.target.value,});
            }}
            className="bg-transparent text-xl font-bold outline-none">

              <option value="pending" className="text-black">Pendiente</option>
              <option value="in_progress" className="text-black">En progreso</option>
              <option value="completed" className="text-black">Completado</option>
              <option value="cancelled" className="text-black">Cancelado</option>

            </select>

          </div>
        </div>
      </div>

    </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        <TasksSection projectId={projectId}/>

        <CostsSection projectId={projectId}/>

        <RequestsSection projectId={projectId}/>

      </div>

      {/* DELETE MODAL */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            
            <h2 className="text-2xl font-bold mb-3">
              ¿Seguro que quieres borrar el proyecto?
            </h2>

            <p className="text-slate-500 mb-6">
              Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="
                  px-4 py-2
                  rounded-xl
                  border border-slate-300
                "
              >
                Cancelar
              </button>

              <button onClick={handleDeleteProject} className="px-4 py-2 rounded-xl bg-red-500 text-white">
                Borrar
              </button>

            </div>
          </div>
        </div>

      )}

    </main>
  );
}