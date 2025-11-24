# Blurry Server

API backend para la aplicación de citas Blurry, desarrollada con NestJS, TypeORM y TypeScript.

## Características

- **Framework NestJS**: Arquitectura modular y escalable
- **Autenticación JWT**: Sistema de login/registro seguro con Passport
- **Gestión de usuarios**: CRUD completo con roles (user/admin)
- **Sistema de matching**: Algoritmos de compatibilidad con IA
- **Tokens y recompensas**: Sistema de gamificación
- **Chat en tiempo real**: WebSockets con Socket.IO
- **Videollamadas**: Integración con WebRTC
- **Base de datos MySQL**: Almacenamiento con TypeORM
- **Cache con Redis**: Optimización de rendimiento
- **Validación robusta**: Class-validator para datos
- **Microservicios**: Integración con FastAPI para IA

## Tecnologías

- **NestJS** + **TypeScript**
- **MySQL** + **TypeORM**
- **Redis** para cache
- **Socket.IO** para WebSockets
- **JWT** + **Passport** para autenticación
- **Class-validator** para validación
- **bcryptjs** para encriptación

## Estructura del proyecto

```
Server/
├── src/
│   ├── auth/              # Módulo de autenticación
│   ├── users/             # Gestión de usuarios
│   ├── matches/           # Sistema de matching
│   ├── tokens/            # Sistema de tokens/recompensas
│   ├── chat/              # Chat en tiempo real
│   ├── notifications/     # Sistema de notificaciones
│   ├── feedback/          # Sistema de reportes/feedback
│   ├── database/          # Configuración de BD y seeds
│   │   ├── entities/      # Entidades de TypeORM
│   │   └── initDb.ts      # Inicialización y seed
│   ├── common/            # Guards, decorators, pipes
│   └── main.ts            # Bootstrap de la aplicación
├── test/                  # Tests e2e
└── package.json
```

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd blurry/Server
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=tu_contraseña
   DB_NAME=blurry

   JWT_SECRET=supersecreto_muy_largo_y_seguro
   FRONTEND_URL=http://localhost:3000
   PORT=3001

   # Redis (opcional)
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # Microservicio IA (opcional)
   AI_SERVICE_URL=http://localhost:8000
   ```

4. **Configurar base de datos**
   ```bash
   # Crear base de datos en MySQL
   mysql -u root -p
   CREATE DATABASE blurry;
   exit
   ```

5. **Inicializar base de datos y seed**
   ```bash
   npm run initDb
   ```

## Scripts disponibles

- `npm run start:dev` - Servidor en desarrollo con hot-reload
- `npm run start:prod` - Servidor en producción
- `npm run build` - Compilar para producción
- `npm run initdb` - Inicializar BD y crear usuarios de prueba
- `npm run test` - Ejecutar tests unitarios
- `npm run test:e2e` - Ejecutar tests end-to-end

## Usuarios de prueba

Al ejecutar `npm run initdb` se crean:

- **Usuario regular**: `user` / `user1234`
- **Usuario administrador**: `admin` / `admin1234`

## Arquitectura NestJS

### Módulos principales

- **AuthModule**: Autenticación JWT y Passport
- **UsersModule**: Gestión de usuarios y perfiles
- **MatchesModule**: Sistema de matching y compatibilidad
- **TokensModule**: Sistema de gamificación
- **ChatModule**: WebSockets y mensajería
- **NotificationsModule**: Notificaciones push
- **FeedbackModule**: Reportes y moderación

### Guards y Middleware

- **JwtAuthGuard**: Protección de rutas con JWT
- **RolesGuard**: Control de acceso por roles
- **ValidationPipe**: Validación automática de DTOs
- **CORS**: Configurado para frontend específico

## API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `POST /auth/refresh` - Refrescar token

### Usuarios
- `GET /users` - Listar usuarios (paginado)
- `GET /users/:id` - Obtener perfil específico
- `PUT /users/:id` - Actualizar perfil
- `DELETE /users/:id` - Eliminar usuario (admin)
- `POST /users/:id/upload` - Subir foto de perfil

### Matching
- `GET /matches` - Obtener matches del usuario
- `POST /matches/like` - Dar like a usuario
- `POST /matches/dislike` - Dar dislike
- `GET /matches/suggestions` - Sugerencias de IA

### Tokens
- `GET /tokens/balance` - Consultar balance
- `POST /tokens/earn` - Ganar tokens por actividad
- `POST /tokens/spend` - Gastar tokens en funciones premium

### Chat
- `GET /chat/rooms` - Salas de chat del usuario
- `GET /chat/messages/:roomId` - Historial de mensajes
- `POST /chat/send` - Enviar mensaje

### Notificaciones
- `GET /notifications` - Obtener notificaciones
- `PUT /notifications/:id/read` - Marcar como leída
- `POST /notifications/subscribe` - Suscribir a push

## WebSocket Events

### Chat
- `join_room` - Unirse a sala
- `leave_room` - Salir de sala
- `send_message` - Enviar mensaje
- `message_received` - Mensaje recibido

### Videollamadas
- `call_initiate` - Iniciar llamada
- `call_answer` - Responder llamada
- `call_reject` - Rechazar llamada
- `call_end` - Finalizar llamada

### Notificaciones
- `new_match` - Nuevo match encontrado
- `new_message` - Mensaje nuevo
- `token_earned` - Tokens ganados

## Microservicio de IA

El backend se integra con un microservicio FastAPI para:

- **Algoritmos de matching**: Compatibilidad basada en ML
- **Recomendaciones**: Sugerencias personalizadas
- **Análisis de comportamiento**: Patrones de uso
- **Moderación automática**: Detección de contenido inapropiado

Configurar URL en `AI_SERVICE_URL`

## Base de datos

### Entidades principales

```typescript
User: usuarios y perfiles
Match: relaciones entre usuarios
Token: sistema de recompensas
ChatRoom: salas de conversación
Message: mensajes del chat
Notification: notificaciones push
Report: reportes de usuarios
```

### Relaciones
- User 1:N Match (como emisor y receptor)
- User N:N ChatRoom (muchos a muchos)
- ChatRoom 1:N Message
- User 1:N Notification

## Cache con Redis

Utilizado para:
- Sesiones de usuario activas
- Cache de sugerencias de matching
- Rate limiting de APIs
- Estados de WebSocket

## Producción

### Configuración recomendada

```env
# Producción
NODE_ENV=production
DB_HOST=tu_servidor_mysql
JWT_SECRET=clave_super_segura_de_64_caracteres_minimo
FRONTEND_URL=https://tu-dominio.com

# Desactivar synchronize
TYPEORM_SYNCHRONIZE=false
```

### Consideraciones
- Usar HTTPS obligatorio
- Configurar CORS restrictivo
- Habilitar rate limiting
- Monitoreo con logs estructurados
- Backup automático de base de datos
- Redis con persistencia

## Testing

```bash
# Tests unitarios
npm run test

# Tests de integración
npm run test:e2e

# Coverage
npm run test:cov
```

## Desarrollo

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Debug mode
npm run start:debug
```

El servidor estará disponible en `http://localhost:3001`

## Licencia

MIT
