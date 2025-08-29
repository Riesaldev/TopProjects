# MindSpace - Especificaciones Técnicas

## 📋 Descripción del Proyecto

MindSpace es una plataforma de bienestar corporativo enfocada en la salud mental y el mindfulness. Permite a las empresas ofrecer a sus empleados programas de meditación, ejercicios de relajación y desafíos de bienestar, con seguimiento de progreso y métricas colectivas.

## 🎯 Objetivos Principales

- Promover la salud mental en entornos laborales.
- Proporcionar recursos de meditación y mindfulness.
- Ofrecer desafíos y rutinas gamificadas para los empleados.
- Dar a las empresas métricas agregadas sobre bienestar sin comprometer privacidad individual.

## 🛠 Stack Tecnológico

### Frontend

- **Vue.js 3** + **Vite**
- **TailwindCSS** para diseño UI
- **Chart.js** para métricas de bienestar
- **Vuex** para gestión de estado

### Backend

- **NestJS** + **TypeORM**
- **PostgreSQL** como base de datos principal
- **Redis** para sesiones y cache
- **JWT** para autenticación segura
- **WebSocket** para notificaciones en tiempo real

### Base de Datos

- **PostgreSQL** con entidades relacionales

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| name | String | Nombre del usuario |
| email | String | Correo electrónico |
| role | Enum (employee, admin) | Rol dentro del sistema |
| company_id | UUID (FK → companies) | Empresa asociada |
| created_at | Timestamp | Fecha de registro |

### Tabla: activities

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID de la actividad |
| title | String | Título de la actividad |
| description | String | Breve descripción |
| type | Enum (meditation, exercise, challenge) | Tipo de actividad |
| duration_minutes | Integer | Duración |
| points | Integer | Puntos otorgados |
| created_at | Timestamp | Fecha de creación |

### Tabla: progress

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario asociado |
| activity_id | UUID (FK → activities) | Actividad completada |
| status | Enum (completed, pending) | Estado |
| completed_at | Timestamp | Fecha de finalización |

### Tabla: companies

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID de empresa |
| name | String | Nombre de la empresa |
| sector | String | Sector empresarial |
| employees_count | Integer | Nº de empleados |
| created_at | Timestamp | Registro |

## 🔧 Funcionalidades Principales

### 1. Recursos de Bienestar

- Biblioteca de meditaciones guiadas y ejercicios.
- Reproducción multimedia integrada.
- Clasificación por categorías (estrés, concentración, relajación).

### 2. Desafíos Gamificados

- Retos semanales y mensuales.
- Puntos y logros por participación.
- Ranking interno en la empresa.

### 3. Seguimiento Personal

- Registro de actividades completadas.
- Métricas de progreso individual.
- Recomendaciones personalizadas.

### 4. Panel Empresarial

- Métricas agregadas por equipos y departamentos.
- Reportes de participación.
- Exportación de informes.

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)

- [ ] Registro de empleados
- [ ] Biblioteca básica de meditaciones
- [ ] Registro manual de progreso
- [ ] Dashboard empresarial básico

### Fase 2: Funcionalidades Avanzadas (2 semanas)

- [ ] Desafíos gamificados
- [ ] Recomendaciones automáticas
- [ ] Reportes empresariales detallados
- [ ] Notificaciones en tiempo real

### Fase 3: Mejoras (1 semana)

- [ ] Integración con wearables (Fitbit, Apple Watch)
- [ ] Ranking entre equipos
- [ ] Exportación avanzada de informes
- [ ] Aplicación móvil híbrida
