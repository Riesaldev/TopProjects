# NäraPaws - Especificaciones Técnicas

## 📋 Descripción del Proyecto

NäraPaws es una plataforma hiperlocal que conecta **dueños de perros** con **vecinos verificados** dispuestos a ofrecer paseos, visitas rápidas o cuidado puntual. Se centra en la confianza (BankID), la proximidad geográfica y la recurrencia de servicios.

## 🎯 Objetivos Principales

- Facilitar paseos y cuidados puntuales de perros entre vecinos cercanos.
- Garantizar confianza mediante verificación de identidad (BankID).
- Ofrecer un sistema de reservas, pagos y valoraciones sencillo.
- Permitir acuerdos recurrentes (paseos semanales, horarios fijos).
- Crear una comunidad local alrededor del bienestar animal.

## 🛠 Stack Tecnológico

### Frontend

- **Next.js 16** con **React**
- **TailwindCSS**
- **React Query**
- **React Hook Form** + **Zod**
- **Socket.io Client** para actualizaciones de reservas
- **JWT** + **JS Cookie**
- **Mapbox/Leaflet** para mostrar paseadores cercanos
- **Lucide React** para iconos
- **Date-fns** para manejo de horarios y fechas
- **Sonner** para notificaciones toast
- **React Context API** para auth, usuario y filtros de búsqueda

### Backend


- **Node.js** con **Express.js**
- **Prisma** (ORM moderno)
- **MySQL**
- **Socket.io** (tiempo real)
- **JWT** (jsonwebtoken)
- **Stripe API** o Swish (según mercado) para pagos
- **BankID API** para verificación
- **Cloudinary** para imágenes (perros, perfiles)
- **Helmet.js** (seguridad HTTP)
- **express-rate-limit** (rate limiting)
- **Joi** (validación de datos)
- **cookie-parser** (gestión de cookies)
- **morgan** (logging de peticiones)
- **compression** (Gzip)
- **swagger-ui-express** + **swagger-jsdoc** (documentación de API)
- **winston** (logging avanzado)
- **pm2** (monitoreo/clusterización producción)
- **dotenv** (variables de entorno)
- **cross-env** (entornos multiplataforma)

### Instalación Backend

Para instalar todas las dependencias necesarias para el backend, ejecuta:

```sh
pnpm add express cors dotenv mysql2 @prisma/client prisma jsonwebtoken socket.io stripe helmet express-rate-limit cloudinary joi cookie-parser morgan compression cross-env swagger-ui-express swagger-jsdoc winston
pnpm add -D pm2
```

Esto asegura un entorno moderno, seguro y escalable, alineado con las mejores prácticas de 2026.

### Base de Datos y Almacenamiento

- **MySQL** relacional
- **Cloudinary** para imágenes

### Búsqueda y Analytics

- Búsqueda por radio, tipo de servicio y disponibilidad
- **Google Analytics 4** para métricas y funnels de conversión

### Monitoreo y Seguridad

- **Vercel Analytics** o **PM2 + logs**
- **Helmet.js**, **rate limiting**, validación estricta

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo           | Tipo                              | Descripción                     |
|-----------------|-----------------------------------|---------------------------------|
| id              | UUID (PK)                         | Identificador único             |
| name            | String                            | Nombre completo                 |
| email           | String (Unique)                   | Correo electrónico              |
| phone           | String                            | Teléfono                        |
| role            | Enum (owner, walker, both, admin) | Rol del usuario                 |
| bankid_verified | Boolean                           | Verificado con BankID           |
| profile_image   | String                            | URL de imagen de perfil         |
| bio             | Text                              | Descripción breve               |
| is_active       | Boolean                           | Activo/inactivo                 |
| created_at      | Timestamp                         | Fecha de registro               |
| updated_at      | Timestamp                         | Última actualización            |

### Tabla: dogs

| Campo     | Tipo                        | Descripción            |
|---------- |-----------------------------|------------------------|
| id        | UUID (PK)                   | Identificador único    |
| owner_id  | UUID (FK → users)           | Dueño                  |
| name      | String                      | Nombre del perro       |
| breed     | String                      | Raza                   |
| age       | Integer                     | Edad                   |
| size      | Enum (small, medium, large) | Tamaño                 |
| notes     | Text                        | Notas especiales       |
| image     | String                      | URL de imagen          |
| is_active | Boolean                     | Activo/inactivo        |

### Tabla: walker_profiles

| Campo          | Tipo               | Descripción            |
|----------------|--------------------|------------------------|
| id             | UUID (PK)          | Identificador único    |
| user_id        | UUID (FK → users)  | Usuario paseador       |
| radius_km      | Decimal(4,1)       | Radio de servicio      |
| price_per_walk | Decimal(10,2)      | Precio por paseo       |
| availability   | JSON               | Horarios disponibles   |
| rating         | Decimal(3,2)       | Media de valoraciones  |
| is_active      | Boolean            | Activo/inactivo        |

### Tabla: bookings

| Campo      | Tipo                                                    | Descripción          |
|------------|---------------------------------------------------------|----------------------|
| id         | UUID (PK)                                               | Identificador único  |
| owner_id   | UUID (FK → users)                                       | Dueño del perro      |
| walker_id  | UUID (FK → users)                                       | Paseador             |
| dog_id     | UUID (FK → dogs)                                        | Perro                |
| status     | Enum (pending, accepted, rejected, completed, canceled) | Estado de la reserva |
| start_time | Timestamp                                               | Inicio del paseo     |
| end_time   | Timestamp                                               | Fin estimado         |
| price      | Decimal(10,2)                                           | Precio acordado      |
| created_at | Timestamp                                               | Fecha de creación    |
| updated_at | Timestamp                                               | Última actualización |

### Tabla: payments

| Campo               | Tipo                                    | Descripción          |
|---------------------|-----------------------------------------|----------------------|
| id                  | UUID (PK)                               | Identificador único  |
| booking_id          | UUID (FK → bookings)                    | Reserva asociada     |
| user_id             | UUID (FK → users)                       | Usuario que paga     |
| amount              | Decimal(10,2)                           | Importe              |
| provider            | Enum (stripe, swish)                    | Proveedor de pago    |
| provider_payment_id | String                                  | ID de pago externo   |
| status              | Enum (pending, paid, failed, refunded)  | Estado del pago      |
| created_at          | Timestamp                               | Fecha de creación    |

### Tabla: reviews

| Campo       | Tipo                  | Descripción          |
|-------------|-----------------------|----------------------|
| id          | UUID (PK)             | Identificador único  |
| booking_id  | UUID (FK → bookings)  | Reserva asociada     |
| reviewer_id | UUID (FK → users)     | Usuario que reseña   |
| reviewed_id | UUID (FK → users)     | Usuario reseñado     |
| rating      | Integer               | Calificación (1-5)   |
| comment     | Text                  | Comentario           |
| created_at  | Timestamp             | Fecha de creación    |

### Tabla: notifications

| Campo      | Tipo                                     | Descripción            |
|------------|------------------------------------------|------------------------|
| id         | UUID (PK)                                | Identificador único    |
| user_id    | UUID (FK → users)                        | Usuario destinatario   |
| type       | Enum (booking, payment, review, system)  | Tipo de notificación   |
| title      | String                                   | Título                 |
| message    | Text                                     | Mensaje                |
| is_read    | Boolean                                  | Leída/no leída         |
| created_at | Timestamp                                | Fecha de creación      |

## 🔧 Funcionalidades Principales

### 1. Marketplace de Paseadores

- **Exploración de paseadores**: Listado de paseadores cercanos según radio y ubicación.
- **Filtros avanzados**: Precio, disponibilidad, tamaño de perro aceptado.
- **Perfiles detallados**: Experiencia, valoraciones, radio de servicio.

### 2. Gestión de Perros

- **Registro de perros**: Ficha con datos básicos, notas y foto.
- **Asociación a reservas**: Selección del perro para cada paseo.
- **Historial de paseos**: Listado de reservas por perro.

### 3. Reservas y Agenda

- **Creación de reservas**: Selección de paseador, perro, fecha y hora.
- **Gestión de estado**: Aceptar, rechazar, cancelar.
- **Recordatorios**: Notificaciones antes del paseo.

### 4. Pagos y Facturación

- **Pagos seguros**: Stripe o Swish según mercado.
- **Historial de pagos**: Listado de transacciones.
- **Gestión de fallos**: Notificaciones por pagos fallidos.

### 5. Valoraciones y Reputación

- **Sistema de reseñas**: Dueños y paseadores se valoran mutuamente.
- **Rating visible**: Media de valoraciones en el perfil.
- **Moderación básica**: Reporte de reseñas inapropiadas.

### 6. Notificaciones y Tiempo Real

- **Actualizaciones en tiempo real**: Cambios de estado de reservas.
- **Centro de notificaciones**: Historial por usuario.
- **Preferencias**: Configuración de tipos de avisos.

---
