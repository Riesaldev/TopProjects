# LocalTaste - Especificaciones Técnicas

## 📋 Descripción del Proyecto

LocalTaste es un marketplace que conecta consumidores con productores locales de alimentos. Permite explorar productos frescos, suscribirse a cestas personalizadas y recibir entregas recurrentes directamente de productores cercanos.

## 🎯 Objetivos Principales

- Crear un marketplace enfocado en productos locales y sostenibles.
- Permitir suscripciones personalizadas a cestas de productos.
- Facilitar la relación directa entre productores y consumidores.
- Ofrecer un dashboard para que productores gestionen su inventario y pedidos.

## 🛠 Stack Tecnológico

### Frontend

- **Next.js 13** con **React**
- **TailwindCSS** para diseño
- **Framer Motion** para animaciones
- **Stripe.js** para integración de pagos

### Backend

- **NestJS** con **TypeORM**
- **PostgreSQL** como base de datos relacional
- **Redis** para cache de productos y sesiones
- **JWT** + **OAuth** para autenticación
- **Stripe API** para pagos y suscripciones

### Base de Datos

- **PostgreSQL** con tablas relacionales

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| name | String | Nombre del usuario |
| email | String | Correo electrónico |
| role | Enum (consumer, producer, admin) | Rol del usuario |
| password_hash | String | Hash de contraseña |
| created_at | Timestamp | Fecha de registro |

### Tabla: products

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| producer_id | UUID (FK → users) | Productor propietario |
| name | String | Nombre del producto |
| description | String | Descripción |
| price | Decimal | Precio |
| stock | Integer | Stock disponible |
| category | String | Categoría del producto |
| created_at | Timestamp | Fecha de creación |

### Tabla: subscriptions

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario suscriptor |
| products | JSON | Lista de productos incluidos |
| frequency | Enum (weekly, biweekly, monthly) | Frecuencia |
| status | Enum (active, paused, canceled) | Estado de la suscripción |
| created_at | Timestamp | Fecha de creación |

## 🔧 Funcionalidades Principales

### 1. Marketplace

- Catálogo de productos locales.
- Búsqueda y filtros por categoría y productor.
- Ficha de producto con detalles y valoraciones.

### 2. Suscripciones

- Creación de cestas personalizadas.
- Configuración de frecuencia de entrega.
- Pausar, cancelar o modificar suscripciones.

### 3. Gestión de Productores

- Dashboard para gestionar inventario.
- Reportes de ventas e ingresos.
- Notificaciones de pedidos.

### 4. Pagos y Entregas

- Pagos seguros con Stripe.
- Gestión de facturación.
- Integración con servicios de logística (opcional).

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)

- [ ] Catálogo básico de productos
- [ ] Registro de usuarios (consumidor/productor)
- [ ] Sistema de pedidos simples
- [ ] Pagos con Stripe

### Fase 2: Funcionalidades Avanzadas (2 semanas)

- [ ] Suscripciones recurrentes
- [ ] Dashboard para productores
- [ ] Reportes básicos
- [ ] Valoraciones de productos

### Fase 3: Mejoras (1 semana)

- [ ] Integración logística
- [ ] Recomendaciones personalizadas
- [ ] Gamificación de consumo local
- [ ] Exportación de reportes
