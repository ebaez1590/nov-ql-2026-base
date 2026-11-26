# Tasks

## 1. Preparación

- [x] 1.1 Confirmar que el cambio `documentar-selector-de-ganadores` está archivado: `npx openspec list --specs` muestra `participantes`, `sorteo` y `tema-visual`
- [x] 1.2 Pedir aprobación e instalar las dependencias de desarrollo (`vitest`, `jsdom`, `eslint`, `@eslint/js`, `typescript-eslint`, `globals`, `prettier`, `eslint-config-prettier`); verificar que `npm ls` las lista sin errores

## 2. Pruebas

- [x] 2.1 Configurar Vitest con entorno jsdom en `vite.config.ts` y el script `test` (`vitest run`) en `package.json`; verificar que `npm test` corre y termina con código 0
- [x] 2.2 Escribir `src/raffle/participants.test.ts` para la spec `participantes` (agregar, recortar espacios, vacío, repetido sin distinguir mayúsculas, quitar, no mutar); verificar que `npm test` pasa
- [x] 2.3 Escribir `src/raffle/draw.test.ts` para la spec `sorteo` con un generador determinista (mínimo de 2, un único ganador, el ganador pertenece a la lista para cada índice posible); verificar que `npm test` pasa
- [x] 2.4 Escribir `src/ui/app.test.ts` que monte `index.html` en jsdom y cubra agregar, mensajes de error, contador, quitar, vaciar, botón deshabilitado, panel "¡Tenemos un ganador!" y ocultar el resultado al cambiar la lista; verificar que `npm test` pasa
- [x] 2.5 Escribir `src/style.test.ts` para la spec `tema-visual` (`--green-600` = `#16a34a`, botón y panel usan la variable, sin colores literales fuera de `:root`); verificar que `npm test` pasa
- [x] 2.6 Romper a propósito la selección del ganador y el color base, verificar que `npm test` falla indicando las pruebas correctas, y deshacer el cambio

## 3. Linter y formato

- [x] 3.1 Crear `eslint.config.js` (typescript-eslint, `no-explicit-any` como error, `eslint-config-prettier`), `.prettierrc.json` y `.prettierignore`; agregar scripts `lint` (`eslint . && prettier --check .`), `format` y `format:check`; verificar que `npm run lint` pasa tras `npm run format`
- [x] 3.2 Introducir a propósito un `any` y un archivo sin formato, verificar que `npm run lint` falla, y deshacer el cambio

## 4. CI en GitHub Actions

- [x] 4.1 Crear `.github/workflows/ci.yml` con disparadores `push`, `pull_request` hacia `main` y `workflow_call`, y pasos `npm ci`, `npm run lint`, `npm test`, `npm run build` con Node 22; verificar tras hacer push que `gh run list` muestra la ejecución en verde
- [x] 4.2 Verificar que una prueba rota hace fallar los pasos del workflow: por decisión del equipo se comprueba en local (sin subir ramas con pruebas rotas) que `npm test` y `npm run lint` terminan con código distinto de 0 ante una prueba rota o un error del linter (ver 2.6 y 3.2); como el workflow ejecuta esos mismos comandos y GitHub Actions falla el job ante cualquier paso con código distinto de 0, el workflow queda en rojo

## 5. Documentación

- [x] 5.1 Agregar al `README.md` una sección «Pruebas y calidad» con `npm test`, `npm run lint` y `npm run format`, y actualizar `AGENTS.md` si algún comando cambió; verificar que los comandos documentados se ejecutan tal como están escritos

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` y verificar que existe `openspec/specs/integracion-continua/`.
