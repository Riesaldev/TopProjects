# GreenRoute - Especificaciones Técnicas

## 📋 Descripción del Proyecto

GreenRoute es una aplicación que optimiza rutas de transporte considerando no solo la distancia o el tiempo, sino también la huella de carbono. El sistema calcula rutas sostenibles para personas y empresas, premiando a los usuarios con puntos ecológicos por elegir opciones más verdes.

## 🎯 Objetivos Principales

- Calcular rutas optimizadas con menor huella de carbono.
- Integrar opciones de transporte sostenibles (bicicleta, transporte público, caminata).
- Generar puntos ecológicos como sistema de gamificación.
- Permitir a empresas reportar el impacto ambiental de sus traslados.

## 🛠 Stack Tecnológico

### Frontend

- **Vue.js 3** + **Vite**
- **Leaflet.js** o **Mapbox GL JS** para mapas interactivos
- **TailwindCSS** para UI moderna
- **Chart.js** para visualización de estadísticas

### Backend

- **Node.js** + **Express**
- **OpenRouteService API** / **Google Maps API** para cálculos de ruta
- **Carbon Interface API** para estimación de emisiones
- **JWT** para autenticación
- **Redis** para cache de rutas

### Base de Datos

- **PostgreSQL** con **PostGIS** para datos geoespaciales
- **MongoDB** para almacenamiento flexible de usuarios y logros

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único de usuario |
| name | String | Nombre del usuario |
| email | String | Correo electrónico |
| points | Integer | Puntos ecológicos acumulados |
| preferred_transport | String | Medio de transporte preferido |

### Tabla: routes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único de ruta |
| user_id | UUID (FK → users) | Usuario que solicitó la ruta |
| origin | Point (PostGIS) | Origen |
| destination | Point (PostGIS) | Destino |
| transport_mode | String | Medio de transporte usado |
| distance_km | Float | Distancia total |
| carbon_kg | Float | Huella de carbono estimada |
| created_at | Timestamp | Fecha de solicitud |

## 🔧 Funcionalidades Principales

### 1. Cálculo de Rutas

- Cálculo de múltiples rutas alternativas.
- Visualización en mapa interactivo.
- Comparación de tiempo, distancia y huella de carbono.

### 2. Sistema de Puntos Ecológicos

- Asignación de puntos por cada trayecto sostenible.
- Ranking de usuarios ecológicos.
- Recompensas simbólicas o badges.

### 3. Reportes y Estadísticas

- Visualización del ahorro de CO₂ por usuario.
- Reportes semanales y mensuales.
- Dashboard empresarial para empleados.

### 4. Integración con Empresas

- Rutas sostenibles para empleados.
- Reportes de huella de carbono corporativa.
- Posibilidad de exportar informes en PDF.

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)

- [ ] Cálculo básico de rutas
- [ ] Estimación de huella de carbono
- [ ] Visualización en mapa
- [ ] Registro de usuarios

### Fase 2: Funcionalidades Avanzadas (2 semanas)

- [ ] Sistema de puntos ecológicos
- [ ] Dashboard de estadísticas personales
- [ ] Rutas alternativas con comparación
- [ ] Exportación básica de reportes

### Fase 3: Mejoras (1 semana)

- [ ] Ranking global de usuarios
- [ ] Dashboard empresarial
- [ ] Exportación avanzada de informes
- [ ] Gamificación con badges
