"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import {
  getClients,
  createClient
} from "@/lib/api/clients";

export default function ClientsPage() {

  const [clients, setClients] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  

  const fetchClients = async () => {

    try {

      const data = await getClients();

      setClients(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleCreateClient = async () => {

    try {

      await createClient({
        name,
        email,
        company,
      });

      setShowModal(false);

      setName("");
      setEmail("");
      setCompany("");

      fetchClients();

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    fetchClients();

  }, []);

  return (
    <div className="flex h-screen bg-[#f8f9fb]">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Clientes
            </h1>

            <p className="text-slate-500 mt-1">
              Gestiona tus clientes
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm hover:bg-violet-700 transition"
          >
            + Nuevo cliente
          </button>

        </div>

        {/* Clients */}
        <div className="grid grid-cols-3 gap-4">

          {loading ? (

            <p>Cargando clientes...</p>

          ) : clients.length === 0 ? (

            <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center col-span-3">

              <h3 className="text-lg font-semibold text-slate-800">
                No tienes clientes todavía
              </h3>

              <p className="text-slate-400 mt-2">
                Crea tu primer cliente
              </p>

            </div>

          ) : (

            clients.map((client: any) => (

              <div
                key={client.id}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
              >

                <h3 className="font-semibold text-slate-900">
                  {client.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {client.company}
                </p>

                <p className="text-sm text-slate-400 mt-3">
                  {client.email}
                </p>

              </div>

            ))

          )}

        </div>

        {/* Modal */}
        {showModal && (

          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

              <h2 className="text-xl font-semibold text-slate-900">
                Nuevo cliente
              </h2>

              <div className="space-y-4 mt-5">

                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                />

                <input
                  type="text"
                  placeholder="Empresa"
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-4 py-2 rounded-xl border border-slate-200"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleCreateClient}
                  className="px-4 py-2 bg-violet-600 text-white rounded-xl"
                >
                  Crear cliente
                </button>

              </div>

            </div>

          </div>

        )}

      </main>
    </div>
  );
}