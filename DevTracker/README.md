# DevTracker - Especificaciones Técnicas

## 📋 Descripción del Proyecto
DevTracker es un dashboard de productividad para desarrolladores que integra métricas de GitHub, GitLab y Jira para visualizar y analizar el rendimiento de desarrollo.

## 🎯 Objetivos Principales
- Proporcionar métricas claras de productividad de desarrollo
- Establecer y hacer seguimiento de objetivos personales y de equipo
- Ofrecer comparativas anónimas con estándares de la industria
- Identificar áreas de mejora en el flujo de trabajo

## 🛠 Stack Tecnológico
### Frontend
- **Next.js 14** con App Router
- **Chart.js** y **D3.js** para visualizaciones
- **Tailwind CSS** para estilos
- **React Query** para gestión de estado
- **Zod** para validación

### Backend
- **NestJS** con arquitectura modular
- **TypeORM** como ORM principal
- **Passport.js** para autenticación OAuth
- **BullMQ** para colas de procesamiento
- **Jest** para testing

### Base de Datos
- **PostgreSQL** con TimescaleDB
- **Redis** para caching y colas

### APIs Externas
- **GitHub REST API** v4
- **GitLab API** v4
- **Jira REST API** v3
- **OAuth2** para autenticación

## 🗄️ Esquema de Base de Datos

### Tabla: users
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único usuario |
| email | VARCHAR(255) UNIQUE | Email usuario |
| username | VARCHAR(100) | Nombre usuario |
| avatar_url | VARCHAR(255) | URL avatar |
| timezone | VARCHAR(50) | Zona horaria |
| created_at | TIMESTAMP | Fecha creación |

### Tabla: connected_services
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único |
| user_id | UUID (FK → users) | Usuario |
| service_type | ENUM('github', 'gitlab', 'jira') | Tipo servicio |
| access_token | TEXT | Token acceso |
| refresh_token | TEXT | Token refresh |
| service_username | VARCHAR(100) | Usuario externo |
| service_user_id | VARCHAR(100) | ID externo |
| is_active | BOOLEAN | Activo/inactivo |
| created_at | TIMESTAMP | Fecha creación |

### Tabla: developer_metrics
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único |
| user_id | UUID (FK → users) | Usuario |
| date | DATE | Fecha métricas |
| commits_count | INTEGER | Número commits |
| pr_created_count | INTEGER | PRs creados |
| pr_merged_count | INTEGER | PRs mergeados |
| pr_reviewed_count | INTEGER | PRs revisados |
| lines_added | INTEGER | Líneas añadidas |
| lines_removed | INTEGER | Líneas eliminadas |
| issues_created | INTEGER | Issues creados |
| issues_closed | INTEGER | Issues cerrados |
| comments_count | INTEGER | Comentarios |
| active_days | INTEGER | Días activos |

### Tabla: goals
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único |
| user_id | UUID (FK → users) | Usuario |
| title | VARCHAR(255) | Título objetivo |
| description | TEXT | Descripción |
| metric_type | VARCHAR(50) | Tipo métrica |
| target_value | INTEGER | Valor objetivo |
| current_value | INTEGER | Valor actual |
| start_date | DATE | Fecha inicio |
| end_date | DATE | Fecha fin |
| status | ENUM('active', 'completed', 'failed') | Estado |
| created_at | TIMESTAMP | Fecha creación |

## 🔧 Funcionalidades Principales

### 1. Sistema de Autenticación
- Login con OAuth2 para GitHub, GitLab, Jira
- Gestión segura de tokens
- Reconexión automática
- Permisos granulares

### 2. Sincronización de Datos
- Sincronización incremental
- Procesamiento en background
- Manejo de rate limits
- Cache inteligente

### 3. Dashboard de Métricas
- Visualización personal/equipo
- Gráficos interactivos
- Vistas temporales
- Comparativas históricas

### 4. Sistema de Objetivos
- Objetivos SMART
- Notificaciones de progreso
- Análisis de tendencias
- Recomendaciones automáticas

### 5. Reportes y Exportación
- Reportes PDF personalizables
- Exportación CSV/JSON
- Reportes automáticos
- Dashboards compartibles

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)
- [ ] Autenticación OAuth GitHub
- [ ] Sincronización básica repositorios
- [ ] Dashboard métricas básicas
- [ ] Visualizaciones simples

### Fase 2: Completar (2 semanas)
- [ ] Integración GitLab/Jira
- [ ] Sistema objetivos
- [ ] Métricas avanzadas
- [ ] Exportación reportes

### Fase 3: Mejoras (1 semana)
- [ ] Dashboard equipo
- [ ] Recomendaciones automáticas
- [ ] Optimización rendimiento
- [ ] Testing completo

## 📱 Consideraciones Técnicas

### Seguridad
- Encriptación tokens
- Validación scopes OAuth
- Rate limiting APIs
- Auditoría accesos

### Performance
- Cache agresivo métricas
- Sincronización incremental
- Paginación datos
- Optimización queries

### Escalabilidad
- Arquitectura modular
- Procesamiento asíncrono
- DB optimizada temporal
- Auto-scaling

## 🧪 Criterios de Aceptación

- ✅ Sincronización < 5 minutos
- ✅ Dashboard carga < 2 segundos
- ✅ Uptime 99.9% sync
- ✅ Precisión > 99%
- ✅ Soporte >1000 repos