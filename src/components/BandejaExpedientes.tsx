import Link from "next/link";
import {
  ETIQUETAS_ETAPA,
  COLORES_ETAPA,
  ETAPAS_ORDEN,
  type ExpedienteDemo,
  type Etapa,
} from "@/lib/mock-data";

interface Props {
  expedientes: ExpedienteDemo[];
}

export function BandejaExpedientes({ expedientes }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        {ETAPAS_ORDEN.map((etapa) => {
          const total = expedientes.filter((e) => e.etapaActual === etapa).length;
          return (
            <div
              key={etapa}
              className="rounded-lg border border-slate-800 bg-slate-900 p-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${COLORES_ETAPA[etapa]}`}
                />
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  {ETIQUETAS_ETAPA[etapa]}
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-100">{total}</p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-4 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Expedientes activos
          </h2>
        </div>
        <div className="divide-y divide-slate-800">
          {expedientes.map((exp) => (
            <Link
              key={exp.id}
              href={`/dashboard/expediente/${exp.id}`}
              className="block px-4 py-3 transition-colors hover:bg-slate-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">
                      {exp.id}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-semibold text-white ${COLORES_ETAPA[exp.etapaActual]}`}
                    >
                      {ETIQUETAS_ETAPA[exp.etapaActual]}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                      {exp.origen}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-100">{exp.titular}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {exp.territorio}
                    {exp.lengua && ` · ${exp.lengua}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    {exp.totalTransiciones} transiciones
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
