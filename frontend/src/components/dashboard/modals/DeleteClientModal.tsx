"use client";

import { deleteClient,  getClients } from "@/lib/api/clients";
import { useState } from "react";

interface Props {
  showDeleteClientModal: boolean;
  setShowDeleteClientModal: any;
  setClients: any;
  selectedClient: any;
}


export default function DeleteClientModal({ showDeleteClientModal, setShowDeleteClientModal, setClients, selectedClient, }: Props) {
  
  const [error, setError] = useState("");

  if (!showDeleteClientModal) return null;

  const handleDeleteClient = async () => {
    try {
      await deleteClient(selectedClient.id);

      const updatedClients =
        await getClients();

      setClients(updatedClients);

      setShowDeleteClientModal(false);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">

      <div className="bg-skin w-full max-w-md rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold text-red-600">
          Borrar cliente
        </h2>

        <p className="mt-4 text-sm text-slate-600">

          ¿Seguro que quieres borrar
          a <strong>{selectedClient.name}</strong>?

          <br />
          Esta acción no se puede deshacer.

        </p>
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">
            {error} 
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() =>
              setShowDeleteClientModal(false)
            }
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={handleDeleteClient}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-xl"
          >
            Sí, borrar
          </button>

        </div>

      </div>

    </div>

  );
}