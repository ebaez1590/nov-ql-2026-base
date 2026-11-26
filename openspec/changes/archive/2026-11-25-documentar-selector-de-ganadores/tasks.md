# Tasks

## 1. Verificar las especificaciones contra la aplicación

- [x] 1.1 Recorrer en la app (`npm run dev`) cada escenario de `specs/participantes/spec.md` y confirmar que coincide; si alguno no coincide, corregir la especificación (no el código) y anotar la diferencia
- [x] 1.2 Recorrer en la app cada escenario de `specs/sorteo/spec.md` (mínimo de 2, ganador único de la lista, panel destacado, resultado oculto al cambiar la lista) y confirmar que coincide; corregir la especificación si no
- [x] 1.3 Verificar `specs/tema-visual/spec.md`: `--green-600` vale `#16a34a` en `:root`, el botón "Sortear ganador" y el panel del ganador usan `var(--green-600)` y `src/style.css` no tiene colores literales fuera de `:root`
- [x] 1.4 Confirmar que no se modificó código de la aplicación: `git diff --stat` no muestra cambios en `src/` ni en `index.html`, y `npm run build` pasa

## 2. Regla de OpenSpec en AGENTS.md

- [x] 2.1 Agregar a `AGENTS.md` una sección de flujo de trabajo que indique que todo cambio nuevo se especifica primero con OpenSpec (`/openspec-propose` → `/openspec-apply-change` → `/openspec-archive-change`) y que las especificaciones viven en `openspec/specs/` en español; verificar que el texto aparece en `AGENTS.md`

## 3. Validación del cambio

- [x] 3.1 Ejecutar `npx openspec validate documentar-selector-de-ganadores --strict` y verificar que pasa sin errores ni advertencias

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` para crear `openspec/specs/participantes/`, `openspec/specs/sorteo/` y `openspec/specs/tema-visual/`.
- Verificar con `npx openspec list --specs` que existen las tres especificaciones.
