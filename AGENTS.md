# AGENTS.md

## Proyecto

Selector de ganadores para sorteos: el usuario agrega participantes y la app elige un único ganador al azar.

- Solo frontend, sin backend ni persistencia.
- Vite + TypeScript estricto, sin frameworks de UI (DOM directo).
- Pruebas con Vitest (+ jsdom para la UI). Linter ESLint y formatter Prettier.
- Color base de la interfaz: **verde**.
- Las especificaciones viven en `openspec/specs/` y se escriben en español.

## Comandos

| Acción | Comando |
| --- | --- |
| Instalar | `npm install` |
| Ejecutar | `npm run dev` → http://127.0.0.1:5173 |
| Compilar (incluye chequeo de tipos) | `npm run build` |
| Pruebas | `npm test` |
| Linter | `npm run lint` |
| Formato | `npm run format` |

`npm test`, `npm run lint` y `npm run format` se configuran en el Ticket #2; hasta entonces, la verificación mínima es `npm run build`.

## Estructura

```
src/
  raffle/   lógica pura del sorteo y de los participantes (sin DOM)
  ui/       render y manejo de eventos del DOM
  main.ts   solo crea las dependencias y conecta raffle/ con ui/
  style.css estilos; colores definidos en :root
```

- `src/raffle/` no importa nada de `src/ui/` ni usa `document`, `window` ni `crypto`.
- `src/main.ts` no contiene lógica de negocio ni manipula el DOM directamente.
- Las pruebas van junto al archivo que prueban: `foo.ts` → `foo.test.ts`.

## Diseño del código

- **TypeScript estricto:** `"strict": true` en `tsconfig.json`. Prohibido `any`; usa `unknown` y estrecha el tipo.
- **Una responsabilidad por módulo:** la lógica del sorteo no conoce la interfaz; la interfaz no decide quién gana.
- **Aleatoriedad inyectada:** la función que elige al ganador recibe un `RandomGenerator` como parámetro. Solo `src/main.ts` crea la implementación real (basada en `crypto.getRandomValues`). Nadie más llama a `Math.random()` ni a `crypto`.
- **Depender de tipos:** la UI recibe la lógica a través de tipos o interfaces exportados desde `src/raffle/`, no de implementaciones concretas.
- **Inmutabilidad:** las funciones de `src/raffle/` no mutan sus argumentos; devuelven arreglos u objetos nuevos.
- **Errores explícitos:** las operaciones inválidas (nombre vacío, nombre repetido, sortear con menos de 2 participantes) devuelven un resultado tipado o lanzan un error con nombre; no fallan en silencio.
- **Colores:** todos los colores se definen como variables CSS en `:root` de `src/style.css`. Fuera de ese bloque no hay colores literales (`#hex`, `rgb()`, nombres).
- **Nombres:** identificadores y archivos en inglés (`camelCase` para variables y funciones, `PascalCase` para tipos). Los textos visibles para el usuario están en español.
- **Seguridad del DOM:** los nombres de participantes se insertan con `textContent`, nunca con `innerHTML`.

## Pruebas

- Todo cambio de comportamiento incluye pruebas automáticas que lo cubren.
- La lógica de `src/raffle/` se prueba con unidades puras, inyectando un `RandomGenerator` determinista.
- La UI se prueba con Vitest + jsdom, a través de lo que ve el usuario (textos, botones), no de detalles internos.
- Las pruebas verifican lo que dicen las especificaciones de `openspec/specs/`, no lo que hace el código.
- Una tarea **no está terminada** si `npm run build`, `npm test` o `npm run lint` fallan.

## Lo que la IA no debe hacer

- **No agregar dependencias** de npm sin preguntar antes.
- **No modificar** `.github/workflows/`, `vite.config.ts`, `tsconfig.json` ni la configuración de ESLint o Prettier sin que se pida.
- **No hacer commit, push ni abrir PRs** si no se pide explícitamente.
- **No desactivar reglas para que algo pase:** nada de `any`, `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, ni pruebas saltadas (`.skip`, `.only`) o borradas.
- **No cambiar el comportamiento** de la app en un refactor; si hace falta, se pregunta primero.
- **No cambiar el color base** de la interfaz.
