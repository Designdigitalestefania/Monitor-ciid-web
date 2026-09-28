import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

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

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-sm text-slate-400">
              Aún no hay expedientes preservados en este tenant.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Cuando el equipo editorial apruebe y preserve información,
              aparecerá aquí con su hash documental y evidencia de verificación.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
