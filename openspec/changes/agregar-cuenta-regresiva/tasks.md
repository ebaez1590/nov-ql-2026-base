# Tasks

## 1. Cuenta regresiva

- [ ] 1.1 Crear `src/ui/countdown.ts` con `runCountdown` y un `wait` inyectable, y `countdown.test.ts` que verifique la secuencia 3-2-1 y la espera de 1000 ms entre pasos con un temporizador falso; verificar que `npm test` pasa en menos de un segundo
- [ ] 1.2 Inyectar `wait` en `mountApp` y crear la implementación real con `setTimeout` en `src/main.ts`; verificar que `npm run build` pasa

## 2. Integración en la interfaz

- [ ] 2.1 Agregar `#countdown` (con `aria-live`) en `index.html`; al presionar "Sortear ganador", elegir ganadores, ocultar el resultado anterior, correr la cuenta y mostrar el resultado al final; probar en `app.test.ts` con fake timers la secuencia, que no hay ganadores antes de 3 s y que aparecen a los 3 s; verificar que `npm test` pasa
- [ ] 2.2 Deshabilitar durante la cuenta el botón de sorteo, el formulario, los botones de quitar, "Vaciar lista" y el selector de cantidad, y habilitarlos al terminar (`try/finally`); probar el bloqueo y el desbloqueo; verificar que `npm test` pasa
- [ ] 2.3 Probar que con participantes insuficientes no se puede iniciar la cuenta y se ve el mensaje; adaptar las pruebas previas que esperaban el resultado inmediato; verificar que `npm test` pasa
- [ ] 2.4 Estilo grande de la cuenta en `src/style.css` usando variables verdes de `:root` y extender `style.test.ts`; verificar que `npm test` pasa y revisar en `npm run dev` que se ve 3 → 2 → 1 → ganadores

## 3. Verificación integral

- [ ] 3.1 Ejecutar `npm run lint`, `npm test` y `npm run build`; recorrer en `npm run dev` el ejemplo del ticket con 1 y con 3 ganadores; verificar que todo pasa
- [ ] 3.2 Hacer push y verificar con `gh run list` que el CI pasa

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` y verificar que `openspec/specs/sorteo/spec.md` incluye R1, R2 y R3 de la cuenta regresiva.
