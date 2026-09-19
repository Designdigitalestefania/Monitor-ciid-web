/**
 * Datos mock para el dashboard de MONITOR CIID.
 *
 * En esta primera version del dashboard usamos datos simulados
 * para que la interfaz funcione sin depender del backend.
 *
 * En la siguiente fase se conecta con Monitor-ciid-mexico real.
 */

export type Etapa =
  | "RECEIVED"
  | "PROCESSING"
  | "CLASSIFIED"
  | "EDITORIAL_REVIEW"
  | "VERIFICATION"
  | "DECISION"
  | "PUBLISHED"
  | "PRESERVED";

export interface ExpedienteDemo {
  id: string;
  origen: "ciudadania" | "institucional" | "interno";
  etapaActual: Etapa;
  territorio: string;
  lengua: string | null;
  titular: string;
  creadoEn: string;
  actualizadoEn: string;
  totalTransiciones: number;
}

export const ETAPAS_ORDEN: Etapa[] = [
  "RECEIVED",
  "PROCESSING",
  "CLASSIFIED",
  "EDITORIAL_REVIEW",
  "VERIFICATION",
  "DECISION",
  "PUBLISHED",
  "PRESERVED",
];

export const ETIQUETAS_ETAPA: Record<Etapa, string> = {
  RECEIVED: "Ingesta",
  PROCESSING: "Normalización",
  CLASSIFIED: "Clasificación",
  EDITORIAL_REVIEW: "Asistencia editorial",
  VERIFICATION: "Verificación",
  DECISION: "Decisión",
  PUBLISHED: "Publicación",
  PRESERVED: "Preservación",
};

export const COLORES_ETAPA: Record<Etapa, string> = {
  RECEIVED: "bg-slate-700",
  PROCESSING: "bg-blue-700",
  CLASSIFIED: "bg-cyan-700",
  EDITORIAL_REVIEW: "bg-indigo-700",
  VERIFICATION: "bg-amber-700",
  DECISION: "bg-pink-700",
  PUBLISHED: "bg-emerald-700",
  PRESERVED: "bg-purple-700",
};

export const EXPEDIENTES_DEMO: ExpedienteDemo[] = [
  {
    id: "CIID-2026-0001",
    origen: "ciudadania",
    etapaActual: "RECEIVED",
    territorio: "Sierra Norte · Oaxaca",
    lengua: "Zapoteco (variante demo)",
    titular: "Reporte ciudadano sobre obra del camino comunitario",
    creadoEn: "2026-09-15T18:12:00Z",
    actualizadoEn: "2026-09-15T18:12:00Z",
    totalTransiciones: 1,
  },
  {
    id: "CIID-2026-0002",
    origen: "institucional",
    etapaActual: "PROCESSING",
    territorio: "Oaxaca de Juárez · Oaxaca",
    lengua: null,
    titular: "Comunicado del Ayuntamiento sobre obra vial",
    creadoEn: "2026-09-15T17:45:00Z",
    actualizadoEn: "2026-09-15T17:52:00Z",
    totalTransiciones: 2,
  },
  {
    id: "CIID-2026-0003",
    origen: "ciudadania",
    etapaActual: "EDITORIAL_REVIEW",
    territorio: "Valles Centrales · Oaxaca",
    lengua: "Mixteco (variante demo)",
    titular: "Reporte sobre falta de información oficial en lengua",
    creadoEn: "2026-09-15T16:20:00Z",
    actualizadoEn: "2026-09-15T17:30:00Z",
    totalTransiciones: 4,
  },
  {
    id: "CIID-2026-0004",
    origen: "institucional",
    etapaActual: "VERIFICATION",
    territorio: "Oaxaca de Juárez · Oaxaca",
    lengua: null,
    titular: "Informe de la dependencia sobre rehabilitación",
    creadoEn: "2026-09-15T15:10:00Z",
    actualizadoEn: "2026-09-15T16:40:00Z",
    totalTransiciones: 5,
  },
  {
    id: "CIID-2026-0005",
    origen: "ciudadania",
    etapaActual: "DECISION",
    territorio: "Sierra Norte · Oaxaca",
    lengua: "Zapoteco (variante demo)",
    titular: "Reporte sobre obras inconclusas en comunidad",
    creadoEn: "2026-09-15T14:00:00Z",
    actualizadoEn: "2026-09-15T16:15:00Z",
    totalTransiciones: 6,
  },
  {
    id: "CIID-2026-0006",
    origen: "institucional",
    etapaActual: "PUBLISHED",
    territorio: "Oaxaca de Juárez · Oaxaca",
    lengua: null,
    titular: "Anuncio de obra pública publicado en sitio web",
    creadoEn: "2026-09-15T12:30:00Z",
    actualizadoEn: "2026-09-15T14:00:00Z",
    totalTransiciones: 7,
  },
  {
    id: "CIID-2026-0007",
    origen: "ciudadania",
    etapaActual: "PRESERVED",
    territorio: "Sierra Norte · Oaxaca",
    lengua: "Zapoteco (variante demo)",
    titular: "Reporte comunitario preservado en archivo patrimonial",
    creadoEn: "2026-09-15T10:00:00Z",
    actualizadoEn: "2026-09-15T13:45:00Z",
    totalTransiciones: 8,
  },
];

export const RESUMEN_TENANT = {
  tenantId: "monitor-noticias",
  tenantNombre: "Monitor Noticias",
  totalExpedientes: 7,
  porEtapa: {
    RECEIVED: 1,
    PROCESSING: 1,
    CLASSIFIED: 0,
    EDITORIAL_REVIEW: 1,
    VERIFICATION: 1,
    DECISION: 1,
    PUBLISHED: 1,
    PRESERVED: 1,
  },
};

export interface PreservadoDemo {
  id: string;
  territorio: string;
  lenguas: string[];
  hashDocumental: string;
  version: string;
  preservadoEn: string;
  preservadoPor: string;
  totalTransiciones: number;
}

export const PRESERVADOS_DEMO: PreservadoDemo[] = [
  {
    id: "CIID-2026-0007",
    territorio: "Sierra Norte · Oaxaca",
    lenguas: ["Zapoteco (variante demo)"],
    hashDocumental: "sha-local-c4e188ab",
    version: "1.0.0",
    preservadoEn: "2026-09-15T13:45:00Z",
    preservadoPor: "Periodista Demo",
    totalTransiciones: 8,
  },
  {
    id: "CIID-2026-0010",
    territorio: "Valles Centrales · Oaxaca",
    lenguas: ["Mixteco (variante demo)"],
    hashDocumental: "sha-local-88fa1203",
    version: "1.0.0",
    preservadoEn: "2026-09-14T18:20:00Z",
    preservadoPor: "Editor Demo",
    totalTransiciones: 7,
  },
];

export interface CanalMetricaDemo {
  canal: string;
  total: number;
}

export interface EstadoMetricaDemo {
  estado: string;
  total: number;
}

export const METRICAS_DEMO = {
  tenantId: "monitor-noticias",
  totalExpedientes: 7,
  totalDistribuciones: 12,
  totalValidaciones: 4,
  totalReportesCiudadanos: 5,
  distribucionesPorCanal: [
    { canal: "web", total: 4 },
    { canal: "facebook", total: 3 },
    { canal: "instagram", total: 2 },
    { canal: "radio-comunitaria", total: 2 },
    { canal: "whatsapp-breve", total: 1 },
  ] as CanalMetricaDemo[],
  validacionesPorEstado: [
    { estado: "validada", total: 3 },
    { estado: "pendiente", total: 1 },
  ] as EstadoMetricaDemo[],
  reportesPorEstado: [
    { estado: "activo", total: 3 },
    { estado: "vinculado", total: 1 },
    { estado: "retirado", total: 1 },
  ] as EstadoMetricaDemo[],
};
