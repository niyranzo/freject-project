"use client";

import { useState } from "react";

import {
  createClient,
  getClients,
} from "@/lib/api/clients";

interface Props {
  showClientModal: boolean;
  setShowClientModal: any;
  setClients: any;
}

export default function CreateClientModal({
  showClientModal,
  setShowClientModal,
  setClients,
}: Props) {

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");

  const [clientLoading, setClientLoading] =
    useState(false);

  const [clientError, setClientError] =
    useState("");

  if (!showClientModal) return null;

  const handleCreateClient = async () => {

    try {

      setClientLoading(true);
      setClientError("");

      const response =
        await createClient({
          name: clientName,
          email: clientEmail,
          company: clientCompany,
        });

      if (response.message) {
        setClientError(response.message);
        return;
      }

      const updatedClients =
        await getClients();

      setClients(updatedClients);

      setShowClientModal(false);

    } catch (error: any) {

      setClientError(error.message);

    } finally {

      setClientLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[60]">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold text-slate-900">
          Nuevo cliente
        </h2>

        <div className="space-y-4 mt-5">

          <input
            type="text"
            placeholder="Nombre"
            value={clientName}
            onChange={(e) =>
              setClientName(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={clientEmail}
            onChange={(e) =>
              setClientEmail(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="text"
            placeholder="Empresa"
            value={clientCompany}
            onChange={(e) =>
              setClientCompany(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

        {clientError && (

          <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">

            {clientError}

          </div>

        )}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() =>
              setShowClientModal(false)
            }
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreateClient}
            disabled={clientLoading}
            className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm hover:bg-violet-700 transition"
          >
            {clientLoading
              ? "Creando..."
              : "Crear cliente"}
          </button>

        </div>

      </div>

    </div>

  );
}