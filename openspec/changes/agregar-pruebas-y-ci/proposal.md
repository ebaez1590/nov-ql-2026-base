# Proposal

## Why

Hoy nada avisa si un cambio rompe el selector de ganadores: no hay pruebas automáticas, ni linter, ni CI. Antes de agregar el podio y la cuenta regresiva necesitamos guard rails que verifiquen las especificaciones de `openspec/specs/` en cada cambio.

## What Changes

- Pruebas automáticas con Vitest que verifican los escenarios de las especificaciones `participantes`, `sorteo` y `tema-visual`, ejecutables con `npm test`.
- Linter (ESLint) y formatter (Prettier) configurados, ejecutables con `npm run lint` y `npm run format`.
- Workflow de GitHub Actions que ejecuta el linter, la verificación de formato, las pruebas y el build en cada `push` y en cada pull request hacia `main`, y falla si alguno falla.
- Sección del `README.md` que explica cómo ejecutar pruebas y linter localmente.
- No cambia el comportamiento de la aplicación.

## Capabilities

### New Capabilities

- `integracion-continua`: comandos locales de calidad (pruebas, linter, formato) y verificaciones automáticas en GitHub Actions que protegen cada cambio.

### Modified Capabilities

<!-- Ninguna: participantes, sorteo y tema-visual no cambian; solo se prueban. -->

## Impact

- **Dependencias de desarrollo nuevas:** `vitest`, `jsdom`, `eslint`, `@eslint/js`, `typescript-eslint`, `globals`, `prettier`, `eslint-config-prettier`. Previstas en `AGENTS.md`; se instalan con aprobación del equipo al aplicar este cambio.
- **Nuevos archivos:** pruebas `*.test.ts` junto a los módulos de `src/`, `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `.github/workflows/ci.yml`.
- **Modificados:** `package.json` (scripts `test`, `lint`, `format`, `format:check`), `vite.config.ts` (configuración de Vitest), `README.md`.
- **Prerrequisito:** el cambio `documentar-selector-de-ganadores` debe estar archivado para que existan las especificaciones que se prueban.
- **Tickets siguientes:** el despliegue (Ticket #5) reutiliza este workflow como condición para publicar.
