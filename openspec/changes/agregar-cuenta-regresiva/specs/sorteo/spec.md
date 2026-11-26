# Spec Delta

## ADDED Requirements

### Requirement: Cuenta regresiva antes del resultado
Al presionar "Sortear ganador" con un sorteo válido, el sistema SHALL mostrar una cuenta regresiva de forma grande y visible: muestra 3 de inmediato, 2 al pasar un segundo y 1 al pasar dos segundos. Al pasar tres segundos la cuenta desaparece y se muestran los ganadores. Cada número se anuncia a tecnologías de asistencia.

#### Scenario: Secuencia de la cuenta
- **GIVEN** hay 5 participantes y la cantidad es 1
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** se muestra "3"
- **AND** al pasar 1 segundo se muestra "2"
- **AND** al pasar 2 segundos se muestra "1"

#### Scenario: Ganadores al terminar
- **GIVEN** se inició la cuenta regresiva
- **WHEN** pasan 3 segundos desde que se presionó "Sortear ganador"
- **THEN** la cuenta regresiva deja de mostrarse
- **AND** se muestran los ganadores

#### Scenario: Sin ganadores antes de tiempo
- **GIVEN** se inició la cuenta regresiva
- **WHEN** todavía no han pasado 3 segundos
- **THEN** no se muestra ningún ganador

### Requirement: Bloqueo durante la cuenta regresiva
Mientras la cuenta regresiva está en curso, el sistema MUST impedir iniciar otro sorteo y modificar los datos del sorteo: el botón "Sortear ganador", el campo y el botón para agregar, los botones para quitar, "Vaciar lista" y el selector de cantidad de ganadores están deshabilitados. Al terminar la cuenta vuelven a su estado normal.

#### Scenario: No se puede sortear de nuevo
- **GIVEN** la cuenta regresiva está en curso
- **THEN** el botón "Sortear ganador" está deshabilitado

#### Scenario: No se pueden modificar los datos
- **GIVEN** la cuenta regresiva está en curso
- **THEN** no se puede agregar, quitar ni vaciar participantes
- **AND** no se puede cambiar la cantidad de ganadores

#### Scenario: Controles habilitados al terminar
- **GIVEN** la cuenta regresiva terminó y se muestran los ganadores
- **THEN** se puede volver a sortear y modificar los datos

### Requirement: Ocultar el resultado anterior al iniciar la cuenta
Al iniciar la cuenta regresiva, el sistema SHALL dejar de mostrar el resultado del sorteo anterior, si existía.

#### Scenario: Nuevo sorteo con resultado previo
- **GIVEN** se muestra el resultado de un sorteo anterior
- **WHEN** el usuario presiona "Sortear ganador"
- **THEN** el resultado anterior deja de mostrarse mientras dura la cuenta regresiva

### Requirement: Sin cuenta regresiva en un sorteo inválido
Si el sorteo no se puede realizar por participantes insuficientes, el sistema MUST NOT mostrar la cuenta regresiva; se muestra directamente el mensaje de participantes insuficientes.

#### Scenario: Participantes insuficientes
- **GIVEN** la lista contiene 2 participantes y la cantidad es 2
- **THEN** no se puede iniciar la cuenta regresiva
- **AND** se muestra "Se necesitan al menos 3 participantes para sortear 2 ganadores."

## MODIFIED Requirements

### Requirement: Mostrar el podio
Con 2 o 3 ganadores, al terminar la cuenta regresiva el sistema SHALL mostrar el título "¡Tenemos un podio!" y los ganadores en un podio: 🥇 1.er lugar al centro y más alto, 🥈 2.º lugar a la izquierda y 🥉 3.er lugar a la derecha. Con 2 ganadores no se muestra el lugar del 3.º. Los lugares se anuncian a tecnologías de asistencia en orden 1.º, 2.º, 3.º.

#### Scenario: Podio de tres
- **GIVEN** hay 5 participantes y la cantidad es 3
- **WHEN** el usuario presiona "Sortear ganador" y termina la cuenta regresiva
- **THEN** se muestra "¡Tenemos un podio!"
- **AND** el 1.er lugar aparece al centro y más alto que los demás, con 🥇
- **AND** el 2.º lugar aparece a la izquierda con 🥈 y el 3.er lugar a la derecha con 🥉

#### Scenario: Podio de dos
- **GIVEN** hay 3 participantes y la cantidad es 2
- **WHEN** el usuario presiona "Sortear ganador" y termina la cuenta regresiva
- **THEN** se muestra "¡Tenemos un podio!" con el 1.er lugar al centro y el 2.º a la izquierda
- **AND** no se muestra ningún 3.er lugar

#### Scenario: Un ganador no usa podio
- **GIVEN** la cantidad es 1
- **WHEN** el usuario presiona "Sortear ganador" y termina la cuenta regresiva
- **THEN** no se muestra el podio ni "¡Tenemos un podio!"

### Requirement: Mostrar el ganador de forma destacada
Con 1 ganador, al terminar la cuenta regresiva el sistema SHALL mostrar el resultado en un panel destacado con el título "¡Tenemos un ganador!" y el nombre del ganador en tamaño grande. Cada nuevo sorteo reemplaza el resultado anterior y se anuncia a tecnologías de asistencia.

#### Scenario: Resultado visible tras sortear
- **GIVEN** la cantidad es 1
- **WHEN** el usuario presiona "Sortear ganador" con 2 o más participantes y termina la cuenta regresiva
- **THEN** se muestra el panel con "¡Tenemos un ganador!" y el nombre del ganador

#### Scenario: Sorteo repetido
- **GIVEN** ya se mostró un resultado
- **WHEN** el usuario presiona "Sortear ganador" otra vez y termina la cuenta regresiva
- **THEN** el resultado anterior se reemplaza por el nuevo
