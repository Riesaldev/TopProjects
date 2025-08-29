# API Architect - Especificaciones Técnicas

## 📋 Descripción del Proyecto
API Architect es una herramienta visual para diseñar, probar y documentar APIs RESTful. Permite crear especificaciones OpenAPI de manera visual y generar código automáticamente.

## 🎯 Objetivos Principales
- Simplificar el diseño de APIs mediante interfaces visuales
- Generar documentación OpenAPI/Swagger automáticamente
- Proporcionar herramientas de testing integradas
- Generar código de servidor y cliente en múltiples lenguajes

## 🛠 Stack Tecnológico
### Frontend
- **Angular 16** con Angular Material
- **Monaco Editor** para edición de código
- **JointJS** para diagramas visuales
- **NG-Zorro** para componentes UI

### Backend
- **Node.js** + **Express.js**
- **Swagger/OpenAPI** parser y validación
- **Joi** para validación de esquemas
- **Jest** + **Supertest** para testing
- **WebSocket** para colaboración en tiempo real

### Base de Datos
- **MongoDB** con **Mongoose**
- **Redis** para sesiones y cache

### Generación de Código
- **Swagger Codegen** integrado
- **Template Engine** personalizado
- **Múltiples lenguajes:** TypeScript, Python, Java, Go

## 🗄️ Esquema de Base de Datos

### Tabla: projects
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del proyecto |
| name | String | Nombre del proyecto |
| description | String | Descripción del API |
| version | String | Versión del API |
| owner_id | ObjectId (FK → users) | Creador del proyecto |
| openapi_spec | Object | Especificación OpenAPI completa |
| created_at | Date | Fecha de creación |
| updated_at | Date | Fecha de última modificación |

### Tabla: endpoints
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del endpoint |
| project_id | ObjectId (FK → projects) | Proyecto padre |
| path | String | Ruta del endpoint |
| method | String | Método HTTP |
| summary | String | Resumen del endpoint |
| description | String | Descripción detallada |
| parameters | Array | Parámetros del endpoint |
| request_body | Object | Esquema del cuerpo de solicitud |
| responses | Object | Respuestas posibles |
| tags | Array | Etiquetas para categorización |

### Tabla: schemas
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del schema |
| project_id | ObjectId (FK → projects) | Proyecto padre |
| name | String | Nombre del schema |
| type | String | Tipo (object, array, etc.) |
| properties | Object | Propiedades del schema |
| required | Array | Campos obligatorios |
| examples | Array | Ejemplos de uso |

## 🔧 Funcionalidades Principales

### 1. Editor Visual de APIs
- Diagrama interactivo de endpoints y relaciones
- Drag & drop para crear y organizar endpoints
- Editor visual de schemas y propiedades
- Vista previa en tiempo real de especificación OpenAPI

### 2. Generación de Documentación
- Exportación automática a OpenAPI 3.0/3.1
- Generación de documentación Swagger UI/ReDoc
- Documentación interactiva con try-it-out
- Exportación a PDF/HTML

### 3. Testing Integrado
- Cliente HTTP integrado para probar endpoints
- Colecciones de tests y ejemplos
- Validación de respuestas contra esquemas
- Generación de casos de test automáticos

### 4. Mock Server
- Servidor mock automático desde especificación OpenAPI
- Respuestas simuladas basadas en schemas
- Personalización de delays y códigos de error
- Logs de requests y responses

### 5. Generación de Código
- Generación de servidores en Node.js, Python, Java, Go
- Generación de clientes SDK en múltiples lenguajes
- Plantillas personalizables de código
- Integración con CI/CD pipelines

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)
- [ ] Editor visual básico de endpoints
- [ ] Generación de OpenAPI specification
- [ ] Cliente HTTP integrado para testing
- [ ] Exportación a Swagger UI

### Fase 2: Funcionalidades Avanzadas (2 semanas)
- [ ] Mock server automático
- [ ] Generación de código básica
- [ ] Sistema de schemas y componentes
- [ ] Compartición de proyectos

### Fase 3: Mejoras (1 semana)
- [ ] Colaboración en tiempo real
- [ ] Plantillas personalizables
- [ ] Validación avanzada
- [ ] Integración con repositorios Git