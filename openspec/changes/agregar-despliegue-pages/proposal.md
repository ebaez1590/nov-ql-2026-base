# Proposal

## Why

Hoy para usar el selector de ganadores hay que clonar el repositorio e instalar Node. Queremos que cualquiera lo use desde el navegador, y que cada cambio aprobado en `main` llegue publicado sin pasos manuales y solo si pasó las verificaciones.

## What Changes

- Workflow de GitHub Actions que, en cada `push` a `main`, ejecuta el linter y las pruebas del Ticket #2 y, solo si pasan, construye la app y la publica en GitHub Pages.
- Los pull requests y los push a otras ramas no despliegan; solo ejecutan las verificaciones.
- Vite se configura para que la app funcione publicada en el subdirectorio `https://ebaez1590.github.io/nov-ql-2026-base/`.
- GitHub Pages se habilita en el repositorio con GitHub Actions como origen.
- El `README.md` incluye el enlace a la aplicación publicada.

## Capabilities

### New Capabilities

- `despliegue`: publicación automática de la aplicación en GitHub Pages desde `main`, condicionada a que pasen las verificaciones.

### Modified Capabilities

<!-- Ninguna: integracion-continua no cambia de comportamiento; el despliegue la reutiliza. -->

## Impact

- **Nuevos archivos:** `.github/workflows/deploy.yml`.
- **Modificados:** `vite.config.ts` (ruta base), `README.md` (enlace).
- **Configuración del repositorio:** habilitar Pages con origen «GitHub Actions» (acción visible en GitHub; se confirma antes de hacerla).
- **Dependencias:** ninguna nueva; se usan las acciones oficiales `actions/configure-pages`, `actions/upload-pages-artifact` y `actions/deploy-pages`.
- **Prerrequisitos:** `agregar-pruebas-y-ci` archivado (workflow `ci.yml` reutilizable); para cumplir «funciona igual que en local» con podio y cuenta regresiva, conviene desplegar después de `agregar-podio` y `agregar-cuenta-regresiva`.
