# Spec Delta

## Purpose

Garantiza que la interfaz use el color base verde elegido por el equipo de desarrollo y que ese color no lo pueda cambiar el usuario final.

## ADDED Requirements

### Requirement: Color base verde
La interfaz SHALL usar el verde como color base. El verde primario `#16a34a` se define en la hoja de estilos como la variable `--green-600` de `:root`, y como mínimo el botón "Sortear ganador" habilitado y el panel del ganador la usan como color de fondo o como parte de su degradado.

#### Scenario: Verde primario definido
- **WHEN** se revisa el bloque `:root` de la hoja de estilos
- **THEN** la variable `--green-600` vale `#16a34a`

#### Scenario: Botón principal en verde
- **WHEN** se revisa la regla de estilo del botón principal
- **THEN** su fondo usa `var(--green-600)`

#### Scenario: Panel del ganador en verde
- **WHEN** se revisa la regla de estilo del panel del ganador
- **THEN** su fondo es un degradado que incluye `var(--green-600)`

### Requirement: Colores definidos en un solo lugar
Todos los colores de la interfaz MUST definirse como variables CSS en `:root`, y el resto de las reglas de estilo MUST usar esas variables, sin colores literales.

#### Scenario: Revisión de la hoja de estilos
- **WHEN** se revisan las reglas de estilo fuera de `:root`
- **THEN** no contienen colores literales (hexadecimales, `rgb()` ni nombres de color)

### Requirement: El usuario final no elige el color
La interfaz MUST NOT ofrecer al usuario final ninguna opción para cambiar el color base.

#### Scenario: Sin selector de color
- **WHEN** el usuario usa la aplicación
- **THEN** no existe ningún control para cambiar el color de la interfaz
