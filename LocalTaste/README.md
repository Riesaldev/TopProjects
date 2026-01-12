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

- **Next.js 16** con **React**
- **TailwindCSS** para diseño responsivo y animaciones CSS
- **Stripe.js** + **React Stripe.js** para integración de pagos
- **React Query** para gestión de estado del servidor y cache
- **React Hook Form** + **Zod** para formularios y validación
- **Socket.io Client** para notificaciones en tiempo real
- **JWT** + **JS Cookie** para autenticación stateless
- **Lucide React** para iconos
- **Date-fns** para manejo de fechas
- **Sonner** para notificaciones toast
- **React Context API** para estado global del cliente (auth, cart)

### Backend

- **Node.js** con **Express.js**
- **Prisma** como ORM (más simple que TypeORM)
- **MySQL** como base de datos relacional
- **Socket.io** para notificaciones en tiempo real
- **JWT** para autenticación stateless
- **Stripe API** para pagos y suscripciones recurrentes

### Base de Datos y Almacenamiento

- **MySQL** con tablas relacionales
- **Cloudinary** para gestión de imágenes (setup más simple que S3)

### Búsqueda y Analytics

- **MySQL FULLTEXT search** + **React filters** para búsqueda de productos
- **Google Analytics 4** para métricas web y eventos personalizados

### Monitoreo y Seguridad

- **Vercel Analytics** (si se usa Vercel) o **console logs + PM2** para monitoreo básico
- **JWT** para autenticación stateless
- **Helmet.js** para seguridad de headers HTTP básica
- **Express rate limiting** para protección básica contra spam

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| name | String | Nombre completo del usuario |
| email | String (Unique) | Correo electrónico |
| phone | String | Teléfono de contacto |
| role | Enum (consumer, producer, admin) | Rol del usuario |
| password_hash | String | Hash de contraseña |
| profile_image | String | URL de imagen de perfil |
| is_active | Boolean | Usuario activo/inactivo |
| created_at | Timestamp | Fecha de registro |
| updated_at | Timestamp | Última actualización |

### Tabla: categories

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| name | String | Nombre de la categoría |
| description | String | Descripción de la categoría |
| image | String | URL de imagen representativa |
| is_active | Boolean | Categoría activa |

### Tabla: products

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| producer_id | UUID (FK → users) | Productor propietario |
| category_id | UUID (FK → categories) | Categoría del producto |
| name | String | Nombre del producto |
| tipe | String | Tipo de producto (fruta, verdura, lácteo, etc.) |
| description | Text | Descripción detallada |
| price | Decimal(10,2) | Precio por unidad |
| unit | String | Unidad (kg, litros, unidad) |
| stock | Integer | Stock disponible |
| image | String | URL de imagen representativa |
| origin | String | Origen/ubicación del producto |
| is_active | Boolean | Producto activo/inactivo |
| created_at | Timestamp | Fecha de creación |
| updated_at | Timestamp | Última actualización |

### Tabla: addresses

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario propietario |
| street | String | Dirección |
| city | String | Ciudad |
| postal_code | String | Código postal |
| province | String | Provincia |
| is_default | Boolean | Dirección por defecto |

### Tabla: orders

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario que realiza el pedido |
| address_id | UUID (FK → addresses) | Dirección de entrega |
| total | Decimal(10,2) | Total del pedido |
| status | Enum (pending, confirmed, shipped, delivered, canceled) | Estado |
| stripe_payment_id | String | ID de pago de Stripe |
| created_at | Timestamp | Fecha del pedido |
| delivered_at | Timestamp | Fecha de entrega |

### Tabla: order_items

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| order_id | UUID (FK → orders) | Pedido |
| product_id | UUID (FK → products) | Producto |
| quantity | Integer | Cantidad |
| unit_price | Decimal(10,2) | Precio unitario al momento del pedido |

### Tabla: subscriptions

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario suscriptor |
| address_id | UUID (FK → addresses) | Dirección de entrega |
| frequency | Enum (weekly, biweekly, monthly) | Frecuencia |
| status | Enum (active, paused, canceled) | Estado |
| next_delivery | Date | Fecha de próxima entrega |
| stripe_subscription_id | String | ID suscripción Stripe |
| created_at | Timestamp | Fecha de creación |

### Tabla: subscription_items

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| subscription_id | UUID (FK → subscriptions) | Suscripción |
| product_id | UUID (FK → products) | Producto |
| quantity | Integer | Cantidad por entrega |

### Tabla: reviews

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario que reseña |
| product_id | UUID (FK → products) | Producto reseñado |
| order_id | UUID (FK → orders) | Pedido asociado |
| rating | Integer | Calificación (1-5) |
| comment | Text | Comentario |
| is_approved | Boolean | Reseña aprobada |
| created_at | Timestamp | Fecha de la reseña |

### Tabla: notifications

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | Identificador único |
| user_id | UUID (FK → users) | Usuario destinatario |
| type | Enum (order, subscription, review, system) | Tipo |
| title | String | Título de la notificación |
| message | Text | Mensaje |
| is_read | Boolean | Notificación leída |
| created_at | Timestamp | Fecha de creación |

## 🔧 Funcionalidades Principales

### 1. Marketplace y Catálogo

- **Exploración de productos**: Catálogo responsive con imágenes y descripciones detalladas
- **Búsqueda avanzada**: Filtros por categoría, productor, precio y ubicación
- **Ficha de producto**: Detalles completos, galería de imágenes, información del productor
- **Sistema de valoraciones**: Reseñas y calificaciones de 1-5 estrellas por usuarios verificados
- **Productores destacados**: Perfiles de productores con sus especialidades y ubicación

### 2. Sistema de Pedidos

- **Carrito de compras**: Gestión de productos, cantidades y cálculo automático
- **Gestión de direcciones**: Múltiples direcciones de entrega por usuario
- **Confirmación de pedidos**: Estado en tiempo real (pendiente, confirmado, enviado, entregado)
- **Historial de compras**: Tracking completo de pedidos anteriores
- **Notificaciones**: Alertas automáticas sobre estado de pedidos

### 3. Suscripciones Personalizadas

- **Cestas personalizadas**: Selección libre de productos por suscripción
- **Configuración flexible**: Frecuencia (semanal, quincenal, mensual) y cantidad
- **Gestión de suscripciones**: Pausar, modificar, cancelar o cambiar productos
- **Entrega programada**: Cálculo automático de fechas de próximas entregas
- **Facturación recurrente**: Integración completa con Stripe para pagos automáticos

### 4. Dashboard del Productor

- **Gestión de inventario**: Alta/baja de productos, actualización de stock y precios
- **Panel de pedidos**: Vista centralizada de pedidos pendientes y confirmaciones
- **Notificaciones en tiempo real**: Alertas instantáneas de nuevos pedidos vía Socket.io
- **Reportes de ventas**: Estadísticas de ingresos, productos más vendidos y tendencias
- **Gestión de perfil**: Información del productor, especialidades y ubicación

### 5. Sistema de Usuarios y Autenticación

- **Registro multi-rol**: Consumidores, productores y administradores
- **Autenticación segura**: JWT stateless con renovación automática
- **Perfiles personalizados**: Información completa, foto de perfil y preferencias
- **Gestión de direcciones**: CRUD completo de direcciones de entrega
- **Seguridad**: Rate limiting, headers seguros y validación de inputs

### 6. Pagos y Facturación

- **Pagos seguros**: Integración completa con Stripe (tarjetas, Apple Pay, Google Pay)
- **Suscripciones recurrentes**: Gestión automática de cobros periódicos
- **Historial de pagos**: Seguimiento de todas las transacciones
- **Gestión de fallos**: Retry automático y notificaciones por pagos fallidos
- **Facturación**: Generación automática de recibos y facturas

### 7. Administración y Moderación

- **Panel de administración**: Gestión completa de usuarios, productos y categorías
- **Moderación de reseñas**: Sistema de aprobación para valoraciones y comentarios
- **Gestión de usuarios**: Activar/desactivar cuentas y gestión de roles
- **Reportes globales**: Métricas del marketplace, usuarios activos y ventas
- **Monitoreo**: Análisis de uso con Google Analytics 4

### 8. Notificaciones y Comunicación

- **Sistema de notificaciones**: Hub centralizado para todas las alertas
- **Notificaciones en tiempo real**: WebSockets para updates instantáneos
- **Comunicación por email**: Confirmaciones, recordatorios y actualizaciones
- **Centro de notificaciones**: Historial completo con estado leído/no leído
- **Preferencias**: Control granular de tipos de notificaciones por usuario
