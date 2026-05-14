"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/api/projects";

const API_URL = "http://localhost:4000/api";

export default function Topbar() {

  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectPrice, setProjectPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {

          setUserName(data.user.name);

        }

      } catch (error) {

        console.error(error);

      }
    };

    fetchUser();

  }, []);

  // 🚪 Logout
  const handleLogout = async () => {

    try {

      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");

    } catch (error) {

      console.error(error);

    }
  };

  const handleCreateProject = async () => {

    try {

      setLoading(true);

      await createProject({
        name: projectName,
        price: Number(projectPrice),
        id_client: 1, // temporal
      });

      setShowModal(false);

      setProjectName("");
      setProjectPrice("");

      // 🔄 refrescar página
      window.location.reload();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex items-center justify-between mb-8">

      {/* Left */}
      <div>

        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Bienvenido de nuevo, {userName} 👋
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <input
          placeholder="Buscar..."
          className="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        {/* Create button */}
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-violet-600 text-white text-sm rounded-xl hover:bg-violet-700 transition"
        >
          + Nuevo proyecto
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white border border-slate-200 text-sm rounded-xl hover:bg-slate-50 transition"
        >
          Cerrar sesión
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white flex items-center justify-center text-sm font-medium">
          {userName?.charAt(0).toUpperCase()}
        </div>

      </div>
      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="number"
                placeholder="Precio"
                value={projectPrice}
                onChange={(e) =>
                  setProjectPrice(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreateProject}
                disabled={loading}
                className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm hover:bg-violet-700 transition"
              >
                {loading
                  ? "Creando..."
                  : "Crear proyecto"}
              </button>

            </div>

          </div>

        </div>

      )}
    </div>
  );
}