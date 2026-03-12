# MinX

MinX es una plataforma de mensajería y red social moderna, compuesta por un cliente web (React + Vite + TypeScript) y un servidor backend (Node.js + Express). Permite a los usuarios registrarse, iniciar sesión, enviar mensajes públicos y privados, gestionar contactos y personalizar su perfil.

## Características principales

- **Autenticación de usuarios**: Registro, inicio de sesión y recuperación de contraseña.
- **Mensajería pública y privada**: Envío de mensajes en tiempo real y mensajes privados entre contactos.
- **Gestión de contactos**: Solicitudes, aceptación y listado de contactos.
- **Perfiles de usuario**: Edición de biografía, avatar y visualización de perfiles.
- **Sistema de likes**: Da "me gusta" a mensajes.
- **Notificaciones en tiempo real**: WebSockets para chat y presencia.
- **Panel de administración**: (Opcional, según desarrollo futuro).

## Estructura del proyecto

```
MinX/
├── client/   # Frontend (React, Vite, TypeScript)
├── server/   # Backend (Node.js, Express)
└── uploads/  # Archivos subidos (avatares, etc.)
```

### client/

- `src/components/`: Componentes reutilizables (LoginForm, ChatPanel, etc.)
- `src/pages/`: Páginas principales (Home, Login, Register, etc.)
- `src/context/`: Contextos globales (UserContext)
- `src/hooks/`: Hooks personalizados (useChatSocket)

### server/

- `src/controllers/`: Lógica de rutas y controladores (usuarios, mensajes, contactos)
- `src/models/`: Acceso a datos y modelos de base de datos
- `src/routes/`: Definición de rutas Express
- `src/middlewares/`: Middlewares de autenticación y validación
- `src/utils/`: Utilidades varias
- `src/ws/`: WebSocket server y gestión de presencia

## Instalación y ejecución

### Requisitos

- Node.js >= 18
- npm >= 9

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## Licencia

MIT
