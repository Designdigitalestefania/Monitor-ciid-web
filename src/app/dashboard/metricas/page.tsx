import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getSnapshot } from "@/lib/ciid";

export default function MetricasPage() {
  const snapshot = getSnapshot();
  const totalExpedientes = snapshot.expedientes.length;

  const porEtapa: Record<string, number> = {};
  for (const exp of snapshot.expedientes) {
    porEtapa[exp.etapaActual] = (porEtapa[exp.etapaActual] ?? 0) + 1;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-100">Métricas</h1>
            <p className="mt-1 text-sm text-slate-400">
              Analítica operativa del tenant Monitor Noticias.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Expedientes totales
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-100">
                {totalExpedientes}
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Tenant
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-100">
                Monitor Noticias
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Estado
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-400">
                Operativo
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Expedientes por etapa
            </h2>
            <div className="space-y-2">
              {Object.entries(porEtapa).length === 0 ? (
                <p className="text-sm text-slate-500">Sin datos aún.</p>
              ) : (
                Object.entries(porEtapa).map(([etapa, total]) => (
                  <div
                    key={etapa}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-slate-400">{etapa}</span>
                    <span className="font-mono text-slate-200">{total}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
