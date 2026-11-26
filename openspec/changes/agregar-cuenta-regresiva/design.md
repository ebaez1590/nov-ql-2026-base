# Design

## Context

Después del podio, al presionar "Sortear ganador" la interfaz llama a `raffle.drawWinners` y muestra el resultado de inmediato. `AGENTS.md` exige inyectar dependencias y pruebas deterministas, y el ticket prohíbe esperar 3 segundos reales en las pruebas. Ver `proposal.md` y `specs/sorteo/spec.md`.

## Goals / Non-Goals

**Goals:**
- Cuenta 3-2-1 con un segundo entre números, probada sin tiempo real.
- Bloqueo completo de los controles durante la cuenta.

**Non-Goals:**
- Sonido o animaciones adicionales.
- Cancelar la cuenta una vez iniciada.
- Configurar la duración o el número inicial desde la interfaz.

## Decisions

### Los ganadores se eligen al iniciar la cuenta
Al presionar el botón se llama a `drawWinners` primero; si falla, no hay cuenta (además el botón ya está deshabilitado en ese caso). Si tiene éxito, se guarda el resultado y se revela al terminar la cuenta.
- **Por qué:** cumple R3 de forma directa y, como los datos están bloqueados, elegir al inicio o al final da el mismo resultado.

### Temporizador inyectado
`mountApp` recibe una dependencia `wait(ms): Promise<void>`. `src/main.ts` la implementa con `setTimeout`; las pruebas pasan una implementación controlada o usan `vi.useFakeTimers()` con `vi.advanceTimersByTimeAsync(1000)`.
- **Por qué:** sigue la regla de inyección de `AGENTS.md` y hace la cuenta determinista.
- **Alternativa descartada:** llamar a `setTimeout` directo en `src/ui/`; funciona con fake timers pero esconde la dependencia del tiempo.

### Flujo de la cuenta en un módulo propio
`src/ui/countdown.ts` exporta `runCountdown({ from: 3, intervalMs: 1000, wait, onTick })`, que llama a `onTick(3)`, espera, `onTick(2)`, espera, `onTick(1)`, espera y termina. La app usa un estado `isDrawing` para deshabilitar todos los controles y volver a habilitarlos al terminar.
- **Por qué:** se prueba por separado de la interfaz y mantiene `app.ts` legible.

### Presentación
Un elemento `#countdown` con `aria-live="assertive"` y fuente grande en el verde primario. Se oculta el resultado al iniciar y se oculta la cuenta al mostrar el resultado.

## Risks / Trade-offs

- [El usuario podría cambiar de pestaña y los navegadores ralentizan los temporizadores] → Aceptado; la cuenta puede durar algo más, pero el resultado no cambia.
- [Las pruebas de interfaz existentes esperaban el resultado inmediato] → Se adaptan para avanzar el temporizador falso en el mismo grupo de tareas.
- [Un error inesperado durante la cuenta podría dejar los controles deshabilitados] → El flujo usa `try/finally` para volver a habilitar los controles.
