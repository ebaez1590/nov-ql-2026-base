# Spec Delta

## Purpose

Publica automáticamente el selector de ganadores en GitHub Pages con cada cambio en `main` que pasa las verificaciones, para que cualquiera lo use desde el navegador.

## ADDED Requirements

### Requirement: Despliegue automático desde main
Cada `push` a la rama `main` SHALL iniciar un workflow de GitHub Actions que construye la aplicación y la publica en GitHub Pages, sin pasos manuales.

#### Scenario: Fusión de un pull request
- **WHEN** se fusiona un pull request en `main`
- **THEN** se ejecuta el workflow de despliegue
- **AND** al terminar con éxito, la nueva versión está disponible en `https://ebaez1590.github.io/nov-ql-2026-base/`

### Requirement: Solo se despliega una versión verificada
El despliegue MUST ocurrir solo si el linter, las pruebas y el build pasan en ese mismo commit. Si alguno falla, el workflow falla y la versión publicada anteriormente sigue disponible sin cambios.

#### Scenario: Pruebas fallidas en main
- **GIVEN** un `push` a `main` rompe una prueba
- **WHEN** se ejecuta el workflow de despliegue
- **THEN** el paso de verificación falla y el despliegue no se ejecuta
- **AND** el sitio publicado sigue mostrando la versión anterior

#### Scenario: Verificaciones exitosas
- **GIVEN** el linter, las pruebas y el build pasan
- **WHEN** se ejecuta el workflow de despliegue
- **THEN** la aplicación se publica

### Requirement: Los pull requests no despliegan
Los pull requests y los `push` a ramas distintas de `main` MUST NOT desplegar; solo ejecutan las verificaciones de integración continua.

#### Scenario: Pull request abierto
- **WHEN** se abre o actualiza un pull request hacia `main`
- **THEN** se ejecutan las verificaciones
- **AND** no se ejecuta ningún despliegue

#### Scenario: Push a otra rama
- **WHEN** se hace `push` a una rama distinta de `main`
- **THEN** no se ejecuta ningún despliegue

### Requirement: La versión publicada funciona igual que en local
La aplicación publicada SHALL cargar sus estilos y scripts desde el subdirectorio del repositorio y comportarse igual que en local: participantes, color base, podio y cuenta regresiva.

#### Scenario: Abrir la aplicación publicada
- **WHEN** una persona abre `https://ebaez1590.github.io/nov-ql-2026-base/`
- **THEN** la aplicación se muestra con el color base verde y sin errores de carga de recursos
- **AND** puede agregar participantes, sortear con cuenta regresiva y ver el ganador o el podio

### Requirement: Enlace en el README
El `README.md` SHALL incluir el enlace a la aplicación publicada.

#### Scenario: Leer el README
- **WHEN** una persona lee el `README.md`
- **THEN** encuentra el enlace `https://ebaez1590.github.io/nov-ql-2026-base/`

### Requirement: Sin secretos en el código
El despliegue MUST NOT requerir tokens ni secretos guardados en el repositorio; usa los permisos que GitHub Actions otorga al workflow.

#### Scenario: Revisión del workflow
- **WHEN** se revisan los archivos del repositorio
- **THEN** no contienen tokens ni credenciales
