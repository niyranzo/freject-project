"use client";

import { useEffect, useState } from "react";
import { IM_Fell_French_Canon } from "next/font/google";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { Client } from "@/interfaces/client";
import CreateClientModal from "@/components/dashboard/modals/CreateClientModal";
import EditClientModal from "@/components/dashboard/modals/EditClientModal";
import DeleteClientModal from "@/components/dashboard/modals/DeleteClientModal";
import { getClients } from "@/lib/api/clients";
import MobileNavbar from "@/components/dashboard/MobileNavbar";
import Spinner from "@/components/ui/Spinner";

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
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [search, setSearch] = useState("");
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );
  

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

  useEffect(() => {

    fetchClients();

  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-skin">
      <MobileNavbar />
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <Topbar />
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>

            <h2 className={imFellItalic.className + " text-5xl font-bold text-slate-900"}>
              Clientes
            </h2>

            <p className="text-slate-500 mt-1">
              Gestiona tus clientes
            </p>

          </div>
          <div className="flex items-center gap-3">

            <input type="text" placeholder="Buscar cliente..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-100 px-4 py-2 border text-blackback text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
            />

            <button
              onClick={() => setShowClientModal(true)}
              className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
            >
              + Nuevo cliente
            </button>
          </div>

        </div>

        {/* Clients */}          
          {loading ? (

            <Spinner />

          ) : filteredClients.length === 0 ? (

            <div className="flex flex-col items-center justify-center text-center mt-24">
              <h3 className="text-2xl font-semibold text-blackback mt-6 border-b border-blackback/50 rounded-xl px-3 py-1">
                No tienes Clientes todavía o no se encontró el que buscabas
              </h3>

              <p className="text-slate-500 mt-2 max-w-md">
                Empieza creando tu primer cliente para organizar mejor tus proyectos freelance con Freject.
              </p>
            </div>

          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client: Client) => (

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
                     onClick={() => {setSelectedClient(client);setShowEditClientModal(true);}}
                    className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
                  >
                    Editar cliente
                  </button>
                  <button
                    onClick={() => {setSelectedClient(client);setShowDeleteClientModal(true);}}                    className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
                  >
                    Borrar cliente
                  </button>
                  </div>
                </div>

              </div>

            ))}
          </div>
          )}

      <CreateClientModal
        showClientModal={showClientModal}
        setShowClientModal={setShowClientModal}
        setClients={setClients}
      />

      <EditClientModal
        showEditClientModal={
          showEditClientModal
        }
        setShowEditClientModal={
          setShowEditClientModal
        }
        setClients={setClients}
        selectedClient={selectedClient}
      />

      <DeleteClientModal
        showDeleteClientModal={
          showDeleteClientModal
        }
        setShowDeleteClientModal={
          setShowDeleteClientModal
        }
        setClients={setClients}
        selectedClient={selectedClient}
      />
      </main>
    </div>
  );
}