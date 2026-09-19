"use client";

import { useState } from "react";

export function FormularioIngesta() {
  const [titular, setTitular] = useState("");
  const [origen, setOrigen] = useState<"ciudadania" | "institucional">("ciudadania");
  const [territorio, setTerritorio] = useState("");
  const [lengua, setLengua] = useState("");
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-lg border border-green-800 bg-green-950/30 p-6">
        <p className="text-sm text-green-300">
          ✓ Expediente recibido. En producción aquí se crearía el registro
          en el ecosistema CIID con trazabilidad completa.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-4 rounded bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          Recibir otro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className="max-w-xl space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400">
          Titular
        </label>
        <input
          type="text"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          required
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
          placeholder="Ej: Reporte sobre obra del camino comunitario"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400">
          Origen
        </label>
        <select
          value={origen}
          onChange={(e) => setOrigen(e.target.value as "ciudadania" | "institucional")}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
        >
          <option value="ciudadania">Ciudadanía</option>
          <option value="institucional">Institucional</option>
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400">
          Territorio
        </label>
        <input
          type="text"
          value={territorio}
          onChange={(e) => setTerritorio(e.target.value)}
          required
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
          placeholder="Ej: Sierra Norte · Oaxaca"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400">
          Lengua originaria (opcional)
        </label>
        <input
          type="text"
          value={lengua}
          onChange={(e) => setLengua(e.target.value)}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
          placeholder="Ej: Zapoteco (variante demo)"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      >
        Ingresar expediente al pipeline
      </button>
    </form>
  );
}
