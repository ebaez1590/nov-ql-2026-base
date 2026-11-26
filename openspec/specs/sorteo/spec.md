# sorteo Specification

## Purpose

Define cuándo se puede sortear, cómo se elige al azar a un único ganador entre los participantes y cómo se muestra el resultado.

## Requirements

### Requirement: Mínimo de participantes para sortear
El sistema MUST permitir el sorteo solo cuando hay al menos 2 participantes. Con menos de 2, el botón "Sortear ganador" está deshabilitado y muestra la indicación "Agrega al menos 2 participantes".

#### Scenario: Sin participantes
- **GIVEN** no hay participantes
- **THEN** el botón "Sortear ganador" está deshabilitado
- **AND** su indicación dice "Agrega al menos 2 participantes"

#### Scenario: Un solo participante
- **GIVEN** la lista contiene solo "Ana"
- **THEN** el botón "Sortear ganador" está deshabilitado

#### Scenario: Dos o más participantes
- **GIVEN** la lista contiene "Ana" y "Pedro"
- **THEN** el botón "Sortear ganador" está habilitado

### Requirement: Elegir un único ganador al azar
Al presionar "Sortear ganador", el sistema SHALL elegir exactamente un ganador, que MUST ser uno de los participantes de la lista. Cada participante tiene la misma probabilidad de ser elegido y el resultado puede variar entre sorteos.

#### Scenario: El ganador pertenece a la lista
- **GIVEN** la lista contiene "Ana", "Pedro", "María", "Luis" y "Sofía"
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** se muestra un único nombre como ganador
- **AND** ese nombre es uno de los cinco participantes

#### Scenario: Sortear no modifica la lista
- **GIVEN** la lista contiene varios participantes
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** la lista de participantes no cambia

### Requirement: Mostrar el ganador de forma destacada
El sistema SHALL mostrar el resultado en un panel destacado con el título "¡Tenemos un ganador!" y el nombre del ganador en tamaño grande. Cada nuevo sorteo reemplaza el resultado anterior y se anuncia a tecnologías de asistencia.

#### Scenario: Resultado visible tras sortear
- **WHEN** el usuario presiona "Sortear ganador" con 2 o más participantes
- **THEN** se muestra el panel con "¡Tenemos un ganador!" y el nombre del ganador

#### Scenario: Sorteo repetido
- **GIVEN** ya se mostró un ganador
- **WHEN** el usuario presiona "Sortear ganador" otra vez
- **THEN** el panel muestra el nombre del nuevo ganador

### Requirement: Ocultar el resultado al cambiar la lista
El sistema SHALL ocultar el resultado del sorteo cada vez que la lista de participantes cambia (agregar, quitar o vaciar), para que no se muestre un ganador de una lista distinta.

#### Scenario: Agregar tras un sorteo
- **GIVEN** se muestra un ganador
- **WHEN** el usuario agrega un participante
- **THEN** el panel del ganador deja de mostrarse

#### Scenario: Quitar tras un sorteo
- **GIVEN** se muestra un ganador
- **WHEN** el usuario quita a un participante
- **THEN** el panel del ganador deja de mostrarse

#### Scenario: Intento fallido de agregar
- **GIVEN** se muestra un ganador
- **WHEN** el usuario intenta agregar un nombre vacío o repetido
- **THEN** el panel del ganador se sigue mostrando
