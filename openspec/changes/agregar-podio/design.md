# Design

## Context

`src/raffle/draw.ts` hoy elige un solo ganador con `pickWinner(participants, random)` y `MIN_PARTICIPANTS = 2`. La interfaz (`src/ui/app.ts`) depende del contrato `RaffleService`. Las pruebas del Ticket #2 cubren el sorteo de un ganador. Ver `proposal.md` y `specs/sorteo/spec.md`.

## Goals / Non-Goals

**Goals:**
- Generalizar el sorteo a N ganadores sin romper el caso N = 1.
- Mantener la lógica pura y la aleatoriedad inyectada (`AGENTS.md`).

**Non-Goals:**
- Más de 3 ganadores o cantidades personalizadas.
- Guardar el historial de podios.
- Animaciones del podio más allá de la existente del panel.

## Decisions

### Selección sin reemplazo con Fisher–Yates parcial
`pickWinners(participants, count, random)` copia la lista y hace N pasos de Fisher–Yates usando `random.nextInt`. Devuelve los N primeros en orden de lugar (índice 0 = 1.er lugar).
- **Por qué:** garantiza ganadores distintos y la misma probabilidad para cada participante en cada lugar; es determinista con un generador falso.
- **Alternativa descartada:** sortear repetidamente y descartar repetidos; su duración no está acotada y complica las pruebas.

### Cantidad de ganadores como tipo cerrado
`type WinnerCount = 1 | 2 | 3` exportado desde `src/raffle/`, y `minParticipantsFor(count) = count + 1`. `canDraw(participants, count)` y `drawWinners(participants, count)` reemplazan a las versiones de un solo ganador en `RaffleService`; el error `not-enough-participants` incluye `minimum` y `count` para construir el mensaje.
- **Por qué:** el compilador impide cantidades inválidas, y la interfaz no calcula reglas por su cuenta.

### Selector de cantidad con botones de opción
Un grupo de tres radios "1", "2", "3" (con `fieldset`/`legend` "Cantidad de ganadores"), con estilo de botones segmentados. El valor por defecto es 1.
- **Por qué:** muestra todas las opciones a la vez, es accesible sin código extra y solo permite valores válidos.
- **Alternativa descartada:** `<select>`; oculta las opciones y no aporta nada con solo tres valores.

### Mensaje de participantes insuficientes siempre visible
Un párrafo bajo el botón "Sortear ganador" muestra el mensaje mientras falten participantes (también como `title` del botón) y se oculta cuando alcanzan. El texto se arma en `src/ui/messages.ts` con plural correcto: «ganador» si N = 1, «ganadores» si N > 1.
- **Por qué:** decisión del equipo: nunca se puede iniciar un sorteo inválido y el motivo es visible.

### Presentación del resultado
El panel de resultado tiene dos variantes:
- N = 1: el mismo panel actual («¡Tenemos un ganador!» + nombre).
- N ≥ 2: título «¡Tenemos un podio!» y una lista ordenada (`<ol>`) de lugares en orden 1, 2, 3 para lectores de pantalla; CSS grid con `order`/áreas coloca el 1.º al centro (escalón más alto), el 2.º a la izquierda y el 3.º a la derecha. Con N = 2 la columna derecha queda vacía.
- Colores de los escalones desde variables verdes de `:root`.

## Risks / Trade-offs

- [Cambiar la firma de `RaffleService` rompe las pruebas existentes] → Se actualizan en el mismo grupo de tareas que el cambio de lógica.
- [El orden visual (2-1-3) difiere del orden del DOM (1-2-3)] → Intencional para accesibilidad; las pruebas verifican el orden del DOM y las clases de posición.
- [Con 0 participantes se muestra un mensaje desde el inicio] → Aceptado por la decisión de mostrar siempre el motivo.
