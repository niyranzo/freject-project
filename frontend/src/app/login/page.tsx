"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      await loginUser(email, password);

      router.push("/dashboard");

    } catch (error: any) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };
  

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-[#f7f3f2] px-16 relative overflow-hidden">

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Logo */}
            <Image
              src="/logo.png"
              alt="Freject"
              width={320}
              height={90}
              className=""
              priority
            />

            {/* Text */}
            <h1 className="text-4xl font-bold text-[#0B1023] mb-4 italic">
              Bienvenido de nuevo
            </h1>

            <p className="text-xl text-slate-500 mb-5">
              Inicia sesión para continuar
            </p>

            {/* Plant Image */}
            <Image
              src="/planta.png"
              alt="Plant"
              width={300}
              height={300}
              className="object-contain opacity-90"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center bg-white px-8 py-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="flex justify-center mb-10 lg:hidden">
              <Image
                src="/logo.png"
                alt="Freject"
                width={220}
                height={70}
                priority
              />
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-bold text-[#0B1023] mb-3">
              Iniciar sesión
            </h2>

            <p className="text-slate-500 text-lg mb-10">
              Accede a tu cuenta para continuar
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-slate-200
                    px-5
                    text-slate-700
                    outline-none
                    transition-all
                    focus:border-violet-500
                    focus:ring-4
                    focus:ring-violet-100
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-slate-200
                      px-5
                      pr-14
                      text-slate-700
                      outline-none
                      transition-all
                      focus:border-violet-500
                      focus:ring-4
                      focus:ring-violet-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-600
                      transition
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              {/* <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-slate-500">
                  <input type="checkbox" />
                  Recordarme
                </label>

                <Link
                  href="#"
                  className="text-[#445E3B] hover:text-violet-700 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div> */}
              {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#445E3B]
                  text-white
                  text-lg
                  font-semibold
                  shadow-lg
                  shadow-slate-300/40
                  hover:scale-[1.01]
                  transition-all
                "
              >
                Iniciar sesión
              </button>

              {/* Divider */}
              {/* <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-slate-200" />

                <span className="text-sm text-slate-400">
                  o continúa con
                </span>

                <div className="flex-1 h-px bg-slate-200" />
              </div> */}

              {/* SOCIALS
              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  className="
                    h-14
                    rounded-2xl
                    border
                    border-slate-200
                    hover:bg-slate-50
                    transition-all
                    font-medium
                  "
                >
                  Google
                </button>

                <button
                  type="button"
                  className="
                    h-14
                    rounded-2xl
                    border
                    border-slate-200
                    hover:bg-slate-50
                    transition-all
                    font-medium
                  "
                >
                  Microsoft
                </button>
              </div> */}

              {/* Register */}
              <p className="text-center text-slate-500 pt-4">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="text-[#445E3B] font-semibold hover:text-[#445E3B]/80 transition"
                >
                  Regístrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}