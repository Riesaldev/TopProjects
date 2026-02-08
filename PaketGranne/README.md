# PaketGranne+ - Especificaciones Técnicas

## 📋 Descripción del Proyecto

PaketGranne+ es una plataforma que organiza la recepción, registro y entrega de paquetes en **edificios**, **comunidades** y **barrios pequeños**. Permite a los vecinos coordinar entregas, registrar paquetes recibidos, activar modo vacaciones y gestionar puntos seguros de entrega, reduciendo pérdidas, robos y confusiones.

## 🎯 Objetivos Principales

- Reducir pérdidas, robos y entregas fallidas de paquetes.
- Ofrecer un sistema claro de avisos, confirmaciones y recogidas.
- Permitir puntos de entrega compartidos y turnos de recepción.
- Gestionar modo vacaciones para usuarios ausentes.
- Crear un historial confiable para edificios, comunidades y barrios.
- Integrar verificación BankID para máxima confianza entre vecinos.

## 🛠 Stack Tecnológico

### Frontend

- **Next.js 16** con **React**
- **TailwindCSS** para diseño responsivo
- **React Query** para gestión de estado del servidor y cache
- **React Hook Form** + **Zod** para formularios y validación
- **Socket.io Client** para notificaciones en tiempo real
- **JWT** + **JS Cookie** para autenticación stateless
- **Mapbox** o **Leaflet** para visualización de puntos de entrega
- **Lucide React** para iconos
- **Date-fns** para manejo de fechas
- **Sonner** para notificaciones toast
- **React Context API** para estado global (auth, grupo activo, preferencias)

### Backend

- **Node.js** con **Express.js**
- **Prisma** como ORM
- **MySQL** como base de datos relacional
- **Socket.io** para notificaciones en tiempo real
- **JWT** para autenticación stateless
- **BankID API** para verificación de identidad
- **Cloudinary** para gestión de imágenes (fotos de paquetes, puntos de entrega)

### Base de Datos y Almacenamiento

- **MySQL** con tablas relacionales
- **Cloudinary** para imágenes
- (Opcional) **Redis** para colas de notificaciones y cache ligero

### Búsqueda y Analytics

- Búsqueda por dirección, grupo y estado de paquetes
- **Google Analytics 4** para métricas web y eventos personalizados

### Monitoreo y Seguridad

- **Vercel Analytics** o **PM2 + logs** para monitoreo básico
- **JWT** para autenticación stateless
- **Helmet.js** para seguridad de headers HTTP
- **Express rate limiting** para protección contra abuso

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo           | Tipo                      | Descripción                         |
|-----------------|---------------------------|-------------------------------------|
| id              | UUID (PK)                 | Identificador único                 |
| name            | String                    | Nombre completo                     |
| phone           | String                    | Teléfono de contacto                |
| email           | String (Unique, opcional) | Correo electrónico                  |
| bankid_verified | Boolean                   | Usuario verificado con BankID       |
| role            | Enum (user, admin)        | Rol del usuario                     |
| profile_image   | String                    | URL de imagen de perfil             |
| is_active       | Boolean                   | Usuario activo/inactivo             |
| created_at      | Timestamp                 | Fecha de registro                   |
| updated_at      | Timestamp                 | Última actualización                |

### Tabla: groups

| Campo      | Tipo                                     | Descripción                                      |
|------------|------------------------------------------|--------------------------------------------------|
| id         | UUID (PK)                                | Identificador único                              |
| name       | String                                   | Nombre del grupo                                 |
| type       | Enum (building, community, neighborhood) | Tipo de grupo (edificio, comunidad, barrio)      |
| address    | String                                   | Dirección principal                              |
| city       | String                                   | Ciudad                                           |
| postal_code| String                                   | Código postal                                    |
| is_active  | Boolean                                  | Grupo activo/inactivo                            |
| created_at | Timestamp                                | Fecha de creación                                |

### Tabla: households

| Campo      | Tipo               | Descripción                          |
|------------|--------------------|--------------------------------------|
| id         | UUID (PK)          | Identificador único                  |
| group_id   | UUID (FK → groups) | Grupo al que pertenece               |
| user_id    | UUID (FK → users)  | Usuario principal del hogar          |
| unit       | String             | Identificador (piso, casa, puerta)   |
| is_active  | Boolean            | Hogar activo/inactivo                |

### Tabla: delivery_points

| Campo      | Tipo               | Descripción                          |
|------------|--------------------|--------------------------------------|
| id         | UUID (PK)          | Identificador único                  |
| group_id   | UUID (FK → groups) | Grupo asociado                       |
| name       | String             | Nombre del punto (garaje, caseta…)   |
| description| String             | Descripción                          |
| location   | JSON               | Coordenadas geográficas              |
| is_default | Boolean            | Punto por defecto del grupo          |
| is_active  | Boolean            | Activo/inactivo                      |

### Tabla: packages

| Campo             | Tipo                                 | Descripción                                  |
|-------------------|--------------------------------------|----------------------------------------------|
| id                | UUID (PK)                            | Identificador único                          |
| household_id      | UUID (FK → households)               | Hogar destinatario                           |
| received_by       | UUID (FK → users)                    | Usuario que recibe el paquete                |
| delivery_point_id | UUID (FK → delivery_points)          | Punto donde se deja el paquete               |
| status            | Enum (received, notified, picked_up) | Estado del paquete                           |
| carrier           | String                               | Transportista (PostNord, DHL, etc.)          |
| tracking_code     | String                               | Código de seguimiento                        |
| image             | String                               | Foto del paquete                             |
| note              | String                               | Nota opcional                                |
| created_at        | Timestamp                            | Fecha de registro                            |
| picked_up_at      | Timestamp                            | Fecha de recogida                            |

### Tabla: vacations

| Campo      | Tipo                   | Descripción                          |
|------------|------------------------|--------------------------------------|
| id         | UUID (PK)              | Identificador único                  |
| user_id    | UUID (FK → users)      | Usuario                              |
| group_id   | UUID (FK → groups)     | Grupo                                |
| start_date | Date                   | Fecha de inicio                      |
| end_date   | Date                   | Fecha de fin                         |
| is_active  | Boolean                | Vacaciones activas/inactivas         |

### Tabla: notifications

| Campo      | Tipo                               | Descripción                          |
|------------|------------------------------------|--------------------------------------|
| id         | UUID (PK)                          | Identificador único                  |
| user_id    | UUID (FK → users)                  | Usuario destinatario                 |
| type       | Enum (package, vacation, system)   | Tipo de notificación                 |
| title      | String                             | Título                               |
| message    | Text                               | Mensaje                              |
| is_read    | Boolean                            | Leída/no leída                       |
| created_at | Timestamp                          | Fecha de creación                    |

## 🔧 Funcionalidades Principales

### 1. Gestión de Paquetes

- **Registro de paquetes**: Alta rápida de paquetes recibidos para un hogar.
- **Asignación de punto de entrega**: Selección de punto seguro (garaje, caseta, vecino).
- **Confirmación de recogida**: Cambio de estado a “picked_up” con registro de fecha.
- **Historial de paquetes**: Listado por hogar, grupo y rango de fechas.

### 2. Modo Vacaciones

- **Activación de modo vacaciones**: El usuario marca fechas de ausencia.
- **Redirección de paquetes**: Los paquetes se asignan a vecinos o puntos comunes.
- **Notificaciones**: Avisos al usuario cuando se recibe un paquete durante sus vacaciones.

### 3. Gestión de Grupos y Hogares

- **Creación de grupos**: Edificios, comunidades o barrios.
- **Gestión de hogares**: Alta/baja de unidades (pisos, casas).
- **Roles y permisos**: Admins de grupo, usuarios estándar.

### 4. Notificaciones y Tiempo Real

- **Notificaciones en tiempo real**: Socket.io para avisos de paquetes recibidos.
- **Centro de notificaciones**: Historial de eventos por usuario.
- **Preferencias**: Activar/desactivar tipos de notificaciones.

### 5. Autenticación y Seguridad

- **Login con BankID** (backend) y sesión JWT.
- **Gestión de perfiles**: Datos básicos, teléfono, imagen.
- **Seguridad**: Rate limiting, Helmet, validación de inputs.

---
