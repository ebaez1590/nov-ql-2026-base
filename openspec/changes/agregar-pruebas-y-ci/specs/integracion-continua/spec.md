# Spec Delta

## Purpose

Protege cada cambio del proyecto con pruebas automáticas, linter y formato que se ejecutan con un solo comando en local y automáticamente en GitHub Actions.

## ADDED Requirements

### Requirement: Pruebas con un solo comando
El proyecto SHALL ejecutar todas las pruebas automáticas con `npm test`, que termina con código de salida distinto de 0 si alguna prueba falla.

#### Scenario: Todas las pruebas pasan
- **WHEN** se ejecuta `npm test` sobre el código sin errores
- **THEN** el comando termina con código 0

#### Scenario: Una prueba falla
- **GIVEN** se rompe a propósito el comportamiento del sorteo
- **WHEN** se ejecuta `npm test`
- **THEN** el comando termina con un código distinto de 0 e indica qué prueba falló

### Requirement: Cobertura mínima de las especificaciones
Las pruebas MUST verificar, como mínimo: agregar participantes; que el sorteo elige un único ganador; que el ganador siempre es uno de los participantes; que no se puede sortear sin suficientes participantes; y que el color base verde se aplica a la interfaz.

#### Scenario: Revisión de la suite
- **WHEN** se revisan las pruebas del proyecto
- **THEN** existe al menos una prueba para cada uno de los cinco comportamientos listados

### Requirement: Pruebas deterministas
Las pruebas MUST dar el mismo resultado en cada ejecución: no dependen del azar real ni de esperas de tiempo real.

#### Scenario: Ejecuciones repetidas
- **WHEN** se ejecuta `npm test` varias veces seguidas sin cambiar el código
- **THEN** todas las ejecuciones dan el mismo resultado

### Requirement: Linter y formato con un solo comando
El proyecto SHALL revisar el código con `npm run lint` y aplicar el formato con `npm run format`. `npm run lint` termina con código distinto de 0 si hay errores del linter o archivos sin el formato acordado.

#### Scenario: Código con un error del linter
- **GIVEN** un archivo de `src/` usa `any`
- **WHEN** se ejecuta `npm run lint`
- **THEN** el comando termina con un código distinto de 0 e indica el archivo

#### Scenario: Código sin formato
- **GIVEN** un archivo de `src/` no respeta el formato
- **WHEN** se ejecuta `npm run lint`
- **THEN** el comando termina con un código distinto de 0
- **AND** `npm run format` corrige el archivo

### Requirement: Verificación automática en GitHub Actions
El repositorio SHALL tener un workflow de GitHub Actions que ejecuta el linter, las pruebas y el build en cada `push` a cualquier rama y en cada pull request hacia `main`.

#### Scenario: Push a una rama
- **WHEN** se hace `push` a cualquier rama
- **THEN** el workflow se ejecuta

#### Scenario: Pull request hacia main
- **WHEN** se abre o actualiza un pull request hacia `main`
- **THEN** el workflow se ejecuta y su resultado aparece en el pull request

### Requirement: El workflow falla si algo falla
El workflow MUST terminar en estado fallido si el linter, alguna prueba o el build fallan, y en estado exitoso solo si todos pasan.

#### Scenario: Prueba rota en un pull request
- **GIVEN** un pull request rompe una prueba
- **WHEN** termina el workflow
- **THEN** el pull request muestra el workflow como fallido y el log indica la prueba que falló

#### Scenario: Todo pasa
- **GIVEN** el linter, las pruebas y el build pasan
- **WHEN** termina el workflow
- **THEN** el pull request muestra el workflow como exitoso

### Requirement: Documentación de los comandos
El `README.md` SHALL explicar cómo ejecutar localmente las pruebas, el linter y el formato.

#### Scenario: Leer el README
- **WHEN** una persona nueva lee el `README.md`
- **THEN** encuentra los comandos `npm test`, `npm run lint` y `npm run format` con una descripción de cada uno
