# Proposal

## Why

El resultado aparece en cuanto se presiona "Sortear ganador" y el momento pasa sin emoción. Una cuenta regresiva 3… 2… 1… antes de revelar a los ganadores agrega suspenso al sorteo en los eventos.

## What Changes

- Al presionar "Sortear ganador" se muestra una cuenta regresiva grande, en el color base verde: 3, 2 y 1, con un segundo entre cada número.
- Al terminar la cuenta (un segundo después del 1) se muestran los ganadores: el panel de un ganador o el podio, según la cantidad elegida.
- Durante la cuenta regresiva: el botón "Sortear ganador" está deshabilitado, no se puede agregar, quitar ni vaciar participantes, no se puede cambiar la cantidad de ganadores y el resultado anterior deja de mostrarse.
- Un sorteo inválido (participantes insuficientes) nunca muestra la cuenta regresiva: el botón sigue deshabilitado y el motivo visible, como define el podio.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `sorteo`: cuenta regresiva previa al resultado, bloqueo de los datos y del botón durante la cuenta, y los resultados (ganador y podio) se muestran al terminarla.
- `tema-visual`: la cuenta regresiva usa el verde primario.

## Impact

- **Código:** `src/ui/` (flujo de la cuenta regresiva y bloqueo de controles), `index.html`, `src/style.css`; `src/main.ts` crea el temporizador real que se inyecta.
- **Pruebas:** nuevas pruebas con temporizador falso (sin esperas reales); las pruebas de interfaz que esperaban el resultado inmediato se adaptan para avanzar la cuenta.
- **Dependencias:** ninguna nueva.
- **Prerrequisito:** `agregar-podio` archivado.
