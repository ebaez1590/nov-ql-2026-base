# Design

## Context

El Ticket #2 deja `.github/workflows/ci.yml` con disparador `workflow_call`, que ejecuta `npm ci`, `npm run lint`, `npm test` y `npm run build`. El repositorio `ebaez1590/nov-ql-2026-base` es público y Pages todavía no está habilitado. Vite publica hoy con base `/`, que no funciona en un subdirectorio. Ver `proposal.md` y `specs/despliegue/spec.md`.

## Goals / Non-Goals

**Goals:**
- Desplegar solo desde `main` y solo tras verificaciones exitosas.
- Reutilizar el workflow de CI en vez de duplicar sus pasos.

**Non-Goals:**
- Entornos de previsualización por pull request.
- Dominio propio.
- Rollback manual (el sitio anterior se mantiene si el despliegue no ocurre).

## Decisions

### Workflow `deploy.yml` que reutiliza `ci.yml`
- Disparador: `push` a `main` (y `workflow_dispatch` para relanzarlo a mano).
- Job `verify`: `uses: ./.github/workflows/ci.yml`.
- Job `deploy`: `needs: verify`; `actions/checkout`, `actions/setup-node` (Node 22), `npm ci`, `npm run build`, `actions/configure-pages`, `actions/upload-pages-artifact` con `dist/`, `actions/deploy-pages`.
- Permisos mínimos: `contents: read`, `pages: write`, `id-token: write`; entorno `github-pages` para mostrar la URL publicada.
- `concurrency: { group: pages, cancel-in-progress: false }` para no cortar un despliegue en curso.
- **Por qué:** `needs` garantiza que no se despliega si falla la verificación, y el CI vive en un solo lugar.
- **Alternativa descartada:** agregar un job de despliegue con `if:` dentro de `ci.yml`; mezcla responsabilidades y facilita desplegar por error desde un pull request.

### Ruta base relativa en Vite
`base: './'` en `vite.config.ts`.
- **Por qué:** la app es una sola página sin rutas; con rutas relativas funciona igual en `127.0.0.1:5173`, en `vite preview` y en `/nov-ql-2026-base/`, sin atar la configuración al nombre del repositorio.
- **Alternativa descartada:** `base: '/nov-ql-2026-base/'`; se rompe si se renombra o se hace fork del repositorio.

### Habilitar Pages con la CLI
`gh api -X POST repos/ebaez1590/nov-ql-2026-base/pages -f build_type=workflow` (o *Settings → Pages → Source: GitHub Actions*). Es una acción visible en GitHub, así que se confirma antes de ejecutarla.

## Risks / Trade-offs

- [En `main`, el `push` ejecuta `ci.yml` dos veces: su propio disparador y como parte de `deploy.yml`] → Aceptado; el costo es bajo y mantiene los workflows independientes.
- [El build se hace dos veces (en la verificación y en el despliegue)] → Aceptado por simplicidad; alternativa futura: subir `dist/` como artefacto desde la verificación.
- [Pages no habilitado hace fallar `deploy-pages`] → Tarea explícita para habilitarlo antes del primer despliegue.

## Migration Plan

1. Habilitar Pages con origen GitHub Actions.
2. Fusionar en `main`; el primer `push` despliega.
3. Para retirar el sitio: deshabilitar Pages y eliminar `deploy.yml`.
