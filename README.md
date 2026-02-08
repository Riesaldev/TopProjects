# 🚀 TopProjects - Portfolio de Aplicaciones Web Full-Stack

Repositorio que contiene 10 aplicaciones web innovadoras diseñadas y desarrolladas (o en proceso de desarrollo) para demostrar habilidades full-stack en desarrollo moderno. Cada proyecto resuelve problemas reales y utiliza tecnologías demandadas en la industria.

## 📊 Estado del Proyecto

- **✅ En desarrollo activo:** RollForge, LocalTaste
- **📋 Planificados:** DevTracker, EventMatch, GreenRoute, MindSpace, SkillsCanva, GrannFix, NäraPaws, PaketGranne

---

## 🎮 Proyectos en Desarrollo

### RollForge - Plataforma para Juegos de Rol

**Estado:** 🟢 En desarrollo  
**Stack:** React + Vite + TypeScript + Tailwind (Frontend) | Node.js + Express + MySQL (Backend)

Plataforma web para jugar juegos de rol de mesa en línea con amigos. Incluye:

- Mapa hexagonal interactivo con herramientas de medición
- Sistema de dados y gestión de personajes
- Tableros, manuales y herramientas de campaña
- Comunicación en tiempo real con Socket.io

**Características destacadas:**

- Grilla hexagonal ajustable con zoom independiente
- Herramientas de medición (distancia, áreas radiales y cónicas)
- Autenticación JWT y OAuth
- Tests con Vitest + Supertest

### LocalTaste - Marketplace de Productos Locales

**Estado:** 🟢 En desarrollo  
**Stack:** Next.js 16 + React + Tailwind (Frontend) | Node.js + Express + Prisma + MySQL (Backend)

Conecta consumidores con productores locales de alimentos frescos. Permite suscripciones a cestas personalizadas y entregas recurrentes.

**Características destacadas:**

- Sistema de suscripciones con Stripe
- Dashboard para productores (inventario, pedidos, analytics)
- Notificaciones en tiempo real con Socket.io
- Búsqueda con filtros avanzados
- Integración con Cloudinary para imágenes

---

## 📋 Proyectos Planificados

### DevTracker - Dashboard de Productividad para Desarrolladores

**Stack:** Next.js 14 + NestJS + PostgreSQL + TimescaleDB

Dashboard que integra métricas de GitHub, GitLab y Jira para visualizar productividad, establecer objetivos y analizar rendimiento con comparativas de la industria.

**Tecnologías clave:** Chart.js, D3.js, OAuth2, BullMQ, Redis

---

### EventMatch - Gestión de Hackatones

**Stack:** React 18 + Vite + Node.js + Express + PostgreSQL + Prisma

Plataforma completa para organizar hackatones: registro, formación de equipos, gestión de proyectos y dashboards en tiempo real para jueces.

**Tecnologías clave:** Socket.io, Framer Motion, JWT, OAuth (GitHub/Google)

---

### GreenRoute - Optimizador de Rutas Sostenibles

**Stack:** Vue.js 3 + Vite + Node.js + Express + PostgreSQL + PostGIS

Calcula rutas optimizadas con menor huella de carbono, integrando opciones de transporte sostenible y gamificación con puntos ecológicos.

**Tecnologías clave:** Leaflet.js/Mapbox, OpenRouteService API, Carbon Interface API, Redis

---

### MindSpace - Wellness Corporativo

**Stack:** Vue.js 3 + Vite + NestJS + TypeORM + PostgreSQL

Plataforma de bienestar empresarial con programas de meditación, ejercicios de mindfulness y seguimiento de métricas de salud mental.

**Tecnologías clave:** Vuex, Chart.js, WebSocket, Redis

---

### SkillsCanva - Portfolio Interactivo

**Stack:** Vue.js 3 + Node.js + Express + MongoDB

Editor visual para crear portfolios de desarrolladores con visualización 3D de habilidades e integración automática con GitHub.

**Tecnologías clave:** Three.js, GitHub REST API, Redis, JWT

---

### GrannFix - Micro-ayudas entre Vecinos

**Stack:** Next.js 16 + Node.js + Express + Prisma + MySQL

Plataforma hiperlocal para micro-tareas cotidianas (montar muebles, recados, etc.) con verificación de identidad y sistema de reputación.

**Tecnologías clave:** BankID API, Stripe/Swish, Socket.io, Mapbox/Leaflet

---

### NäraPaws - Cuidado de Mascotas entre Vecinos

**Stack:** Next.js 16 + Node.js + Express + Prisma + MySQL

Conecta dueños de perros con vecinos verificados para paseos y cuidados puntuales, con sistema de reservas y pagos recurrentes.

**Tecnologías clave:** BankID API, Stripe/Swish, Socket.io, Mapbox/Leaflet, React Query

---

### PaketGranne - Gestión de Paquetes Comunitarios

**Stack:** Next.js 16 + Node.js + Express + Prisma + MySQL

Organiza la recepción y entrega de paquetes en edificios y comunidades, con modo vacaciones y puntos de entrega compartidos.

**Tecnologías clave:** BankID API, Socket.io, Cloudinary, Redis (opcional)

---

## 💡 Características Comunes

- ✅ **Diseño moderno** con UX/UI profesional
- ✅ **Problemas reales** con mercado potencial verificado
- ✅ **Stack moderno** con tecnologías demandadas en la industria
- ✅ **Arquitectura escalable** siguiendo mejores prácticas
- ✅ **Autenticación segura** con JWT y OAuth
- ✅ **Tiempo real** con WebSocket/Socket.io
- ✅ **Testing** con frameworks modernos
- ✅ **Documentación completa** de APIs y arquitectura

---

## 🛠 Stack Tecnológico General

### Frontend

| Tecnología | Proyectos |
|------------|-----------|
| **Next.js** | LocalTaste, GrannFix, NäraPaws, PaketGranne, DevTracker |
| **React** | RollForge, EventMatch |
| **Vue.js 3** | GreenRoute, MindSpace, SkillsCanva |
| **TypeScript** | RollForge |
| **Tailwind CSS** | Todos los proyectos |

### Backend

| Tecnología | Proyectos |
|------------|-----------|
| **Node.js + Express** | RollForge, LocalTaste, EventMatch, GreenRoute, GrannFix, NäraPaws, PaketGranne, SkillsCanva |
| **NestJS** | DevTracker, MindSpace |
| **Socket.io** | RollForge, LocalTaste, EventMatch, GrannFix, NäraPaws, PaketGranne |
| **Prisma ORM** | LocalTaste, EventMatch, GrannFix, NäraPaws, PaketGranne |
| **TypeORM** | DevTracker, MindSpace |

### Base de Datos

| Tecnología | Proyectos |
|------------|-----------|
| **MySQL** | RollForge, LocalTaste, GrannFix, NäraPaws, PaketGranne |
| **PostgreSQL** | DevTracker, EventMatch, GreenRoute, MindSpace |
| **MongoDB** | SkillsCanva |
| **Redis** | DevTracker, GreenRoute, MindSpace, SkillsCanva, PaketGranne (opcional) |

### Servicios Externos

- **Stripe** - Pagos y suscripciones
- **BankID** - Verificación de identidad (proyectos nórdicos)
- **Cloudinary** - Gestión de imágenes
- **GitHub/GitLab API** - Integración con repositorios
- **MapBox/Leaflet** - Mapas interactivos
- **OAuth2** - Autenticación social

---

## 📁 Estructura del Repositorio

```
TopProjects/
├── README.md                    # Este archivo
├── RollForge/                   # 🟢 En desarrollo
│   ├── client/                  # React + Vite + TypeScript
│   └── server/                  # Node.js + Express + MySQL
├── LocalTaste/                  # 🟢 En desarrollo
│   ├── client/                  # Next.js 16
│   ├── server/                  # (Planificado)
│   └── design/                  # Mockups y diseños
├── DevTracker/                  # 📋 Planificado
│   ├── HISTORIAS.md
│   └── README.md
├── EventMatch/                  # 📋 Planificado
├── GreenRoute/                  # 📋 Planificado
├── MindSpace/                   # 📋 Planificado
├── SkillsCanva/                 # 📋 Planificado
├── GrannFix/                    # 📋 Planificado
├── NäraPaws/                    # 📋 Planificado
└── PaketGranne/                 # 📋 Planificado
```

---

## 🎯 Objetivos del Portfolio

1. **Demostrar versatilidad** - Diferentes dominios de aplicación (gaming, e-commerce, productividad, sostenibilidad, wellness)
2. **Mostrar competencia técnica** - Stack moderno, arquitecturas escalables, mejores prácticas
3. **Resolver problemas reales** - Cada proyecto tiene un caso de uso verificable
4. **Full-stack completo** - Frontend, backend, base de datos, servicios externos
5. **Código de calidad** - Testing, documentación, seguridad, performance

---

## 📜 Licencia

Cada proyecto incluye su propia licencia. Consulta el directorio individual de cada aplicación para más detalles.
