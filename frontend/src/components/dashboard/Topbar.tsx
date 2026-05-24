"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IM_Fell_French_Canon } from "next/font/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
});

export default function Topbar() {

  const router = useRouter();

  const [userName, setUserName] = useState("");

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) setUserName(data.user.name);

      } catch (error) {

        console.error(error);

      }

    };

    fetchData();

  }, []);

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

  return (

    <div className="flex items-start md:items-center justify-between gap-4 mb-8">

      {/* LEFT */}

      <div>

        {/* MOBILE */}

        <div className="md:hidden">

          <p className="text-sm text-slate-500">
            Bienvenido de nuevo,
          </p>

          <h1 className={imFell.className + " text-4xl leading-none text-blackback mt-1"}>
            {userName}
          </h1>

        </div>

        {/* DESKTOP */}

        <p className={imFell.className + " hidden md:block text-xl text-blackback mt-1"}>
          Bienvenido de nuevo,  <span className="font-bold text-2xl">{userName}</span> <i className="fa-solid fa-mug-hot"></i>
        </p>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3 shrink-0">

        {/* DESKTOP BUTTON */}

        <button
          onClick={handleLogout}
          className="hidden md:flex px-4 py-2 bg-blackback text-white text-sm rounded-xl hover:opacity-80 transition"
        >
          Cerrar sesión
        </button>

        {/* MOBILE BUTTON */}

        <button
          onClick={handleLogout}
          className="md:hidden w-10 h-10 rounded-full bg-blackback text-white flex items-center justify-center"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>

        {/* AVATAR */}

        <div className="w-10 h-10 rounded-full border border-blackback flex items-center justify-center text-sm font-medium">
          {userName?.charAt(0).toUpperCase()}
        </div>

      </div>

    </div>

  );

}