# Design

## Context

La aplicación ya existe y ya sigue las reglas de `AGENTS.md`: lógica pura en `src/raffle/`, interfaz en `src/ui/`, colores en variables CSS dentro de `:root` de `src/style.css`. No hay especificaciones previas. Ver `proposal.md` (Why).

Este cambio documenta comportamiento existente, así que la fuente de verdad para redactar los requisitos es el código actual, no una idea nueva de la app.

## Goals / Non-Goals

**Goals:**
- Que cada requisito y escenario describa algo que la app hace hoy y que se pueda convertir en una prueba en el Ticket #2.
- Que la organización de las especificaciones permita que los tickets siguientes modifiquen solo la capability que les corresponde.

**Non-Goals:**
- Cambiar código de la aplicación o su comportamiento.
- Escribir pruebas automáticas o configurar CI (Ticket #2).
- Especificar detalles internos (nombres de funciones, módulos o librerías).

## Decisions

### Tres capabilities en lugar de una
Se separa en `participantes`, `sorteo` y `tema-visual`.
- **Por qué:** los tickets #3 (podio) y #4 (cuenta regresiva) solo tocan el sorteo; con capabilities separadas, sus deltas modifican `sorteo` sin reescribir requisitos ajenos.
- **Alternativa descartada:** una sola capability `selector-de-ganadores`. Es más simple hoy, pero se convierte en un archivo general donde todos los cambios se cruzan.

### El mínimo para sortear es 2 participantes
La especificación documenta lo que hace el código: el sorteo requiere al menos 2 participantes.
- **Por qué:** el ticket pide describir el comportamiento actual; con 1 participante no hay sorteo real.
- **Alternativa descartada:** mínimo 1, que es lo que podría sugerir el Ticket #2 («no se puede sortear sin participantes»). El requisito con mínimo 2 ya cubre ese caso (0 participantes queda deshabilitado), así que no hay conflicto.

### Incluir comportamientos que el ticket no pide explícitamente
Se especifican también los nombres repetidos sin distinguir mayúsculas, el recorte de espacios, quitar y vaciar la lista, y ocultar el resultado al cambiar la lista.
- **Por qué:** si no están en la especificación, el Ticket #2 no los prueba y un cambio futuro podría eliminarlos sin que nadie lo note.

### El color se especifica con un valor verificable
El requisito de color fija el verde primario `#16a34a` como la variable `--green-600` de `:root` y exige que el botón principal y el panel del ganador la usen, en vez de decir solo «la interfaz es verde».
- **Por qué:** una prueba puede analizar la hoja de estilos y comprobarlo sin un navegador real (jsdom no resuelve variables CSS); «verde» a secas no se puede verificar.
- **Alternativa descartada:** especificar todos los tonos de la paleta. Ataría la especificación a detalles de diseño que pueden cambiar sin cambiar el comportamiento.

### Regla de OpenSpec en `AGENTS.md`
Se agrega una sección corta de flujo de trabajo que exige especificar cada cambio nuevo con OpenSpec antes de implementarlo y escribir las especificaciones en español.

## Risks / Trade-offs

- [La especificación podría describir algo distinto a lo que hace el código] → En la implementación se verifica cada escenario contra la app en ejecución; si no coincide, se corrige la especificación (no el código), salvo decisión explícita del equipo.
- [El valor exacto del verde fija un detalle visual] → Cambiar el tono principal requiere un cambio de OpenSpec que modifique `tema-visual`; es intencional, porque el color base es un requisito del ticket.
- [Algunos escenarios (accesibilidad, ausencia de selector de color, sin persistencia) son difíciles de automatizar] → Se pueden verificar manualmente o con pruebas de UI simples en el Ticket #2.
