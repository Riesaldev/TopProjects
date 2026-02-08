
# GrannFix - Especificaciones Técnicas

## 📋 Descripción del Proyecto

GrannFix es una plataforma de **micro‑ayudas entre vecinos** para tareas rápidas del día a día: montar muebles, recoger paquetes, cuidar plantas, quitar nieve, pequeños recados, etc. Conecta a vecinos cercanos mediante verificación de identidad y un sistema de reputación.

## 🎯 Objetivos Principales

- Facilitar la ayuda entre vecinos para micro‑tareas cotidianas.
- Crear un sistema de confianza basado en identidad verificada y valoraciones.
- Permitir pagos pequeños por tarea (o favores gratuitos).
- Ofrecer un feed hiperlocal de tareas disponibles.
- Fomentar comunidad y colaboración en barrios y edificios.

## 🛠 Stack Tecnológico

### Frontend

- **Next.js 16** con **React**
- **TailwindCSS**
- **React Query**
- **React Hook Form** + **Zod**
- **Socket.io Client** para actualizaciones de tareas
- **JWT** + **JS Cookie**
- **Mapbox/Leaflet** para mostrar tareas cercanas
- **Lucide React** para iconos
- **Date-fns** para fechas y horarios
- **Sonner** para notificaciones
- **React Context API** para auth, usuario y filtros

### Backend

- **Node.js** con **Express.js**
- **Prisma**
- **MySQL**
- **Socket.io**
- **JWT**
- **Stripe API** o Swish para pagos de micro‑tareas
- **BankID API** para verificación
- **Cloudinary** para imágenes (perfiles, fotos de tareas)

### Base de Datos y Almacenamiento

- **MySQL** relacional
- **Cloudinary** para imágenes

### Búsqueda y Analytics

- Búsqueda por tipo de tarea, precio, distancia
- **Google Analytics 4** para métricas de uso

### Monitoreo y Seguridad

- **Vercel Analytics** o **PM2 + logs**
- **Helmet.js**, **rate limiting**, validación de inputs

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo           | Tipo                     | Descripción                         |
|-----------------|--------------------------|-------------------------------------|
| id              | UUID (PK)                | Identificador único                 |
| name            | String                   | Nombre completo                     |
| email           | String (Unique)          | Correo electrónico                  |
| phone           | String                   | Teléfono                            |
| bankid_verified | Boolean                  | Verificado con BankID               |
| profile_image   | String                   | URL de imagen de perfil             |
| bio             | Text                     | Descripción breve                   |
| rating          | Decimal(3,2)             | Media de valoraciones               |
| is_active       | Boolean                  | Activo/inactivo                     |
| created_at      | Timestamp                | Fecha de registro                   |
| updated_at      | Timestamp                | Última actualización                |

### Tabla: tasks

| Campo        | Tipo                                       | Descripción                          |
|--------------|--------------------------------------------|--------------------------------------|
| id           | UUID (PK)                                  | Identificador único                  |
| creator_id   | UUID (FK → users)                          | Usuario que crea la tarea            |
| helper_id    | UUID (FK → users, nullable)                | Usuario que acepta la tarea          |
| title        | String                                     | Título de la tarea                   |
| description  | Text                                       | Descripción detallada                |
| category     | String                                     | Categoría (nieve, plantas, recados…) |
| price        | Decimal(10,2)                              | Precio ofrecido (puede ser 0)        |
| status       | Enum (open, accepted, completed, canceled) | Estado de la tarea                   |
| location     | JSON                                       | Coordenadas aproximadas              |
| created_at   | Timestamp                                  | Fecha de creación                    |
| updated_at   | Timestamp                                  | Última actualización                 |
| completed_at | Timestamp                                  | Fecha de finalización                |

### Tabla: task_images

| Campo      | Tipo                   | Descripción                          |
|------------|------------------------|--------------------------------------|
| id         | UUID (PK)              | Identificador único                  |
| task_id    | UUID (FK → tasks)      | Tarea asociada                       |
| url        | String                 | URL de imagen                        |
| created_at | Timestamp              | Fecha de creación                    |

### Tabla: payments

| Campo              | Tipo                                   | Descripción                          |
|--------------------|----------------------------------------|--------------------------------------|
| id                 | UUID (PK)                              | Identificador único                  |
| task_id            | UUID (FK → tasks)                      | Tarea asociada                       |
| payer_id           | UUID (FK → users)                      | Usuario que paga                     |
| receiver_id        | UUID (FK → users)                      | Usuario que recibe el pago           |
| amount             | Decimal(10,2)                          | Importe                              |
| provider           | Enum (stripe, swish)                   | Proveedor de pago                    |
| provider_payment_id| String                                 | ID de pago externo                   |
| status             | Enum (pending, paid, failed, refunded) | Estado del pago                      |
| created_at         | Timestamp                              | Fecha de creación                    |

### Tabla: reviews

| Campo      | Tipo                   | Descripción                          |
|------------|------------------------|--------------------------------------|
| id         | UUID (PK)              | Identificador único                  |
| task_id    | UUID (FK → tasks)      | Tarea asociada                       |
| reviewer_id| UUID (FK → users)      | Usuario que reseña                   |
| reviewed_id| UUID (FK → users)      | Usuario reseñado                     |
| rating     | Integer                | Calificación (1-5)                   |
| comment    | Text                   | Comentario                           |
| created_at | Timestamp              | Fecha de creación                    |

### Tabla: notifications

| Campo      | Tipo                                 | Descripción                          |
|------------|--------------------------------------|--------------------------------------|
| id         | UUID (PK)                            | Identificador único                  |
| user_id    | UUID (FK → users)                    | Usuario destinatario                 |
| type       | Enum (task, payment, review, system) | Tipo de notificación                 |
| title      | String                               | Título                               |
| message    | Text                                 | Mensaje                              |
| is_read    | Boolean                              | Leída/no leída                       |
| created_at | Timestamp                            | Fecha de creación                    |

## 🔧 Funcionalidades Principales

### 1. Feed de Micro‑Tareas

- **Listado de tareas cercanas**: Ordenadas por distancia y fecha.
- **Filtros**: Categoría, precio, estado.
- **Detalle de tarea**: Descripción, ubicación aproximada, creador.

### 2. Creación y Gestión de Tareas

- **Crear tarea**: Título, descripción, precio, categoría, ubicación.
- **Editar/cancelar**: Mientras esté en estado “open”.
- **Aceptar tarea**: Un vecino la toma y pasa a “accepted”.

### 3. Finalización y Pagos

- **Marcar como completada**: Creador confirma que la tarea se ha realizado.
- **Pago**: Stripe o Swish para transferir el importe al ayudante.
- **Historial**: Listado de tareas realizadas y pagos asociados.

### 4. Reputación y Comunidad

- **Valoraciones**: Creador y ayudante se valoran mutuamente.
- **Perfil público**: Rating, número de tareas completadas.
- **Reportes**: Posibilidad de reportar comportamientos inadecuados.

### 5. Notificaciones y Tiempo Real

- **Actualizaciones en tiempo real**: Nuevas tareas, aceptaciones, cambios de estado.
- **Centro de notificaciones**: Historial por usuario.
- **Preferencias**: Configuración de tipos de avisos.
