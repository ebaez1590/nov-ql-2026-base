# Spec Delta

## Purpose

Permite armar la lista de personas que participan en el sorteo: agregarlas, validarlas, verlas, quitarlas y vaciar la lista.

## ADDED Requirements

### Requirement: Agregar participantes
El sistema SHALL permitir agregar un participante escribiendo su nombre y confirmando con el botón "Agregar" o con la tecla Enter. El nombre se guarda sin los espacios del inicio y del final, y se agrega al final de la lista.

#### Scenario: Agregar varios participantes
- **GIVEN** la lista de participantes está vacía
- **WHEN** el usuario agrega "Ana", "Pedro", "María", "Luis" y "Sofía"
- **THEN** la lista muestra los cinco nombres en ese orden
- **AND** el contador de participantes muestra 5

#### Scenario: Se quitan los espacios sobrantes
- **WHEN** el usuario agrega "  Ana  "
- **THEN** la lista muestra "Ana"

#### Scenario: El campo se limpia tras agregar
- **WHEN** el usuario agrega un nombre válido
- **THEN** el campo de texto queda vacío y mantiene el foco
- **AND** se borra cualquier mensaje de error anterior

### Requirement: Rechazar nombres vacíos
El sistema MUST rechazar un nombre vacío o formado solo por espacios, sin modificar la lista, y mostrar el mensaje "Escribe un nombre.".

#### Scenario: Nombre vacío
- **WHEN** el usuario intenta agregar "   "
- **THEN** la lista no cambia
- **AND** se muestra el mensaje "Escribe un nombre."

### Requirement: Rechazar nombres repetidos
El sistema MUST rechazar un nombre que ya está en la lista, sin distinguir mayúsculas de minúsculas, sin modificar la lista, y mostrar el mensaje `"<nombre>" ya está en la lista.` con el nombre tal como se escribió (sin espacios sobrantes).

#### Scenario: Nombre repetido con otras mayúsculas
- **GIVEN** la lista contiene "Ana"
- **WHEN** el usuario intenta agregar "ana"
- **THEN** la lista sigue teniendo un solo participante "Ana"
- **AND** se muestra el mensaje `"ana" ya está en la lista.`

### Requirement: Mostrar la lista de participantes
El sistema SHALL mostrar cada participante, el total de participantes y, cuando la lista está vacía, el mensaje "Todavía no hay participantes.".

#### Scenario: Lista vacía
- **GIVEN** no hay participantes
- **THEN** el contador muestra 0
- **AND** se muestra "Todavía no hay participantes."
- **AND** no se muestra la opción "Vaciar lista"

#### Scenario: Lista con participantes
- **GIVEN** hay al menos un participante
- **THEN** no se muestra "Todavía no hay participantes."
- **AND** se muestra la opción "Vaciar lista"

### Requirement: Quitar un participante
El sistema SHALL permitir quitar a un participante individual mediante un botón junto a su nombre, con la etiqueta accesible "Quitar a <nombre>".

#### Scenario: Quitar a un participante
- **GIVEN** la lista contiene "Ana", "Pedro" y "María"
- **WHEN** el usuario quita a "Pedro"
- **THEN** la lista muestra "Ana" y "María"
- **AND** el contador muestra 2

### Requirement: Vaciar la lista
El sistema SHALL permitir quitar a todos los participantes a la vez con la opción "Vaciar lista".

#### Scenario: Vaciar la lista
- **GIVEN** la lista tiene participantes
- **WHEN** el usuario elige "Vaciar lista"
- **THEN** la lista queda vacía y el contador muestra 0

### Requirement: Sin persistencia
El sistema SHALL mantener los participantes solo durante la sesión actual de la página; no se guardan entre recargas.

#### Scenario: Recargar la página
- **GIVEN** la lista tiene participantes
- **WHEN** el usuario recarga la página
- **THEN** la lista está vacía
