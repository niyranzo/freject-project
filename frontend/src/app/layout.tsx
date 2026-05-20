import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Freject — Gestiona tus proyectos y descubre cuánto ganas",
  description:
    "Freject centraliza clientes, proyectos, tiempo y rentabilidad en una sola plataforma diseñada para freelancers que se toman en serio su negocio.",
  keywords: ["freelance", "gestión proyectos", "rentabilidad", "clientes", "saas"],
  openGraph: {
    title: "Freject — Gestión freelance reinventada",
    description: "Centraliza todo. Controla tu tiempo. Descubre tu rentabilidad real.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
