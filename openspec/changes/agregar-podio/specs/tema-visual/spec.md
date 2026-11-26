# Spec Delta

## ADDED Requirements

### Requirement: Podio en el color base
El podio SHALL usar el verde primario: los escalones del podio usan `var(--green-600)` (o tonos de la paleta verde de `:root`) como color de fondo.

#### Scenario: Escalones verdes
- **WHEN** se revisa la regla de estilo de los escalones del podio
- **THEN** su fondo usa `var(--green-600)` o una variable verde de `:root`
