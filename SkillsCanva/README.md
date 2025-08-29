# SkillCanvas - Especificaciones Técnicas

## 📋 Descripción del Proyecto
SkillCanvas es una plataforma para crear portfolios interactivos para desarrolladores, con visualización 3D de habilidades y proyectos, e integración con GitHub.

## 🎯 Objetivos Principales
- Crear portfolios visualmente atractivos para desarrolladores
- Visualizar habilidades técnicas en 3D de forma interactiva
- Integrar proyectos de GitHub automáticamente
- Proporcionar analytics de visitas y engagement

## 🛠 Stack Tecnológico
### Frontend
- **Vue 3** con Composition API
- **Three.js** para visualizaciones 3D
- **Vite** como build tool
- **Chart.js** para gráficos de analytics
- **Vue Router** para navegación SPA

### Backend
- **Node.js** + **Express.js**
- **GitHub REST API** v3
- **JWT** para autenticación
- **MongoDB** con **Mongoose**
- **Jest** para testing

### Base de Datos
- **MongoDB** para datos de usuarios y portfolios
- **Redis** para caching de datos de GitHub

## 🗄️ Esquema de Base de Datos

### Tabla: users
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del usuario |
| github_id | String | ID de GitHub |
| username | String | Nombre de usuario |
| email | String | Email del usuario |
| avatar_url | String | URL del avatar |
| created_at | Date | Fecha de creación |

### Tabla: portfolios
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del portfolio |
| user_id | ObjectId (FK → users) | Usuario propietario |
| title | String | Título del portfolio |
| description | String | Descripción |
| custom_url | String | URL personalizada |
| theme | String | Tema visual seleccionado |
| published | Boolean | Si está publicado |
| created_at | Date | Fecha de creación |
| updated_at | Date | Fecha de actualización |

### Tabla: skills
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único de skill |
| portfolio_id | ObjectId (FK → portfolios) | Portfolio asociado |
| name | String | Nombre de la skill |
| category | String | Categoría (frontend, backend, etc.) |
| level | Number | Nivel (1-10) |
| icon | String | Icono representativo |
| created_at | Date | Fecha de creación |

### Tabla: projects
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del proyecto |
| portfolio_id | ObjectId (FK → portfolios) | Portfolio asociado |
| github_repo_id | String | ID del repositorio en GitHub |
| name | String | Nombre del proyecto |
| description | String | Descripción |
| technologies | Array | Tecnologías utilizadas |
| stars | Number | Stars en GitHub |
| forks | Number | Forks en GitHub |
| last_updated | Date | Fecha última actualización |
| created_at | Date | Fecha de creación |

## 🔧 Funcionalidades Principales

### 1. Editor Visual de Portfolios
- Interfaz drag & drop para organizar elementos
- Templates predefinidos y personalizables
- Vista previa en tiempo real
- Personalización de colores y estilos

### 2. Visualización 3D de Habilidades
- Gráfico 3D interactivo de skills
- Diferentes representaciones visuales
- Animaciones y transiciones suaves
- Navegación intuitiva

### 3. Integración con GitHub
- Sincronización automática de repositorios
- Importación de datos de proyectos
- Actualización periódica de métricas
- Filtrado y selección de proyectos

### 4. Analytics de Portfolio
- Tracking de visitas y engagement
- Gráficos de métricas de visualización
- Datos demográficos de visitantes
- Exportación de reportes

### 5. Sistema de Compartición
- URLs personalizadas
- Tarjetas sociales optimizadas (Open Graph)
- Códigos QR para compartir
- Control de privacidad y visibilidad

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)
- [ ] Autenticación con GitHub OAuth
- [ ] Editor básico de portfolio
- [ ] Integración con GitHub API
- [ ] Vista 2D de habilidades

### Fase 2: Funcionalidades Avanzadas (2 semanas)
- [ ] Visualización 3D de habilidades
- [ ] Sistema de analytics
- [ ] Templates personalizables
- [ ] Compartición y URLs personalizadas

### Fase 3: Mejoras (1 semana)
- [ ] Optimización de rendimiento
- [ ] Temas adicionales
- [ ] Exportación de datos
- [ ] Documentación completa

## 📱 Consideraciones Técnicas

### Seguridad
- Validación de datos de entrada
- Autenticación JWT segura
- Control de acceso a portfolios
- Encriptación de datos sensibles

### Performance
- Caching de datos de GitHub con Redis
- Optimización de gráficos 3D para rendimiento
- Lazy loading de componentes pesados
- Compresión de assets

### Escalabilidad
- Arquitectura modular para fácil expansión
- Diseño responsive para diferentes dispositivos
- Base de datos escalable con MongoDB

## 🧪 Criterios de Aceptación

- ✅ Tiempo de carga del portfolio < 2 segundos
- ✅ Sincronización con GitHub en < 30 segundos
- ✅ Visualización 3D fluida con > 60 FPS
- ✅ Interfaz usable en móviles y tablets
- ✅ Precisión de analytics > 95%