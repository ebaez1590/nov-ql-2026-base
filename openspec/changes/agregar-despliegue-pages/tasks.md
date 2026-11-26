# Tasks

## 1. Preparación

- [ ] 1.1 Confirmar que `agregar-pruebas-y-ci` está archivado y que `.github/workflows/ci.yml` tiene el disparador `workflow_call`; verificar con `grep workflow_call .github/workflows/ci.yml`
- [ ] 1.2 Configurar `base: './'` en `vite.config.ts`; verificar con `npm run build` que `dist/index.html` referencia los recursos con rutas relativas (`./assets/...`) y que `npm run preview` carga la app

## 2. Workflow de despliegue

- [ ] 2.1 Crear `.github/workflows/deploy.yml` (push a `main` y `workflow_dispatch`, job `verify` que usa `ci.yml`, job `deploy` con `needs: verify`, permisos mínimos, entorno `github-pages` y `concurrency`); verificar que no contiene tokens y que el YAML es válido con `gh workflow view deploy.yml` tras el push
- [ ] 2.2 Confirmar con el equipo y habilitar GitHub Pages con origen GitHub Actions (`gh api -X POST repos/ebaez1590/nov-ql-2026-base/pages -f build_type=workflow`); verificar con `gh api repos/ebaez1590/nov-ql-2026-base/pages` que `build_type` es `workflow`

## 3. Primer despliegue y verificación

- [ ] 3.1 Fusionar en `main` y verificar con `gh run watch` que `verify` y `deploy` terminan en verde
- [ ] 3.2 Abrir `https://ebaez1590.github.io/nov-ql-2026-base/` y verificar que carga sin errores de recursos, con color verde, participantes, podio y cuenta regresiva funcionando
- [ ] 3.3 En una rama de prueba, abrir un pull request y verificar con `gh run list` que solo corre `ci.yml` y no hay despliegue

## 4. Documentación

- [ ] 4.1 Agregar al `README.md` el enlace a la aplicación publicada y una nota sobre cuándo se despliega; verificar que el enlace abre la app

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` y verificar que existe `openspec/specs/despliegue/`.
