/**
 * Adaptador entre el dashboard web y el ecosistema CIID.
 *
 * Monitor Noticias es el primer tenant operativo del piloto.
 * El dashboard consume datos reales del backend publicado en
 * @designdigitalestefania/ciid-mexico.
 */

import {
  TenantsService,
  IngestService,
  crearActor,
  type Actor,
  type Expediente,
  type Tenant,
} from "@designdigitalestefania/ciid-mexico";

export const TENANT_ID = "monitor-noticias";
export const TENANT_NOMBRE = "Monitor Noticias";

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
 * Crea el snapshot operativo del tenant Monitor Noticias.
 *
 * En la version v1.0 los expedientes viven en memoria dentro de la
 * sesion del servidor. La persistencia con base de datos llega en v1.1.
 */
export function crearSnapshotOperativo(): SnapshotCIID {
  const tenants = new TenantsService();
  const ingest = new IngestService();

  const tenant = tenants.crear({
    id: TENANT_ID,
    nombre: TENANT_NOMBRE,
    tipo: "medio",
    territorioId: "oaxaca",
  });

  const actorActual = crearActor({
    userId: "periodista-01",
    nombre: "Mesa editorial · Monitor Noticias",
    rol: "periodista",
    tenantId: tenant.id,
  });

  return {
    tenants: [tenant],
    expedientes: ingest.listar(),
    actorActual,
  };
}

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

let _snapshot: SnapshotCIID | null = null;

export function getSnapshot(): SnapshotCIID {
  if (!_snapshot) {
    _snapshot = crearSnapshotOperativo();
  }
  return _snapshot;
}

export function resetSnapshot(): void {
  _snapshot = null;
}
