import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArchivoPatrimonial } from "@/components/ArchivoPatrimonial";

export default function ArchivoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-100">
              Archivo patrimonial
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Memoria digital de las comunidades, con trazabilidad completa.
            </p>
          </div>
          <ArchivoPatrimonial />
        </main>
      </div>
    </div>
  );
}
