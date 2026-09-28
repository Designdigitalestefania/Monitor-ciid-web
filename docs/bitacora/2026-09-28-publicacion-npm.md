# Sesion · 2026-09-28 · Publicacion en NPM

## Contexto

Publicacion del backend `ciid-mexico` en el registro NPM mundial
como paquete oficial, bajo el scope `@designdigitalestefania`.

## Resultado

- Paquete publicado: `@designdigitalestefania/ciid-mexico@1.0.0`
- URL: https://www.npmjs.com/package/@designdigitalestefania/ciid-mexico
- Tamano: 30.9 kB comprimido / 161.5 kB descomprimido
- Archivos: 150 (solo dist/ + package.json + README + LICENSE)
- Dependencias: 0
- Tests: 212

## Instalacion

    npm install @designdigitalestefania/ciid-mexico

## Uso

    import { TenantsService, IngestService } from "@designdigitalestefania/ciid-mexico";

## Incidentes resueltos

1. Token NPM expirado al reinstalar Termux → nueva generacion.
2. NPM requiere 2FA para publicar → token granular con bypass 2FA.
3. Token con scope restringido → cambio de nombre a `@designdigitalestefania/ciid-mexico`.
4. Error 404 al instalar desde NPM en Termux → limpiar cache + mover .npmrc temporalmente.

## Impacto

Cualquier desarrollador del mundo puede instalar MONITOR CIID con un comando.
El frontend consume el paquete desde NPM sin necesidad de clonar el backend.

---

<p align="center">
  <em>De Oaxaca para el mundo.</em>
</p>
