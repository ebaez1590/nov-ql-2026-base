# Design

## Context

La lógica del sorteo ya está separada de la interfaz (`src/raffle/` puro, `src/ui/` con el DOM) y la aleatoriedad se inyecta con `RandomGenerator`, así que la lógica se puede probar sin trucos. `AGENTS.md` ya fija Vitest + jsdom, ESLint y Prettier, y prohíbe `any`, `.skip`/`.only` y desactivar reglas. Ver `proposal.md` (Why) y `specs/integracion-continua/spec.md`.

## Goals / Non-Goals

**Goals:**
- Una prueba (o más) por escenario de `participantes`, `sorteo` y `tema-visual` que sea automatizable.
- Pruebas deterministas y rápidas (sin navegador real ni esperas reales).
- Un único workflow de CI reutilizable por el despliegue del Ticket #5.

**Non-Goals:**
- Pruebas end-to-end en un navegador real.
- Medir porcentaje de cobertura de código.
- Desplegar la aplicación (Ticket #5).

## Decisions

### Vitest con jsdom, configurado en `vite.config.ts`
- **Por qué:** comparte la configuración y el transformador de Vite, entiende TypeScript sin pasos extra y jsdom permite montar `index.html` y probar la interfaz como la ve el usuario.
- **Alternativa descartada:** Jest, que necesita configuración adicional para ESM y TypeScript con Vite.

### Dos niveles de prueba
- **Lógica (`src/raffle/*.test.ts`):** funciones puras con un `RandomGenerator` determinista (devuelve una secuencia fija). Cubre validaciones, inmutabilidad y que el ganador pertenece a la lista para cada índice posible.
- **Interfaz (`src/ui/app.test.ts`):** carga el `<body>` de `index.html` en jsdom, monta la app con un generador falso e interactúa por textos y roles (escribir, "Agregar", "Sortear ganador"), según `AGENTS.md`.

### El color se prueba analizando `style.css`
Una prueba lee `src/style.css`, comprueba que `--green-600` vale `#16a34a` en `:root`, que `.btn-primary` y `.result` usan `var(--green-600)`, y que fuera de `:root` no hay colores literales.
- **Por qué:** jsdom no resuelve variables CSS en `getComputedStyle`, y la especificación `tema-visual` está escrita en términos de la hoja de estilos.
- **Alternativa descartada:** Vitest en modo navegador con Playwright; más fiel, pero agrega un navegador a CI y dependencias pesadas.

### ESLint (flat config) + typescript-eslint + Prettier
- `npm run lint` ejecuta `eslint .` y `prettier --check .`, para que un solo comando cubra ambos.
- `npm run format` ejecuta `prettier --write .`.
- Reglas destacadas: `@typescript-eslint/no-explicit-any` como error, `eslint-config-prettier` para evitar conflictos de estilo.

### Workflow `.github/workflows/ci.yml`
- Disparadores: `push` (todas las ramas), `pull_request` hacia `main` y `workflow_call` (para que el despliegue lo reutilice).
- Un job en `ubuntu-latest` con Node 22 (mínimo del proyecto): `npm ci` → `npm run lint` → `npm test` → `npm run build`.
- Cualquier paso que falle hace fallar el job.

## Risks / Trade-offs

- [Analizar `style.css` no detecta un color sobrescrito por otra regla más específica] → La prueba de «sin colores literales fuera de `:root`» reduce ese riesgo; si hiciera falta más fidelidad se puede migrar a pruebas en navegador.
- [Un `push` y su pull request ejecutan el workflow dos veces] → Aceptado por simplicidad; es lo que pide el ticket.
- [Agregar 8 dependencias de desarrollo] → Están previstas en `AGENTS.md`; se pide aprobación explícita antes de instalarlas.

## Migration Plan

Tras fusionar, GitHub Actions empieza a ejecutar el workflow automáticamente; no hay pasos manuales. Para revertir, basta con eliminar `.github/workflows/ci.yml`.
