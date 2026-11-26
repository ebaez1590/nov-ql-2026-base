# Proposal

## Why

En los eventos de la comunidad se entrega más de un premio, pero hoy el sorteo solo elige un ganador. Queremos poder elegir 1, 2 o 3 ganadores y mostrarlos como un podio.

## What Changes

- El usuario elige cuántos ganadores quiere sortear: 1, 2 o 3 (por defecto 1).
- El mínimo de participantes pasa a depender de esa cantidad: se necesitan al menos N + 1 participantes para sortear N ganadores. Con 1 ganador sigue siendo 2, como hoy.
- Cuando faltan participantes, el botón "Sortear ganador" sigue deshabilitado y además se muestra visible el motivo: «Se necesitan al menos {N + 1} participantes para sortear {N} ganador/ganadores.» (con plural correcto).
- El sorteo elige N ganadores distintos, todos de la lista y con la misma probabilidad.
- Con 1 ganador el resultado se ve igual que hoy («¡Tenemos un ganador!»). Con 2 o 3 se muestra «¡Tenemos un podio!» con el podio: 1.er lugar al centro y más alto, 2.º a la izquierda, 3.er a la derecha, usando el color base verde.
- Cambiar la lista o la cantidad de ganadores oculta el resultado anterior.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

- `sorteo`: cantidad de ganadores, mínimo de participantes en función de esa cantidad con mensaje visible, selección de varios ganadores distintos, presentación en podio y ocultar el resultado al cambiar la cantidad.
- `tema-visual`: el podio usa el verde primario.

## Impact

- **Código:** `src/raffle/` (selección de N ganadores, validación de cantidad), `src/ui/` (selector de cantidad, mensaje, podio), `index.html`, `src/style.css`.
- **Pruebas:** nuevas pruebas de lógica y de interfaz para R1, R2 y R3; las pruebas existentes del sorteo se adaptan al mínimo N + 1 y a la presentación con N = 1.
- **Dependencias:** ninguna nueva.
- **Prerrequisitos:** `documentar-selector-de-ganadores` y `agregar-pruebas-y-ci` archivados (specs base y CI disponibles).
