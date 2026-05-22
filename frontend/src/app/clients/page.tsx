"use client";

import { useEffect, useState } from "react";
import { IM_Fell_French_Canon } from "next/font/google";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { Client } from "@/interfaces/client";

import {
  getClients,
  createClient
} from "@/lib/api/clients";

const imFellItalic = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
});

export default function ClientsPage() {

  const [clients, setClients] = useState<Client[]>([]);

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
    <div className="flex h-screen bg-skin">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <Topbar />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className={imFellItalic.className + " text-5xl font-bold text-slate-900"}>
              Clientes
            </h2>

            <p className="text-slate-500 mt-1">
              Gestiona tus clientes
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
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

            clients.map((client: Client) => (

              <div
                key={client.id}
                className="rounded-2xl border border-blackback shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="flex justify-center bg-blackback p-4 rounded-t-2xl">
                  <h3 className={imFell.className + " text-white text-xl"}>
                    {client.name}
                  </h3>
                </div>

                <div className="space-y-3 m-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blackback">
                      Compañía
                    </span>

                    <span className="font-semibold text-slate-800">
                      {client.company}
                    </span>

                  </div>

                  <div className="h-px w-mg bg-gray-300"></div>


                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blackback">
                      Email
                    </span>

                    <span className="font-semibold text-slate-800">
                      {client.email}
                    </span>

                  </div>

                  <div className="h-px w-mg bg-gray-300"></div>
                  <div className="flex justify-between">
                    <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
                  >
                    Editar cliente
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
                  >
                    Borrar cliente
                  </button>
                  </div>
                </div>

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