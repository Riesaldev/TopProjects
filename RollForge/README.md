# RollForge - Especificaciones Técnicas

## 📋 Descripción del Proyecto

RollForge es una plataforma web colaborativa para jugar juegos de rol de mesa en línea. Ofrece un completo conjunto de herramientas para Game Masters (GM) y jugadores: mapas hexagonales interactivos, gestión de personajes, sistema de dados, recursos compartidos y comunicación en tiempo real.

## 🎯 Objetivos Principales

- Facilitar sesiones de rol a distancia con herramientas visuales.
- Proporcionar mapas interactivos con medición de distancias y áreas de efecto.
- Permitir la gestión completa de campañas, personajes y tokens.
- Ofrecer un sistema de recursos compartidos (mapas, PDFs, audio, música, imágenes, notas y resúmenes autogenerados de las campañas jugadas).
- Garantizar experiencia fluida con sincronización en tiempo real.
- Avisar a los jugadores sobre eventos importantes (turnos, efectos, etc.) mediante notificaciones visuales y sonoras.
- Avisos via email o wasap de próximas sesiones, cambios en la campaña o eventos importantes.

## 🛠 Stack Tecnológico

### Frontend Setup

- **React** con **Vite**
- **TypeScript** para type safety
- **Tailwind CSS** para estilos modernos
- **Socket.io-client** para comunicación en tiempo real
- **React Context API** para gestión de estado global
- **Lucide React** para iconografía
- **LocalStorage** para persistencia local

### Backend Setup

- **Node.js** con **Express.js**
- **TypeScript** para seguridad de tipos
- **MySQL** como base de datos relacional
- **Socket.io** para eventos en tiempo real
- **JWT** para autenticación stateless
- **Bcrypt** para hashing de contraseñas
- **Zod** para validación de schemas
- **Nodemailer** para envío de correos

### Testing y Calidad

- **Vitest** para unit testing
- **Supertest** para integration testing
- **ESLint** para linting
- **TypeScript** strict mode

### Almacenamiento

- **MySQL** para datos estructurados
- **File system** local para uploads (imágenes, PDFs, audio)
- Soporte futuro para **Cloudinary** o **S3**

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, AUTO_INCREMENT) | ID único de usuario |
| username | VARCHAR(50) UNIQUE | Nombre de usuario |
| email | VARCHAR(100) UNIQUE | Correo electrónico |
| password | VARCHAR(100) | Password hasheada (bcrypt) |
| recoverPassword | VARCHAR(100) | Código de recuperación hasheado |
| recoverPasswordExpires | DATETIME | Expiración del código de recuperación |
| avatar | VARCHAR(100) | URL del avatar |
| created_at | TIMESTAMP | Fecha de registro |
| updated_at | TIMESTAMP | Última actualización |

### Tabla: campaigns

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, AUTO_INCREMENT) | ID de campaña |
| name | VARCHAR(100) | Nombre de la campaña |
| description | TEXT | Descripción |
| gm_id | INT (FK → users) | Game Master |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |

### Tabla: characters

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, AUTO_INCREMENT) | ID del personaje |
| name | VARCHAR(100) | Nombre del personaje |
| image_url | TEXT | URL de imagen del personaje |
| user_id | INT (FK → users) | Propietario |
| campaign_id | INT (FK → campaigns) | Campaña asociada |

### Tabla: tokens

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, AUTO_INCREMENT) | ID del token |
| name | VARCHAR(100) | Nombre del token |
| image_url | TEXT | URL de imagen |
| character_id | INT (FK → characters) | Personaje vinculado (opcional) |
| campaign_id | INT (FK → campaigns) | Campaña |
| user_id | INT (FK → users) | Creador del token |

### Tabla: resources

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, AUTO_INCREMENT) | ID del recurso |
| name | VARCHAR(100) | Nombre del archivo |
| type | ENUM('image', 'audio', 'pdf', 'other') | Tipo de recurso |
| url | TEXT | Ruta del archivo |
| campaign_id | INT (FK → campaigns) | Campaña asociada |
| uploaded_by | INT (FK → users) | Usuario que subió |

## 🎮 Funcionalidades Principales

### 1. Sistema de Mapas Hexagonales

- **Carga de imágenes** como fondo de mapa
- **Grilla hexagonal ajustable** (flat-top) con opacidad configurable
- **Zoom independiente** para imagen y grilla
- **Herramientas de medición:**
  - **Distancia punto a punto** (1 hex = 5 ft)
  - **Área radial** (círculo de N hexágonos)
  - **Área cónica** (120° orientable)
- **Visualización clara** con colores diferenciados

### 2. Gestión de Jugadores

- **Sistema de login local** con nombre y color
- **Rol de Game Master** (GM)
- **Estado online/offline**
- **Persistencia en localStorage**
- **Colores automáticos** de una paleta predefinida

### 3. Autenticación y Seguridad

- **JWT stateless** con expiración configurable
- **Recuperación de contraseña** con código temporal
- **Rate limiting** en endpoints sensibles
- **Hashing bcrypt** para passwords
- **SMTP configurable** (Gmail, Mailtrap, etc.)

### 4. Gestión de Campañas

- Crear, editar y eliminar campañas
- Asignar Game Master
- Vincular personajes y recursos
- Historial de sesiones (futuro)

### 5. Recursos Compartidos

- Upload de mapas, PDFs y audio
- Organización por campaña
- Tipos de archivo soportados: image, audio, pdf, other

## 📡 API Endpoints (Principales)

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/users/register` | Registro de usuario |
| POST | `/api/users/login` | Login (email o username + password) |
| POST | `/api/users/password/recover` | Solicitar código de recuperación |
| POST | `/api/users/password/reset` | Resetear contraseña con código |

### Campañas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/campaigns` | Listar campañas del usuario |
| POST | `/api/campaigns` | Crear campaña |
| GET | `/api/campaigns/:id` | Detalles de campaña |
| PATCH | `/api/campaigns/:id` | Actualizar campaña |
| DELETE | `/api/campaigns/:id` | Eliminar campaña |

### Personajes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/characters` | Listar personajes |
| POST | `/api/characters` | Crear personaje |
| GET | `/api/characters/:id` | Detalles personaje |
| PATCH | `/api/characters/:id` | Actualizar personaje |
| DELETE | `/api/characters/:id` | Eliminar personaje |

### Tokens

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tokens` | Listar tokens (con filtros) |
| POST | `/api/tokens` | Crear token |
| PATCH | `/api/tokens/:id` | Actualizar token |
| DELETE | `/api/tokens/:id` | Eliminar token |

### Recursos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/resources` | Listar recursos |
| POST | `/api/resources` | Subir recurso |
| DELETE | `/api/resources/:id` | Eliminar recurso |

### Diagnósticos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/diagnostics/email` | Verificar config email |
| GET | `/health` | Health check |

## 🔧 Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- MySQL 8.0+
- npm o yarn

### Backend

```bash
cd RollForge/server
npm install

# Crear archivo .env (ver sección Variables de Entorno)
cp .env.example .env

# Inicializar base de datos (DESTRUCTIVO)
npm run initDb

# Ejecutar en desarrollo
npm run dev

# Testing
npm test

# Lint y typecheck
npm run lint
npm run typecheck
```

### Frontend

```bash
cd RollForge/client
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build
```

## 🌍 Variables de Entorno (Backend)

Crear archivo `.env` en `RollForge/server/`:

```env
# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=rollforge
DB_PORT=3306

# Servidor
PORT=3001
NODE_ENV=development

# JWT
SECRET=tu_secret_super_seguro_y_largo
JWT_EXPIRES_IN=7d

# Recuperación de contraseña
RECOVERY_CODE_MINUTES=15
RECOVERY_EMAIL_WINDOW_MS=600000
RECOVERY_EMAIL_MAX=5
RECOVERY_CLEAN_INTERVAL_MS=900000

# SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_cuenta@gmail.com
SMTP_PASS=tu_app_password_de_16_caracteres
SMTP_SECURE=false
MAIL_FROM="RollForge <tu_cuenta@gmail.com>"

# Frontend URL (para emails)
FRONTEND_URL=http://localhost:5173
APP_NAME=RollForge
```

### Configuración SMTP con Gmail

1. Activa **verificación en 2 pasos** en tu cuenta de Google
2. Ve a **Seguridad** → **Contraseñas de aplicaciones**
3. Genera una contraseña para "Correo"
4. Usa esa contraseña de 16 caracteres en `SMTP_PASS`
5. `SMTP_USER` debe ser tu correo completo
6. `MAIL_FROM` debe coincidir con tu correo

## 🧪 Testing

```bash
# Backend
cd server
npm test

# Frontend (pendiente)
cd client
npm test
```

**Cobertura actual:**

- ✅ Registro y login de usuarios
- ✅ Recuperación de contraseña
- ✅ CRUD de campañas
- ✅ Autenticación JWT

## 📂 Estructura del Proyecto

```
RollForge/
├── client/                      # Frontend React
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── DraggableResizable.tsx
│   │   │   ├── HexGridMap.tsx
│   │   │   ├── PlayerList.tsx
│   │   │   └── Tools.tsx
│   │   ├── context/             # Context API
│   │   │   └── PlayersContext.tsx
│   │   ├── utils/               # Utilidades
│   │   │   └── hex.ts           # Lógica hexagonal
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── server/                      # Backend Node.js
    ├── src/
    │   ├── config/              # Configuración
    │   ├── controllers/         # Lógica de negocio
    │   ├── db/                  # Conexión y schemas
    │   │   ├── getPool.ts
    │   │   └── initDb.ts
    │   ├── jobs/                # Tareas programadas
    │   ├── middlewares/         # Middlewares Express
    │   │   └── authUser.ts
    │   ├── models/              # Modelos de datos
    │   ├── routes/              # Definición de rutas
    │   ├── schemas/             # Validación Zod
    │   │   ├── campaign.ts
    │   │   ├── pjs.ts
    │   │   ├── resources.ts
    │   │   └── tokens.ts
    │   ├── tests/               # Tests Vitest + Supertest
    │   └── utils/               # Utilidades
    │       ├── email/
    │       │   └── sendEmail.ts
    │       └── generateErrorUtil.ts
    ├── uploads/                 # Archivos subidos
    ├── app.ts                   # Entry point
    ├── package.json
    └── tsconfig.json
```

## 🚀 Características Futuras

### Corto Plazo

- [ ] Drag & drop de tokens en el mapa hexagonal
- [ ] Sistema de iniciativa automático
- [ ] Chat en tiempo real con Socket.io
- [ ] Tiradas de dados integradas (D&D, Pathfinder, etc.)

### Medio Plazo

- [ ] Bloqueo de visión para jugadores (fog of war)
- [ ] Zoom con rueda del ratón
- [ ] Áreas lineales y personalizadas
- [ ] Múltiples tokens por jugador (GM)
- [ ] Galería de mapas y tokens prediseñados

### Largo Plazo

- [ ] Sistema de hojas de personaje completo
- [ ] Integración con PDFs externos (Google Drive)
- [ ] Guardado de estado de partidas
- [ ] Videollamadas integradas (WebRTC)
- [ ] Modo offline con sincronización posterior

## 🎨 Características Destacadas

✅ **Mapa hexagonal interactivo** con herramientas de medición  
✅ **Sistema de autenticación** robusto con recuperación de contraseña  
✅ **Arquitectura modular** con separación clara frontend/backend  
✅ **TypeScript** en ambos lados para mayor seguridad  
✅ **Testing completo** del backend con Vitest  
✅ **Validación estricta** con Zod schemas  
✅ **Email transaccional** configurable (Gmail, SMTP)  
✅ **Persistencia local** para experiencia offline  

## 🐛 Problemas Conocidos

- Las áreas cónicas tienen aproximación de 6 direcciones (mejora pendiente)
- El zoom del mapa no soporta rueda del ratón todavía
- Los tokens no son arrastrables aún en el mapa
- No hay sincronización en tiempo real del mapa (solo local)
- Falta sistema de iniciativa y tiradas de dados integradas
- El chat en tiempo real aún no está implementado
- La gestión de sesiones y guardado de estado es futura
- La interfaz de usuario es funcional pero puede mejorar en diseño y usabilidad
- La seguridad es básica, falta endurecimiento y pruebas de penetración
- La escalabilidad no ha sido probada con muchos usuarios simultáneos
- El sistema de recursos es básico, falta organización y previsualización
- La experiencia móvil no ha sido optimizada aún

## 📄 Licencia

MIT

---
