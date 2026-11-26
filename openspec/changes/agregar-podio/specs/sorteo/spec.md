# Spec Delta

## ADDED Requirements

### Requirement: Elegir la cantidad de ganadores
El sistema SHALL permitir al usuario elegir cuántos ganadores sortear entre 1, 2 o 3, con 1 como valor por defecto. No se puede elegir otra cantidad.

#### Scenario: Valor por defecto
- **WHEN** el usuario abre la aplicación
- **THEN** la cantidad de ganadores seleccionada es 1

#### Scenario: Cambiar la cantidad
- **WHEN** el usuario elige 3 ganadores
- **THEN** la cantidad de ganadores seleccionada es 3

#### Scenario: Solo opciones válidas
- **WHEN** el usuario revisa las opciones de cantidad
- **THEN** solo están disponibles 1, 2 y 3

### Requirement: Mostrar el podio
Con 2 o 3 ganadores, el sistema SHALL mostrar el título "¡Tenemos un podio!" y los ganadores en un podio: 🥇 1.er lugar al centro y más alto, 🥈 2.º lugar a la izquierda y 🥉 3.er lugar a la derecha. Con 2 ganadores no se muestra el lugar del 3.º. Los lugares se anuncian a tecnologías de asistencia en orden 1.º, 2.º, 3.º.

#### Scenario: Podio de tres
- **GIVEN** hay 5 participantes y la cantidad es 3
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** se muestra "¡Tenemos un podio!"
- **AND** el 1.er lugar aparece al centro y más alto que los demás, con 🥇
- **AND** el 2.º lugar aparece a la izquierda con 🥈 y el 3.er lugar a la derecha con 🥉

#### Scenario: Podio de dos
- **GIVEN** hay 3 participantes y la cantidad es 2
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** se muestra "¡Tenemos un podio!" con el 1.er lugar al centro y el 2.º a la izquierda
- **AND** no se muestra ningún 3.er lugar

#### Scenario: Un ganador no usa podio
- **GIVEN** la cantidad es 1
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** no se muestra el podio ni "¡Tenemos un podio!"

## MODIFIED Requirements

### Requirement: Mínimo de participantes para sortear
El sistema MUST permitir el sorteo solo cuando hay al menos N + 1 participantes, donde N es la cantidad de ganadores elegida. Mientras falten participantes, el botón "Sortear ganador" está deshabilitado y se muestra visible el mensaje «Se necesitan al menos {N + 1} participantes para sortear {N} ganador.» para N = 1, o «… {N} ganadores.» para N = 2 o 3.

#### Scenario: Sin participantes
- **GIVEN** no hay participantes y la cantidad es 1
- **THEN** el botón "Sortear ganador" está deshabilitado
- **AND** se muestra "Se necesitan al menos 2 participantes para sortear 1 ganador."

#### Scenario: Un solo participante
- **GIVEN** la lista contiene solo "Ana" y la cantidad es 1
- **THEN** el botón "Sortear ganador" está deshabilitado

#### Scenario: Dos o más participantes
- **GIVEN** la lista contiene "Ana" y "Pedro" y la cantidad es 1
- **THEN** el botón "Sortear ganador" está habilitado
- **AND** no se muestra el mensaje de participantes insuficientes

#### Scenario: Insuficientes para tres ganadores
- **GIVEN** la lista contiene 3 participantes y la cantidad es 3
- **THEN** el botón "Sortear ganador" está deshabilitado
- **AND** se muestra "Se necesitan al menos 4 participantes para sortear 3 ganadores."

#### Scenario: Justo el mínimo para dos ganadores
- **GIVEN** la lista contiene 3 participantes y la cantidad es 2
- **THEN** el botón "Sortear ganador" está habilitado

#### Scenario: Subir la cantidad deja participantes insuficientes
- **GIVEN** la lista contiene 3 participantes, la cantidad es 2 y el botón está habilitado
- **WHEN** el usuario cambia la cantidad a 3
- **THEN** el botón "Sortear ganador" queda deshabilitado
- **AND** se muestra "Se necesitan al menos 4 participantes para sortear 3 ganadores."

### Requirement: Elegir ganadores al azar
Al presionar "Sortear ganador", el sistema SHALL elegir exactamente N ganadores, donde N es la cantidad elegida. Todos MUST ser participantes de la lista y distintos entre sí. Cada participante tiene la misma probabilidad de obtener cualquier lugar y el resultado puede variar entre sorteos.

#### Scenario: El ganador pertenece a la lista
- **GIVEN** la lista contiene "Ana", "Pedro", "María", "Luis" y "Sofía" y la cantidad es 1
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** se muestra un único nombre como ganador
- **AND** ese nombre es uno de los cinco participantes

#### Scenario: Varios ganadores distintos
- **GIVEN** la lista contiene 5 participantes y la cantidad es 3
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** se muestran exactamente 3 ganadores
- **AND** los 3 son participantes de la lista y ninguno se repite

#### Scenario: Sortear no modifica la lista
- **GIVEN** la lista contiene varios participantes
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** la lista de participantes no cambia

### Requirement: Mostrar el ganador de forma destacada
Con 1 ganador, el sistema SHALL mostrar el resultado en un panel destacado con el título "¡Tenemos un ganador!" y el nombre del ganador en tamaño grande. Cada nuevo sorteo reemplaza el resultado anterior y se anuncia a tecnologías de asistencia.

#### Scenario: Resultado visible tras sortear
- **GIVEN** la cantidad es 1
- **WHEN** el usuario presiona "Sortear ganador" con 2 o más participantes
- **THEN** se muestra el panel con "¡Tenemos un ganador!" y el nombre del ganador

#### Scenario: Sorteo repetido
- **GIVEN** ya se mostró un resultado
- **WHEN** el usuario presiona "Sortear ganador" otra vez
- **THEN** el resultado anterior se reemplaza por el nuevo

### Requirement: Ocultar el resultado al cambiar los datos del sorteo
El sistema SHALL ocultar el resultado del sorteo cada vez que cambia la lista de participantes (agregar, quitar o vaciar) o la cantidad de ganadores, para que no se muestre un resultado de datos distintos.

#### Scenario: Agregar tras un sorteo
- **GIVEN** se muestra un resultado
- **WHEN** el usuario agrega un participante
- **THEN** el resultado deja de mostrarse

#### Scenario: Quitar tras un sorteo
- **GIVEN** se muestra un resultado
- **WHEN** el usuario quita a un participante
- **THEN** el resultado deja de mostrarse

#### Scenario: Cambiar la cantidad tras un sorteo
- **GIVEN** se muestra un resultado
- **WHEN** el usuario cambia la cantidad de ganadores
- **THEN** el resultado deja de mostrarse

#### Scenario: Intento fallido de agregar
- **GIVEN** se muestra un resultado
- **WHEN** el usuario intenta agregar un nombre vacío o repetido
- **THEN** el resultado se sigue mostrando

## RENAMED Requirements

- FROM: `### Requirement: Elegir un único ganador al azar`
- TO: `### Requirement: Elegir ganadores al azar`

- FROM: `### Requirement: Ocultar el resultado al cambiar la lista`
- TO: `### Requirement: Ocultar el resultado al cambiar los datos del sorteo`
