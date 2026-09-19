import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import {
  EXPEDIENTES_DEMO,
  ETIQUETAS_ETAPA,
  COLORES_ETAPA,
  ETAPAS_ORDEN,
  type Etapa,
} from "@/lib/mock-data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ExpedientePage({ params }: Props) {
  const { id } = await params;
  const expediente = EXPEDIENTES_DEMO.find((e) => e.id === id);

  if (!expediente) {
    notFound();
  }

  const etapaActualIdx = ETAPAS_ORDEN.indexOf(expediente.etapaActual);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <p className="font-mono text-xs text-slate-500">{expediente.id}</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-100">
              {expediente.titular}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded px-2 py-1 text-xs font-semibold text-white ${COLORES_ETAPA[expediente.etapaActual]}`}
              >
                {ETIQUETAS_ETAPA[expediente.etapaActual]}
              </span>
              <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">
                {expediente.origen}
              </span>
              <span className="text-xs text-slate-500">
                {expediente.territorio}
              </span>
              {expediente.lengua && (
                <span className="rounded bg-purple-900/40 px-2 py-1 text-xs text-purple-300">
                  {expediente.lengua}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Pipeline
                </h2>
                <div className="mt-4 space-y-2">
                  {ETAPAS_ORDEN.map((etapa: Etapa, idx: number) => {
                    const completada = idx <= etapaActualIdx;
                    return (
                      <div
                        key={etapa}
                        className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                          completada
                            ? "border-slate-700 bg-slate-800/50"
                            : "border-slate-800 bg-slate-900/30"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            completada
                              ? `${COLORES_ETAPA[etapa]} text-white`
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span
                          className={`text-sm ${
                            completada ? "text-slate-100" : "text-slate-500"
                          }`}
                        >
                          {ETIQUETAS_ETAPA[etapa]}
                        </span>
                        {idx === etapaActualIdx && (
                          <span className="ml-auto rounded bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                            Actual
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="space-y-4">
              <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Detalles
                </h2>
                <dl className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Creado</dt>
                    <dd className="text-slate-300">
                      {new Date(expediente.creadoEn).toLocaleDateString("es-MX")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Actualizado</dt>
                    <dd className="text-slate-300">
                      {new Date(expediente.actualizadoEn).toLocaleDateString("es-MX")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Transiciones</dt>
                    <dd className="text-slate-300">{expediente.totalTransiciones}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
