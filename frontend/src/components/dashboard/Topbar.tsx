"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IM_Fell_French_Canon } from "next/font/google";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
  // style: ["italic"],
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

        if (res.ok) {
          setUserName(data.user.name);
        }

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
    <div className="flex items-center justify-between mb-8">

      {/* LEFT */}
      <div>

        <p className={imFell.className + " text-xl text-blackback mt-1"}>
          Bienvenido de nuevo, {userName}  <i className="fa-solid fa-mug-hot"></i>
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blackback border text-white text-sm rounded-xl hover:bg-white/0 hover:text-blackback hover:border hover:border-blackback transition cursor-pointer"
        >
          Cerrar sesión
        </button>

        <div className="w-9 h-9 rounded-full text-black flex items-center justify-center text-sm font-medium border border-blackback">
          {userName?.charAt(0).toUpperCase()}
        </div>

      </div>

    </div>
  );
}