# Proposal

## Why

El selector de ganadores se construyó con *vibe coding* (Reto #1) y luego se refactorizó con las reglas de `AGENTS.md`, pero su comportamiento no está escrito en ningún lado: `openspec/specs/` está vacío. Sin una especificación, las pruebas del Ticket #2 no tienen contra qué verificar y los cambios futuros (podio, cuenta regresiva) no tienen una base acordada que modificar.

## What Changes

- Se documenta el comportamiento **actual** de la aplicación como especificaciones de OpenSpec, sin agregar ni cambiar funcionalidades.
- Se crean tres capabilities: gestión de participantes, sorteo del ganador y tema visual (color base verde).
- Se agrega a `AGENTS.md` la regla de que todo cambio nuevo se especifica primero con OpenSpec (propuesta → implementación → archivo).
- No hay cambios en el código de la aplicación. Si al revisar la especificación se detecta una diferencia con el código, se corrige la especificación para reflejar el código, salvo que el equipo decida lo contrario.

## Capabilities

### New Capabilities

- `participantes`: agregar, validar, listar, quitar y vaciar los participantes del sorteo.
- `sorteo`: condiciones para habilitar el sorteo, selección aleatoria de un único ganador y presentación del resultado.
- `tema-visual`: color base verde de la interfaz y cómo se define y aplica.

### Modified Capabilities

<!-- Ninguna: no existen especificaciones previas. -->

## Impact

- **Nuevos archivos:** `openspec/specs/participantes/spec.md`, `openspec/specs/sorteo/spec.md` y `openspec/specs/tema-visual/spec.md` (al archivar el cambio).
- **Modificado:** `AGENTS.md` (nueva regla de flujo con OpenSpec).
- **Código de la aplicación (`src/`, `index.html`):** sin cambios.
- **Dependencias:** ninguna nueva.
- **Tickets siguientes:** el Ticket #2 (pruebas y CI) escribirá sus pruebas contra estas especificaciones.
