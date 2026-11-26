# Tasks

## 1. Lógica de varios ganadores

- [ ] 1.1 Agregar `WinnerCount`, `minParticipantsFor` y `pickWinners(participants, count, random)` (Fisher–Yates parcial) en `src/raffle/`, con pruebas en `draw.test.ts` que verifiquen N ganadores distintos, todos de la lista, el orden de lugares con un generador determinista y el error con `minimum = N + 1`; verificar que `npm test` pasa
- [ ] 1.2 Actualizar `RaffleService` (`canDraw` y `drawWinners` con cantidad) y adaptar las pruebas existentes del sorteo de un ganador; verificar que `npm test` y `npm run build` pasan

## 2. Interfaz

- [ ] 2.1 Agregar el selector de cantidad (radios 1, 2, 3 en un `fieldset`, por defecto 1) en `index.html` y `src/ui/`, que oculte el resultado al cambiar; probar en `app.test.ts` el valor por defecto, el cambio de cantidad y que oculta el resultado; verificar que `npm test` pasa
- [ ] 2.2 Mostrar el mensaje de participantes insuficientes con plural correcto (`src/ui/messages.ts`) y deshabilitar el botón según N + 1; probar los escenarios de 0, 1, 3 participantes con N = 1, 2, 3 y el de subir la cantidad; verificar que `npm test` pasa
- [ ] 2.3 Mostrar el podio para N = 2 y 3 («¡Tenemos un podio!», `<ol>` en orden 1-2-3, posiciones centro/izquierda/derecha, medallas) y mantener el panel actual para N = 1; probar ambas variantes y que con N = 2 no hay 3.er lugar; verificar que `npm test` pasa
- [ ] 2.4 Estilos del podio en `src/style.css` usando solo variables verdes de `:root`, y extender `style.test.ts` para verificarlo; verificar que `npm test` pasa y revisar visualmente en `npm run dev`

## 3. Verificación integral

- [ ] 3.1 Ejecutar `npm run lint`, `npm test` y `npm run build`; recorrer en `npm run dev` el ejemplo del ticket (5 participantes, 3 ganadores) y el flujo de 1 ganador del Reto #1; verificar que todo pasa y se ve como se especifica
- [ ] 3.2 Hacer push y verificar con `gh run list` que el CI pasa

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` y verificar que `openspec/specs/sorteo/spec.md` incluye R1, R2, R3 y las decisiones.
