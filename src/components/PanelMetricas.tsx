import { METRICAS_DEMO } from "@/lib/mock-data";

export function PanelMetricas() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Expedientes
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {METRICAS_DEMO.totalExpedientes}
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Distribuciones
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {METRICAS_DEMO.totalDistribuciones}
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Validaciones
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {METRICAS_DEMO.totalValidaciones}
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Reportes ciudadanos
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {METRICAS_DEMO.totalReportesCiudadanos}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Distribuciones por canal
          </h3>
          <div className="mt-3 space-y-2">
            {METRICAS_DEMO.distribucionesPorCanal.map((item) => (
              <div key={item.canal} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{item.canal}</span>
                <span className="font-mono text-slate-200">{item.total}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Validaciones por estado
          </h3>
          <div className="mt-3 space-y-2">
            {METRICAS_DEMO.validacionesPorEstado.map((item) => (
              <div key={item.estado} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{item.estado}</span>
                <span className="font-mono text-slate-200">{item.total}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Reportes por estado
          </h3>
          <div className="mt-3 space-y-2">
            {METRICAS_DEMO.reportesPorEstado.map((item) => (
              <div key={item.estado} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{item.estado}</span>
                <span className="font-mono text-slate-200">{item.total}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
