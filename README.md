# Vanilla To-Do List (Refactorizado)

Aplicación de lista de tareas construida con **JavaScript Vanilla**, **HTML5** y **CSS3**, usando **Vite** como bundler. Este repositorio es un fork de [Kodigo-academic/vanilla-to-do-list](https://github.com/Kodigo-academic/vanilla-to-do-list), refactorizado aplicando **principios SOLID** y **Clean Code** como parte de una actividad de formación en ingeniería de software.

> La funcionalidad original de la aplicación (crear, completar, eliminar y filtrar tareas, con persistencia en `localStorage`) se mantiene intacta. Lo que cambió fue la organización interna del código.

## Funcionalidades

- Crear tareas con identificador único y marca de tiempo.
- Marcar tareas como completadas / reactivarlas.
- Eliminar tareas.
- Filtrar por: Todas, Activas, Completadas.
- Contador de estadísticas (total, completadas, activas).
- Persistencia automática en `localStorage`.

## Tecnologías

| Componente | Tecnología |
|---|---|
| Bundler | Vite |
| Lógica | JavaScript (ESM) |
| Markup | HTML5 |
| Estilos | CSS3 (Flexbox) |
| Persistencia | `localStorage` (Web Storage API) |

## Instalación y ejecución

\`\`\`bash
git clone https://github.com/TU-USUARIO/vanilla-to-do-list.git
cd vanilla-to-do-list
npm install
npm run dev
\`\`\`

Build de producción:

\`\`\`bash
npm run build
\`\`\`

## Estructura del proyecto

\`\`\`
src/
├── constants/
│   └── filters.js               # Constantes de filtros (ALL, ACTIVE, COMPLETED)
├── models/
│   └── Task.js                  # Fábrica de la entidad Task
├── repositories/
│   ├── ITaskRepository.js       # Contrato de persistencia (abstracción)
│   └── LocalStorageTaskRepository.js  # Implementación sobre localStorage
├── services/
│   └── TaskService.js           # Lógica de negocio (CRUD y filtrado de tareas)
├── ui/
│   ├── TaskListRenderer.js      # Renderizado de la lista de tareas
│   ├── StatsRenderer.js         # Renderizado del contador de estadísticas
│   ├── FilterController.js      # Manejo de los botones de filtro
│   └── TaskFormController.js    # Manejo del input y botón de agregar tarea
├── utils/
│   └── validators.js            # Validación del texto de una tarea
├── style.css
└── main.js                      # Composition root: conecta e inyecta los módulos
\`\`\`

## Arquitectura y decisiones de diseño

La versión original concentraba toda la lógica (estado, validación, persistencia, DOM y eventos) en un único archivo (`main.js`) y en funciones que hacían más de una cosa a la vez. La refactorización separó el código en capas con responsabilidades claras:

- **`models/`**: define qué es una tarea.
- **`repositories/`**: encapsula el acceso a datos detrás de una interfaz (`ITaskRepository`), de modo que `localStorage` podría reemplazarse por otra fuente (una API, `sessionStorage`, IndexedDB) sin tocar la lógica de negocio.
- **`services/`**: contiene las reglas de negocio (agregar, completar, eliminar, filtrar, calcular estadísticas), sin conocer nada del DOM.
- **`ui/`**: cada clase renderiza o controla una única parte de la interfaz (lista, estadísticas, filtros, formulario).
- **`main.js`**: es el único punto donde se instancian y conectan (inyectan) todas las dependencias.

### Aplicación de los principios SOLID

| Principio | Cómo se aplicó |
|---|---|
| **SRP** (Responsabilidad única) | Cada módulo tiene un único motivo de cambio: `TaskService` solo cambia si cambian las reglas de negocio, `TaskListRenderer` solo si cambia cómo se pinta la lista, etc. |
| **OCP** (Abierto/cerrado) | `FilterController` funciona con cualquier cantidad de botones `.filter-btn` sin modificar código existente; `TaskService` puede extenderse (nuevos métodos) sin alterar los ya probados. |
| **LSP** (Sustitución de Liskov) | Cualquier clase que implemente el contrato de `ITaskRepository` (`getAll()` / `save()`) puede sustituir a `LocalStorageTaskRepository` sin romper `TaskService`. |
| **ISP** (Segregación de interfaces) | Las clases de UI exponen solo los métodos que sus consumidores necesitan (`render()`), sin forzar implementaciones innecesarias. |
| **DIP** (Inversión de dependencias) | `TaskService` depende de la abstracción `ITaskRepository`, no de `localStorage` directamente. La dependencia concreta se inyecta desde `main.js`. |

### Prácticas de Clean Code aplicadas

- Nombres descriptivos para funciones, clases y variables (`TaskService`, `getFilteredTasks`, `validateTaskText`).
- Funciones y métodos pequeños, con una sola tarea cada uno.
- Eliminación de duplicación (lógica de filtrado, guardado y renderizado centralizada en un solo lugar cada una).
- Manejo de errores explícito (`try/catch` al leer y escribir en `localStorage`, validación de entrada desacoplada de la UI).
- Comparaciones estrictas (`===`) y uso de métodos de array (`filter`, `find`, `map`) en lugar de bucles manuales.
- Eventos gestionados con `addEventListener` en lugar de sobrescribir `onclick`.
- Constantes en lugar de *magic strings* para los filtros.

## Historial de cambios

El historial de commits documenta la refactorización de forma incremental y atómica (formato `tipo: descripción`), por ejemplo:

\`\`\`
refactor: extraer constantes de filtros para eliminar magic strings
refactor: extraer creación de Task a su propio módulo (SRP)
refactor: extraer validación de entrada de tarea (manejo de errores)
refactor: aplicar DIP - crear ITaskRepository y LocalStorageTaskRepository
refactor: aplicar SRP - extraer TaskService desacoplado del DOM
refactor: aplicar SRP - separar renderizado de lista y estadísticas
refactor: aplicar OCP/SRP - separar controladores de filtro y formulario
refactor: reescribir main.js como composition root orquestando módulos
\`\`\`

## Créditos

Proyecto original: [Kodigo-academic/vanilla-to-do-list](https://github.com/Kodigo-academic/vanilla-to-do-list)