# CodeCollab - Especificaciones Técnicas

## 📋 Descripción del Proyecto
CodeCollab es una plataforma de entrevistas técnicas en tiempo real que permite a entrevistadores y candidatos compartir un editor de código, comunicarse por video y trabajar en ejercicios de programación de forma colaborativa.

## 🎯 Objetivos Principales
- Crear una experiencia de entrevista técnica fluida y profesional
- Reducir la fricción en el proceso de contratación técnica
- Ofrecer herramientas específicas para evaluar habilidades de programación

## 🛠 Stack Tecnológico
### Frontend
- **React 18** con hooks y context API
- **Socket.io-client** para comunicación en tiempo real
- **WebRTC** (SimplePeer) para videollamadas
- **Monaco Editor** (editor de VS Code) para editor de código
- **Chakra UI** para componentes de interfaz

### Backend
- **Node.js** con Express
- **Socket.io** para WebSockets
- **PostgreSQL** para base de datos
- **JWT** para autenticación

### Infraestructura
- **Redis** para manejo de sesiones y rooms
- **Docker** para containerización

## 🗄️ Esquema de Base de Datos

### Tabla: users
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| email | VARCHAR(255) UNIQUE | Email del usuario |
| password_hash | VARCHAR(255) | Hash de contraseña |
| name | VARCHAR(100) | Nombre completo |
| avatar_url | VARCHAR(255) | URL de avatar |
| role | ENUM('interviewer', 'candidate') | Rol en la plataforma |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### Tabla: interviews
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| room_code | VARCHAR(12) UNIQUE | Código de sala para unirse |
| title | VARCHAR(255) | Título de la entrevista |
| interviewer_id | UUID (FK → users) | Usuario entrevistador |
| candidate_id | UUID (FK → users) | Usuario candidato |
| scheduled_time | TIMESTAMP | Hora programada |
| duration | INTEGER | Duración en minutos |
| status | ENUM('scheduled', 'in-progress', 'completed', 'cancelled') | Estado |
| created_at | TIMESTAMP | Fecha de creación |
| completed_at | TIMESTAMP | Fecha de finalización |

### Tabla: exercises
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| title | VARCHAR(255) | Título del ejercicio |
| description | TEXT | Enunciado del problema |
| initial_code | TEXT | Código inicial |
| language | VARCHAR(50) | Lenguaje de programación |
| difficulty | ENUM('easy', 'medium', 'hard') | Dificultad |
| category | VARCHAR(100) | Categoría (algoritmos, estructuras, etc.) |
| created_by | UUID (FK → users) | Creador del ejercicio |
| is_public | BOOLEAN | Si es público o privado |
| created_at | TIMESTAMP | Fecha de creación |

### Tabla: interview_exercises
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| interview_id | UUID (FK → interviews) | Entrevista relacionada |
| exercise_id | UUID (FK → exercises) | Ejercicio asignado |
| order | INTEGER | Orden en la entrevista |
| solution_code | TEXT | Código solución final |
| notes | TEXT | Notas del entrevistador |

### Tabla: code_sessions
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| interview_id | UUID (FK → interviews) | Entrevista relacionada |
| exercise_id | UUID (FK → exercises) | Ejercicio actual |
| code_content | TEXT | Contenido actual del código |
| language | VARCHAR(50) | Lenguaje de programación |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de última actualización |

## 🔧 Funcionalidades Principales

### 1. Sistema de Autenticación y Autorización
- Registro y login para entrevistadores
- Acceso para candidatos mediante invitación (sin registro requerido)
- Roles diferenciados (interviewer/candidate)
- Middleware de autenticación JWT

### 2. Gestión de Salas de Entrevista
- Creación de salas con código único
- Unión a salas mediante código
- Persistencia del estado de la entrevista
- Temporizador de entrevista

### 3. Editor de Código en Tiempo Real
- Sincronización bidireccional del código
- Soporte para múltiples lenguajes de programación
- Resaltado de sintaxis
- Indentación automática

### 4. Sistema de Videollamadas
- Conexión WebRTC peer-to-peer
- Compartición de pantalla
- Chat de texto durante la entrevista
- Indicadores de conexión

### 5. Biblioteca de Ejercicios
- Creación y edición de ejercicios
- Categorización por dificultad y tema
- Ejercicios predefinidos y personalizados
- Búsqueda y filtrado de ejercicios

### 6. Sistema de Evaluación
- Notas privadas del entrevistador
- Guardado del código final
- Calificación por habilidades
- Feedback estructurado

## 🚀 Entregables por Fases

### Fase 1: MVP (2 semanas)
- [ ] Autenticación básica
- [ ] Creación y unión a salas
- [ ] Editor de código colaborativo básico
- [ ] 3-5 ejercicios predefinidos
- [ ] Chat de texto simple

### Fase 2: Funcionalidades Avanzadas (1.5 semanas)
- [ ] Integración de videollamadas WebRTC
- [ ] Sistema de ejercicios expandible
- [ ] Compartición de pantalla
- [ ] Temporizador de entrevista

### Fase 3: Mejoras de UX y Robustez (1 semana)
- [ ] Interfaz mejorada con Chakra UI
- [ ] Manejo de errores y reconexión
- [ ] Persistencia de sesiones
- [ ] Exportación de resultados

## 📱 Consideraciones Técnicas

### Seguridad
- Validación de entrada en frontend y backend
- Sanitización de código para prevenir injection
- Tokens de sesión con expiración
- Encriptación de datos sensibles

### Performance
- Optimización de WebSockets para evitar sobrecarga
- Compresión de datos en transmisión de código
- Lazy loading de componentes pesados
- Debouncing en actualizaciones de código

### Escalabilidad
- Arquitectura modular para fácil expansión
- Diseño responsive para diferentes dispositivos
- Separación clara entre lógica de negocio y UI

## 🧪 Criterios de Aceptación

- ✅ Carga inicial en menos de 3 segundos
- ✅ Sincronización de código en menos de 100ms
- ✅ Videollamada estable con >500kbps de ancho de banda
- ✅ Funcionamiento en Chrome, Firefox y Safari
- ✅ Interfaz usable en móviles y tablets
- ✅ Persistencia correcta de datos de entrevista