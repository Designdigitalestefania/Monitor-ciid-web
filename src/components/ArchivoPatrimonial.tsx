import { PRESERVADOS_DEMO } from "@/lib/mock-data";

export function ArchivoPatrimonial() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-purple-800 bg-purple-950/20 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-purple-300">
          Archivo patrimonial vivo
        </h2>
        <p className="mt-1 text-xs text-purple-200/70">
          Expedientes preservados con trazabilidad completa: territorio,
          lenguas, hash documental y evidencia de verificación.
        </p>
      </div>

      <div className="space-y-3">
        {PRESERVADOS_DEMO.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-slate-800 bg-slate-900 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500">{p.id}</span>
                  <span className="rounded bg-purple-700 px-2 py-0.5 text-xs font-semibold text-white">
                    PRESERVADO
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-100">{p.territorio}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.lenguas.map((lengua) => (
                    <span
                      key={lengua}
                      className="rounded bg-purple-900/40 px-2 py-0.5 text-xs text-purple-300"
                    >
                      {lengua}
                    </span>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500">Hash documental</p>
                    <p className="font-mono text-slate-300">{p.hashDocumental}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Versión</p>
                    <p className="text-slate-300">{p.version}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Preservado por</p>
                    <p className="text-slate-300">{p.preservadoPor}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Transiciones</p>
                    <p className="text-slate-300">{p.totalTransiciones}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">
                  {new Date(p.preservadoEn).toLocaleDateString("es-MX")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
