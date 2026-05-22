"use client";

import { useState } from "react";

import { createProject } from "@/lib/api/projects";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  clients: any[];
  setShowClientModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateProjectModal({
  showModal,
  setShowModal,
  clients,
  setShowClientModal,
}: Props) {

  const [projectName, setProjectName] = useState("");
  const [projectPrice, setProjectPrice] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const [loading, setLoading] = useState(false);
  const [projectError, setProjectError] = useState("");

  if (!showModal) return null;

  const handleCreateProject = async () => {

    try {

      setLoading(true);
      setProjectError("");

      const response = await createProject({
        name: projectName,
        price: Number(projectPrice),
        id_client: Number(selectedClient),
      });

      if (response.message) {
        setProjectError(response.message);
        return;
      }

      setShowModal(false);

      window.location.reload();

    } catch (error: any) {

      setProjectError(error.message );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-skin w-full max-w-md rounded-2xl p-6 shadow-xl border border-blackback">

        <h2 className="text-xl font-semibold text-slate-900">
          Nuevo proyecto
        </h2>

        <div className="space-y-4 mt-5">

          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:blackback/50"
          />

          <input
            type="number"
            placeholder="Precio"
            value={projectPrice}
            onChange={(e) =>
              setProjectPrice(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:blackback/50"
          />

          <select
            value={selectedClient}
            onChange={(e) =>
              setSelectedClient(
                e.target.value
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:blackback/50 cursor-pointer"
          >

            <option value="">
              Selecciona un cliente
            </option>

            {clients.map((client: any) => (

              <option
                key={client.id}
                value={client.id}
              >
                {client.name}
              </option>

            ))}

          </select>
          <button
            type="button"
            onClick={() =>
                setShowClientModal(true)
            }
            className="text-sm text-black hover:underline cursor-pointer"
            >
            + Crear nuevo cliente
        </button>

        </div>

        {projectError && (

          <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">

            {projectError}

          </div>

        )}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() =>
              setShowModal(false)
            }
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreateProject}
            disabled={loading}
            className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
          >
            {loading
              ? "Creando..."
              : "Crear proyecto"}
          </button>

        </div>

      </div>

    </div>

  );
}