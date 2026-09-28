/**
 * Adaptador entre el dashboard web y el ecosistema CIID real.
 *
 * Este archivo instancia los servicios de `ciid-mexico` y expone
 * funciones limpias para que las páginas del dashboard las consuman.
 *
 * En produccion, los datos vienen de SQLite o PostgreSQL. En este
 * piloto, los servicios viven en memoria con datos de demostracion.
 */

import {
  TenantsService,
  IngestService,
  crearActor,
  type Actor,
  type Expediente,
  type Tenant,
} from "@designdigitalestefania/ciid-mexico";

export interface SnapshotCIID {
  tenants: Tenant[];
  expedientes: Expediente[];
  actorActual: Actor;
}

export interface ExpedienteResumen {
  id: string;
  origen: string;
  etapaActual: string;
  territorio: string;
  lengua: string | null;
  titular: string;
  creadoEn: string;
  actualizadoEn: string;
  totalTransiciones: number;
}

/**
 * Crea un snapshot completo del ecosistema CIID para el dashboard.
 *
 * Sembramos un tenant, un actor y varios expedientes con etapas
 * distintas para que el dashboard muestre datos coherentes.
 */
export function crearSnapshotDemo(): SnapshotCIID {
  const tenants = new TenantsService();
  const ingest = new IngestService();

  // 1. Crear tenant
  const tenant = tenants.crear({
    id: "monitor-noticias",
    nombre: "Monitor Noticias",
    tipo: "medio",
    territorioId: "oaxaca",
  });

  // 2. Crear actor (periodista)
  const actorActual = crearActor({
    userId: "u-p1",
    nombre: "Periodista Demo",
    rol: "periodista",
    tenantId: tenant.id,
  });

  // 3. Sembrar expedientes con distintas etapas
  const seeds = [
    {
      id: "CIID-2026-0001",
      origen: "ciudadania" as const,
      territorio: { estado: "Oaxaca", region: "Sierra Norte" },
    },
    {
      id: "CIID-2026-0002",
      origen: "institucional" as const,
      territorio: { estado: "Oaxaca", municipio: "Oaxaca de Juárez" },
    },
    {
      id: "CIID-2026-0003",
      origen: "ciudadania" as const,
      territorio: { estado: "Oaxaca", region: "Valles Centrales" },
    },
    {
      id: "CIID-2026-0004",
      origen: "institucional" as const,
      territorio: { estado: "Oaxaca", municipio: "Oaxaca de Juárez" },
    },
    {
      id: "CIID-2026-0005",
      origen: "ciudadania" as const,
      territorio: { estado: "Oaxaca", region: "Sierra Norte" },
    },
  ];

  for (const seed of seeds) {
    ingest.recibir(
      {
        id: seed.id,
        tenantId: tenant.id,
        origen: seed.origen,
        territorio: seed.territorio,
      },
      tenant
    );
  }

  return {
    tenants: [tenant],
    expedientes: ingest.listar(),
    actorActual,
  };
}

/**
 * Convierte un Expediente del backend en un ExpedienteResumen
 * listo para mostrar en la bandeja del dashboard.
 */
export function aResumen(exp: Expediente): ExpedienteResumen {
  const partes = [
    exp.territorio.region,
    exp.territorio.municipio,
    exp.territorio.localidad,
  ].filter(Boolean);

  const territorio = partes.length > 0
    ? partes.join(" · ")
    : exp.territorio.estado;

  const lengua = exp.lenguas.length > 0
    ? exp.lenguas[0].lenguaNombre
    : null;

  return {
    id: exp.id,
    origen: exp.origen,
    etapaActual: exp.etapaActual,
    territorio,
    lengua,
    titular: titularPorOrigen(exp.origen),
    creadoEn: exp.creadoEn,
    actualizadoEn: exp.actualizadoEn,
    totalTransiciones: exp.transiciones.length,
  };
}

function titularPorOrigen(origen: string): string {
  switch (origen) {
    case "ciudadania":
      return "Reporte ciudadano sobre situación comunitaria";
    case "institucional":
      return "Comunicado institucional sobre obra pública";
    default:
      return "Expediente interno";
  }
}

/**
 * Instancia perezosa de los servicios CIID.
 * Se reutilizan entre llamadas para no perder estado.
 */
let _snapshot: SnapshotCIID | null = null;

export function getSnapshot(): SnapshotCIID {
  if (!_snapshot) {
    _snapshot = crearSnapshotDemo();
  }
  return _snapshot;
}

export function resetSnapshot(): void {
  _snapshot = null;
}
