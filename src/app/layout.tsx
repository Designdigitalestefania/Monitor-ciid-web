import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONITOR CIID · Centro Inteligente de Información Digital",
  description:
    "Infraestructura periodística que asiste al periodista en el procesamiento, verificación, distribución y preservación de información.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
