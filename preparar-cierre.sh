#!/data/data/com.termux/files/usr/bin/bash
# Preparar cierre de sesion Monitor CIID
set -e

DIR_FRONT="$HOME/monitor-ciid-web"
DIR_BACK="$HOME/ciid-mexico"
DIR_LOG="$DIR_FRONT/docs/bitacora"

echo ""
echo "===================================================="
echo "  MONITOR CIID · Preparar cierre de sesion"
echo "===================================================="
echo ""

# 1. Crear carpeta de bitacora si no existe
mkdir -p "$DIR_LOG"
echo "[1/4] Carpeta docs/bitacora/ lista"
echo ""

# 2. Escribir la bitacora de la sesion de conexion
echo "[2/4] Escribiendo bitacora de conexion backend-frontend..."

cat > "$DIR_LOG/2026-09-28-conexion-backend.md" <<'BITACORA_EOF'
# Sesion · 2026-09-28 · Conexion backend-frontend

## Contexto

Sesion dedicada a conectar el dashboard web (`Monitor-ciid-web`) con el
ecosistema funcional CIID (`Monitor-ciid-mexico`) usando el paquete
local como dependencia real.

## Objetivo

Que el frontend consuma los 9 modulos del backend (tenants, ingest,
pipeline, preservation, citizen, linguistic, distribution, metrics y
dominio puro) como paquete npm, con tipado completo y CI verde.

## Trabajo realizado

### 1. Preparar el backend como paquete consumible

- Se actualizo `package.json` del backend con:
  - `main`: `./dist/index.js`
  - `types`: `./dist/index.d.ts`
  - `exports`: mapa ESM con `types` e `import`.
  - `files`: `["dist"]`
  - `private: false` (critico para poder consumirse).
- Se compilo el backend con `npm run build` generando `dist/`.

### 2. Instalar el backend en el frontend

- `npm install ../ciid-mexico` en el frontend.
- Se agrego `"ciid-mexico": "file:../ciid-mexico"` a las dependencias.

### 3. Crear adaptador `src/lib/ciid.ts`

- Instancia `TenantsService` e `IngestService` del backend.
- Siembra datos de demostracion (tenant, actor, 5 expedientes).
- Expone `getSnapshot()` y `aResumen()` para las paginas.

### 4. Reemplazar datos mock por datos reales

- `BandejaExpedientes.tsx` consume `ExpedienteResumen` del adaptador.
- `dashboard/page.tsx` usa `getSnapshot()`.
- `dashboard/expediente/[id]/page.tsx` tambien consume del backend.

### 5. Ajustar el CI para que clone el backend

- El workflow clona `Monitor-ciid-mexico` en `ciid-mexico/`.
- Compila el backend antes de instalar el frontend.
- Ejecuta lint + typecheck + build del frontend.

## Incidentes resueltos

### Incidente 1 · Autenticacion de GitHub

- Token expirado al reinstalar Termux.
- Solucion: generar token nuevo con scope `repo` y guardarlo en
  `~/.git-credentials`.

### Incidente 2 · Error `LayoutProps<"/">` en CI

- `LayoutProps` es tipo generado por Next.js en desarrollo.
- En CI limpio no existe.
- Solucion: reemplazar por `ReactNode` explicito.

### Incidente 3 · `next-env.d.ts` ignorado

- El archivo estaba en `.gitignore`.
- CI no lo tenia.
- Solucion: quitar la linea del `.gitignore` y versionar el archivo.

### Incidente 4 · CI no encontraba `ciid-mexico`

- El frontend importa `ciid-mexico` pero CI no tenia el backend.
- Iteraciones:
  1. Clonar el backend en el workflow.
  2. Corregir el `path` del backend para que coincida con `file:../ciid-mexico`.
  3. Copiar el `dist/` del backend al `node_modules` del frontend.
  4. Cambiar `private: true` a `private: false` en el backend.
  5. Simplificar el workflow confiando en npm `file:`.
- Solucion final: `private: false` + workflow limpio.

## Estado al cierre

- Backend `Monitor-ciid-mexico` v1.0.0 con 9 modulos y 212 tests.
- Frontend `Monitor-ciid-web` con dashboard funcional.
- Conexion backend-frontend via paquete local.
- CI verde en ambos repos.

## Proximos pasos

1. Publicar dashboard en Netlify.
2. Conectar paginas de ingesta, archivo y metricas al backend real.
3. Persistencia con SQLite en el frontend.
4. Deploy del backend en servicio de produccion.

---

<p align="center">
  <em>La tecnologia asiste. El periodista decide.</em>
</p>
BITACORA_EOF

echo "  ✓ Bitacora escrita: docs/bitacora/2026-09-28-conexion-backend.md"
echo ""

# 3. Escribir configuracion de Netlify
echo "[3/4] Escribiendo netlify.toml..."

cat > "$DIR_FRONT/netlify.toml" <<'NETLIFY_EOF'
# Configuracion de Netlify para Monitor CIID Web
[build]
  command = "npm install --no-audit --no-fund && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
NETLIFY_EOF

echo "  ✓ netlify.toml escrito"
echo ""

# 4. Verificar estado de ambos repos
echo "[4/4] Verificando estado de repos..."
echo ""

cd "$DIR_BACK"
echo "  Backend ($DIR_BACK):"
echo "    Branch: $(git branch --show-current)"
echo "    Ultimo commit: $(git log -1 --oneline)"
echo "    Working tree: $(git status --short | wc -l) cambios pendientes"
echo ""

cd "$DIR_FRONT"
echo "  Frontend ($DIR_FRONT):"
echo "    Branch: $(git branch --show-current)"
echo "    Ultimo commit: $(git log -1 --oneline)"
echo "    Working tree: $(git status --short | wc -l) cambios pendientes"
echo ""

echo "===================================================="
echo "  Listo para cierre"
echo "===================================================="
echo ""
echo "Siguiente: commit + push de los archivos nuevos"
echo ""
echo "  cd $DIR_FRONT"
echo "  git add ."
echo "  git commit -m 'docs: bitacora de conexion backend + configuracion Netlify'"
echo "  git push"
echo ""
