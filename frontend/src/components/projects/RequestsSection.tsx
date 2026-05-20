"use client";

import { useEffect, useState } from "react";

import {
  createRequest,
  getRequestsByProject,
  updateRequest,
  deleteRequest,
} from "@/lib/api/requests";

interface Props {
  projectId: number;
}

export default function RequestsSection({
  projectId,
}: Props) {

  const [requests, setRequests] = useState<any[]>([]);
  const [newRequest, setNewRequest] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH REQUESTS
  useEffect(() => {

    const fetchRequests = async () => {

      try {

        const data =
          await getRequestsByProject(projectId);

        setRequests(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchRequests();

  }, [projectId]);

  // CREATE REQUEST
  const handleAddRequest =
    async () => {

      if (!newRequest.trim()) return;

      try {

        const createdRequest =
          await createRequest({
            title: newRequest,
            id_project: projectId,
          });

        setRequests([
          ...requests,
          createdRequest,
        ]);

        setNewRequest("");

      } catch (error) {

        console.error(error);

      }
    };

  // DELETE REQUEST
  const handleDeleteRequest =
    async (id: number) => {

      try {

        await deleteRequest(id);

        setRequests(

          requests.filter(
            (request) =>
              request.id !== id
          )
        );

      } catch (error) {

        console.error(error);

      }
    };

  // START EDIT
  const handleStartEdit =
    (request: any) => {

      setEditingId(request.id);

      setEditingValue(request.title);

    };

  // SAVE EDIT
  const handleSaveEdit =
    async (id: number) => {

      if (!editingValue.trim()) return;

      try {

        await updateRequest(id, {
          title: editingValue,
        });

        setRequests(

          requests.map((request) =>

            request.id === id
              ? {
                  ...request,
                  title: editingValue,
                }
              : request
          )
        );

        setEditingId(null);

        setEditingValue("");

      } catch (error) {

        console.error(error);

      }
    };

  return (

    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 min-h-[500px]">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-slate-800">
          Peticiones
        </h2>

        <span className="text-sm text-slate-400">
          {requests.length}
        </span>

      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-5">

        <input
          type="text"
          placeholder="Nueva petición..."
          value={newRequest}
          onChange={(e) =>
            setNewRequest(
              e.target.value
            )
          }
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          onClick={handleAddRequest}
          className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm hover:bg-violet-700 transition"
        >
          +
        </button>

      </div>

      {/* REQUESTS */}
      <div className="mt-6 space-y-3">

        {loading ? (

          <p className="text-sm text-slate-400">
            Cargando peticiones...
          </p>

        ) : requests.length === 0 ? (

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">

            <p className="font-medium text-slate-700">
              No hay peticiones todavía
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Añade tu primera petición
            </p>

          </div>

        ) : (

          requests.map((request) => (

            <div
              key={request.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 transition"
            >

              {/* TITLE / EDIT */}
              <div className="flex-1">

                {editingId === request.id ? (

                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) =>
                      setEditingValue(
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />

                ) : (

                  <p className="text-sm text-slate-700">
                    {request.title}
                  </p>

                )}

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                {editingId === request.id ? (

                  <button
                    onClick={() =>
                      handleSaveEdit(
                        request.id
                      )
                    }
                    className="text-sm text-green-600 hover:underline"
                  >
                    Guardar
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      handleStartEdit(
                        request
                      )
                    }
                    className="text-sm text-violet-600 hover:underline"
                  >
                    Editar
                  </button>

                )}

                <button
                  onClick={() =>
                    handleDeleteRequest(
                      request.id
                    )
                  }
                  className="text-sm text-red-500 hover:underline"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}