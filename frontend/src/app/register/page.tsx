"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      // 📝 registrar usuario
      await registerUser(name, email, password);

      // 👉 redirigir al login
      router.push("/login?registered=true");

    } catch (error: any) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] px-6">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">

        {/* Header */}
        <div className="mb-6 text-center">

          <h1 className="text-2xl font-semibold text-slate-900">
            Crear cuenta
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Empieza a organizar tu trabajo
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition disabled:opacity-50"
          >
            {loading
              ? "Creando cuenta..."
              : "Crear cuenta"}
          </button>

          <p className="text-sm text-center text-slate-500">
            ¿Ya tienes cuenta?{" "}

            <Link
              href="/login"
              className="text-violet-600 font-medium"
            >
              Inicia sesión
            </Link>

          </p>

        </form>

      </div>
    </div>
  );
}