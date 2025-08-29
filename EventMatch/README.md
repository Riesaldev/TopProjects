# EventMatch - Especificaciones Técnicas

## 📋 Descripción del Proyecto

EventMatch es una plataforma para organizar y gestionar hackatones y eventos tecnológicos. Ofrece registro de participantes, formación de equipos, gestión de proyectos y dashboards en tiempo real para jueces y organizadores.

## 🎯 Objetivos Principales

- Facilitar la inscripción y gestión de participantes en hackatones.
- Permitir la formación automática o manual de equipos.
- Ofrecer un espacio para subir y presentar proyectos.
- Proporcionar dashboards en tiempo real para jueces y organizadores.

## 🛠 Stack Tecnológico

### Frontend

- **React 18** + **Vite**
- **TailwindCSS** para diseño
- **Framer Motion** para animaciones
- **Socket.io-client** para tiempo real

### Backend

- **Node.js** + **Express**
- **Socket.io** para comunicación en tiempo real
- **PostgreSQL** con **Prisma ORM**
- **JWT** + **OAuth (GitHub, Google)** para login
- **Nodemailer** para notificaciones

### Base de Datos

- **PostgreSQL** con entidades relacionales

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID de usuario |
| name | String | Nombre del participante |
| email | String | Correo electrónico |
| role | Enum (participant, judge, organizer) | Rol |
| team_id | UUID (FK → teams) | Equipo asignado |
| created_at | Timestamp | Registro |

### Tabla: teams

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID de equipo |
| name | String | Nombre del equipo |
| members | Array(UUID) | Miembros |
| project_id | UUID (FK → projects) | Proyecto asociado |

### Tabla: projects

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID del proyecto |
| team_id | UUID (FK → teams) | Equipo creador |
| title | String | Título del proyecto |
| description | String | Descripción |
| repo_url | String | Enlace a repositorio |
| demo_url | String | Enlace a demo |
| score | Float | Puntaje promedio |

### Tabla: events

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID del evento |
| name | String | Nombre del evento |
| start_date | Date | Fecha de inicio |
| end_date | Date | Fecha de fin |
| description | String | Descripción |
| organizer_id | UUID (FK → users) | Organizador principal |

## 🔧 Funcionalidades Principales

### 1. Registro de Participantes

- Registro con correo o redes (GitHub/Google).
- Selección de categoría o track.
- Perfil de participante con skills.

### 2. Gestión de Equipos

- Creación automática de equipos por afinidad.
- Invitación manual a otros usuarios.
- Dashboard de equipo con chat integrado.

### 3. Gestión de Proyectos

- Subida de proyecto con repositorio y demo.
- Evaluación de jueces con criterios definidos.
- Visualización de proyectos en galería pública.

### 4. Panel de Jueces y Organizadores

- Dashboard en tiempo real de evaluaciones.
- Reportes de puntuaciones.
- Control de tiempo y fases del hackathon.

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)

- [ ] Registro de participantes
- [ ] Creación y asignación de equipos
- [ ] Subida básica de proyectos
- [ ] Dashboard de organizador (básico)

### Fase 2: Funcionalidades Avanzadas (2 semanas)

- [ ] Evaluación de proyectos por jueces
- [ ] Panel de proyectos en tiempo real
- [ ] Chat de equipo integrado
- [ ] Notificaciones automáticas

### Fase 3: Mejoras (1 semana)

- [ ] Matching inteligente de equipos por skills
- [ ] Gamificación de participación
- [ ] Integración con plataformas de streaming
- [ ] Reportes detallados para organizadores
