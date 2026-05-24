"use client";

import { useEffect, useState } from "react";
import { updateClient, getClients } from "@/lib/api/clients";

interface Props {
  showEditClientModal: boolean;
  setShowEditClientModal: any;
  setClients: any;
  selectedClient: any;
}

export default function EditClientModal({
  showEditClientModal,
  setShowEditClientModal,
  setClients,
  selectedClient,
}: Props) {

  const [clientName, setClientName] =
    useState(selectedClient?.name || "");

  const [clientEmail, setClientEmail] =
    useState(selectedClient?.email || "");

  const [clientCompany, setClientCompany] =
    useState(selectedClient?.company || "");

  const [clientLoading, setClientLoading] =
    useState(false);

  const [clientError, setClientError] =
    useState("");

    useEffect(() => {

  if (selectedClient) {
    setClientName(selectedClient.name || "");
    setClientEmail(selectedClient.email || "");
    setClientCompany(selectedClient.company || "");
  }

}, [selectedClient]);

  if (!showEditClientModal) return null;

  const handleEditClient = async () => {

    try {

      setClientLoading(true);

      setClientError("");

      const response =
        await updateClient(
          selectedClient.id,
          {
            name: clientName,
            email: clientEmail,
            company: clientCompany,
          }
        );

      if (response.message) {

        setClientError(response.message);

        return;

      }

      const updatedClients =
        await getClients();

      setClients(updatedClients);

      setShowEditClientModal(false);

    } catch (error: any) {

      setClientError(error.message);

    } finally {

      setClientLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">

      <div className="bg-skin w-full max-w-md rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold text-slate-900">
          Editar cliente
        </h2>

        <div className="space-y-4 mt-5">

          <input
            type="text"
            value={clientName}
            onChange={(e) =>
              setClientName(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200"
          />

          <input
            type="email"
            value={clientEmail}
            onChange={(e) =>
              setClientEmail(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200"
          />

          <input
            type="text"
            value={clientCompany}
            onChange={(e) =>
              setClientCompany(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200"
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
              setShowEditClientModal(false)
            }
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={handleEditClient}
            disabled={clientLoading}
            className="px-4 py-2 bg-blackback text-white text-sm rounded-xl"
          >
            {
              clientLoading
                ? "Guardando..."
                : "Guardar cambios"
            }
          </button>

        </div>

      </div>

    </div>

  );
}