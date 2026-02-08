# Blurry - Especificaciones Técnicas

## 📋 Descripción del Proyecto

Blurry es una plataforma de citas moderna que conecta personas basándose en compatibilidad inteligente. Ofrece matching por IA, chat en tiempo real, videollamadas integradas y un sistema de gamificación con tokens para mejorar la experiencia del usuario.

## 🎯 Objetivos Principales

- Proporcionar matches de alta calidad mediante algoritmos de compatibilidad inteligentes
- Facilitar comunicación fluida con chat en tiempo real y videollamadas
- Gamificar la experiencia con sistema de tokens y recompensas
- Mantener una comunidad segura con herramientas de moderación robustas
- Ofrecer panel administrativo completo para gestión de la plataforma

## 🛠 Stack Tecnológico

### Frontend (Client)

- **Next.js 16** con App Router para SSR y optimización
- **TypeScript** para type safety
- **Tailwind CSS** para estilos responsivos
- **Socket.IO Client** para WebSockets
- **WebRTC** para videollamadas P2P
- **Context API** para gestión de estado global
- **React Hook Form** para formularios optimizados
- **Axios** para peticiones HTTP

### Backend (Server)

- **NestJS** con arquitectura modular y escalable
- **TypeORM** como ORM principal
- **MySQL** como base de datos relacional
- **Redis** para cache y sesiones
- **JWT** para autenticación
- **Socket.IO** para comunicación en tiempo real
- **joi** para validación de datos
- **bcryptjs** para encriptación de contraseñas
- **Jest** para testing unitario y e2e

### Infraestructura

- **MySQL** para almacenamiento persistente
- **Redis** para cache y colas de mensajes
- **Docker** para contenedores
- **Nginx** como reverse proxy
- **PM2** para gestión de procesos

### APIs y Servicios Externos

- **FastAPI (microservicio IA)** para algoritmos de matching
- **WebRTC** para videollamadas P2P
- **AWS S3** / **Cloudinary** para almacenamiento de imágenes
- **Firebase Cloud Messaging** para notificaciones push

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único usuario |
| username | VARCHAR(50) | Nombre de usuario único |
| email | VARCHAR(255) | Email único |
| password | VARCHAR(255) | Hash de contraseña |
| role | ENUM | user, admin |
| age | INT | Edad del usuario |
| gender | ENUM | male, female, other |
| bio | TEXT | Biografía del usuario |
| photos | JSON | Array de URLs de fotos |
| interests | JSON | Array de intereses |
| preferences | JSON | Preferencias de matching |
| tokens | INT | Balance de tokens |
| isActive | BOOLEAN | Cuenta activa/suspendida |
| lastActive | TIMESTAMP | Última actividad |
| createdAt | TIMESTAMP | Fecha de creación |
| updatedAt | TIMESTAMP | Fecha de actualización |

### Tabla: matches

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único del match |
| userId1 | UUID (FK) | Primer usuario |
| userId2 | UUID (FK) | Segundo usuario |
| compatibilityScore | DECIMAL | Score de compatibilidad (0-100) |
| status | ENUM | pending, matched, unmatched |
| createdAt | TIMESTAMP | Fecha del match |

### Tabla: messages

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único del mensaje |
| senderId | UUID (FK) | Usuario que envía |
| receiverId | UUID (FK) | Usuario que recibe |
| matchId | UUID (FK) | Match asociado |
| content | TEXT | Contenido del mensaje |
| isRead | BOOLEAN | Mensaje leído |
| createdAt | TIMESTAMP | Fecha de envío |

### Tabla: swipes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único del swipe |
| userId | UUID (FK) | Usuario que hace swipe |
| targetUserId | UUID (FK) | Usuario objetivo |
| type | ENUM | like, dislike, superlike |
| createdAt | TIMESTAMP | Fecha del swipe |

### Tabla: token_transactions

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único transacción |
| userId | UUID (FK) | Usuario |
| amount | INT | Cantidad de tokens |
| type | ENUM | earn, spend, purchase |
| description | VARCHAR(255) | Descripción |
| createdAt | TIMESTAMP | Fecha de transacción |

### Tabla: reports

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único del reporte |
| reporterId | UUID (FK) | Usuario que reporta |
| reportedUserId | UUID (FK) | Usuario reportado |
| category | ENUM | harassment, fake, inappropriate, other |
| description | TEXT | Detalle del reporte |
| status | ENUM | pending, reviewed, resolved |
| createdAt | TIMESTAMP | Fecha del reporte |
| resolvedAt | TIMESTAMP | Fecha de resolución |

### Tabla: notifications

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único notificación |
| userId | UUID (FK) | Usuario destinatario |
| type | ENUM | match, message, like, system |
| content | TEXT | Contenido notificación |
| isRead | BOOLEAN | Notificación leída |
| createdAt | TIMESTAMP | Fecha de creación |

### Tabla: video_calls

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID (PK) | ID único llamada |
| callerId | UUID (FK) | Usuario que llama |
| receiverId | UUID (FK) | Usuario que recibe |
| status | ENUM | calling, active, ended, declined |
| duration | INT | Duración en segundos |
| startedAt | TIMESTAMP | Inicio de llamada |
| endedAt | TIMESTAMP | Fin de llamada |

## 📁 Estructura del Proyecto

```
Blurry/
├── Client/                    # Frontend Next.js
│   ├── src/
│   │   ├── app/              # App Router
│   │   │   ├── (auth)/       # Rutas autenticación
│   │   │   ├── (dashboard)/  # Dashboard principal
│   │   │   └── admin/        # Panel admin
│   │   ├── components/       # Componentes React
│   │   ├── contexts/         # Contextos globales
│   │   ├── hooks/            # Custom hooks
│   │   ├── types/            # Tipos TypeScript
│   │   └── utils/            # Utilidades
│   ├── public/               # Assets estáticos
│   └── package.json
│
├── Server/                   # Backend NestJS
│   ├── src/
│   │   ├── auth/            # Autenticación JWT
│   │   ├── users/           # Gestión usuarios
│   │   ├── matches/         # Sistema matching
│   │   ├── chat/            # Chat WebSocket
│   │   ├── tokens/          # Sistema tokens
│   │   ├── notifications/   # Notificaciones
│   │   ├── feedback/        # Reportes/feedback
│   │   ├── database/        # Entidades y seeds
│   │   └── common/          # Guards, pipes, decorators
│   └── package.json
│
└── README.md                # Este archivo
```

## 🔐 Autenticación y Seguridad

### JWT Authentication

- **Access Token**: JWT válido por 1 hora
- **Refresh Token**: Válido por 7 días
- **Storage**: Access token en memoria, Refresh en httpOnly cookie
- **Renovación**: Automática antes de expiración

### Seguridad

- **bcrypt** para hash de contraseñas (salt rounds: 10)
- **Rate limiting** en endpoints críticos
- **CORS** configurado para frontend específico
- **Helmet.js** para headers de seguridad
- **Class-validator** para validación de inputs
- **SQL Injection prevention** vía TypeORM
- **XSS protection** mediante sanitización

## 🔄 Sistema de Matching

### Algoritmo de Compatibilidad

1. **Preferencias básicas**: Edad, género, ubicación
2. **Intereses compartidos**: Scoring basado en coincidencias
3. **Comportamiento**: Análisis de swipes históricos
4. **Machine Learning**: Modelo de recomendación entrenado
5. **Score final**: Combinación ponderada (0-100)

### Cache de Matches

- **Redis** para almacenar sugerencias pre-calculadas
- Actualización cada 6 horas o tras cambios de perfil
- Pool de 50 sugerencias por usuario

## 💬 Chat en Tiempo Real

### WebSockets (Socket.IO)

- **Eventos**: `message:send`, `message:receive`, `typing:start`, `typing:stop`
- **Rooms**: Cada match tiene su propia room
- **Autenticación**: JWT en handshake
- **Persistencia**: Mensajes guardados en MySQL
- **Notificaciones**: Push cuando usuario offline

## 📹 Videollamadas (WebRTC)

### Implementación

- **Signaling**: Socket.IO para intercambio de SDP
- **STUN/TURN**: Servidores para NAT traversal
- **Peer Connection**: Conexión P2P directa
- **Fallback**: TURN relay si P2P falla
- **Límite**: Máximo 30 minutos por llamada

## 🎮 Sistema de Tokens

### Economía de Tokens

- **Inicio**: 20 tokens gratis
- **Recompensa diaria**: 5 tokens
- **Completar perfil**: 10 tokens
- **Match exitoso**: 2 tokens
- **Invitar amigo**: 15 tokens

### Usos de Tokens

- **Super Like**: 3 tokens
- **Boost (1h)**: 10 tokens
- **Ver quien te dio like**: 5 tokens
- **Rewind (deshacer swipe)**: 2 tokens

### Monetización

- Paquetes de tokens disponibles para compra
- Suscripción Premium con tokens ilimitados

## 📊 Analíticas

### Métricas de Usuario

- Total de swipes (likes/dislikes)
- Tasa de match (likes mutuos / total likes)
- Mensajes enviados/recibidos
- Tiempo promedio de respuesta
- Visitas al perfil

### Métricas de Admin

- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- Tasa de retención (D1, D7, D30)
- Matches por usuario promedio
- Tasa de conversión de chat a videollamada

## 🚀 Despliegue

### Requisitos

- **Node.js** >= 18.x
- **MySQL** >= 8.0
- **Redis** >= 6.x
- **npm** o **yarn**

### Variables de Entorno

#### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Server (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=blurry

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# AI Service
AI_SERVICE_URL=http://localhost:8000
```

### Comandos de Instalación

```bash
# Frontend
cd Client
npm install
npm run dev

# Backend
cd Server
npm install
npm run initDb  # Inicializa DB con datos de prueba
npm run start:dev
```

### Docker Compose

```bash
# Levantar toda la infraestructura
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 🧪 Testing

### Backend Tests

```bash
cd Server
npm run test           # Unit tests
npm run test:e2e       # E2E tests
npm run test:cov       # Coverage
```

### Frontend Tests

```bash
cd Client
npm run test           # Jest tests
npm run test:watch     # Watch mode
```

## 📝 Guías de Desarrollo

### Agregar un nuevo módulo (Backend)

```bash
nest g module nombre-modulo
nest g service nombre-modulo
nest g controller nombre-modulo
```

### Crear nueva ruta (Frontend)

```bash
# Crear carpeta en src/app/
mkdir src/app/nueva-ruta
touch src/app/nueva-ruta/page.tsx
```

## 🐛 Debugging

- **Frontend**: Usar React DevTools y extensión Redux (si se usa)
- **Backend**: Modo debug de NestJS con `npm run start:debug`
- **WebSockets**: Usar Socket.IO Admin UI
- **Database**: MySQL Workbench o DBeaver

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Socket.IO Docs](https://socket.io/docs/v4/)
- [WebRTC Guide](https://webrtc.org/getting-started/overview)
- [TypeORM Docs](https://typeorm.io)

## 👥 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es privado y está bajo desarrollo activo.

## 📞 Contacto

Para más información sobre el proyecto Blurry, contactar al equipo de desarrollo.
