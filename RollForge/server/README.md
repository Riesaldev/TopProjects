
# RollForge Server

Backend Express + Socket.io para la plataforma RollForge (juegos de rol online).

## 🚀 Stack Tecnológico

- **Node.js** + **TypeScript** (ESM)
- **Express 5**
- **MySQL 8** (`mysql2`)
- **JWT** (`jsonwebtoken`) + **bcryptjs**
- **Socket.io** (tiempo real)
- **Zod** (validación)
- **Nodemailer** (emails)

## ⚡ Instalación y uso

```bash
# 1. Instala dependencias
cd server
pnpm install   # o npm install

# 2. Configura el entorno
cp .env.example .env
# Edita .env con tus credenciales de DB, JWT y SMTP

# 3. Inicializa la base de datos (crea tablas y estructura)
pnpm run initDb
# o manualmente:
# mysql -u root -p < schema.sql

# 4. Inicia el servidor de desarrollo
pnpm run dev   # http://localhost:3001
```

## 📂 Estructura del proyecto

```
server/
├── schema.sql              # Esquema de la base de datos
├── .env.example            # Variables de entorno ejemplo
└── src/
    ├── index.ts            # Bootstrap + Socket.io
    ├── config/             # DB y entorno
    ├── types/              # Tipos TypeScript
    ├── middlewares/        # Middlewares Express
    ├── utils/              # Utilidades y validaciones
    ├── controllers/        # Lógica de rutas
    └── routes/             # Endpoints agrupados
```

## 🛠️ Scripts útiles

- `pnpm run dev` — Servidor en modo desarrollo
- `pnpm run build` — Compila a dist/
- `pnpm run start` — Ejecuta el build
- `pnpm run lint` — Linting del código fuente
- `pnpm run initDb` — Inicializa la base de datos (estructura)

## 🔐 Usuario demo

Por defecto **NO** se crea ningún usuario demo automáticamente en la base de datos. Si quieres un usuario de pruebas (por ejemplo, <demo@rollforge.com> / demo1234), créalo manualmente o añade un script de seed.

## 📑 Endpoints principales

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/login` | ✗ | Login |
| POST | `/api/auth/register` | ✗ | Registro |
| POST | `/api/auth/recover-password` | ✗ | Solicitar reset password |
| POST | `/api/auth/reset-password` | ✗ | Reset password con token |
| GET | `/api/auth/me` | ✓ | Usuario actual |
| GET | `/api/campaigns` | ✓ | Listar campañas |
| POST | `/api/campaigns` | ✓ | Crear campaña |
| GET | `/api/campaigns/:id` | ✓ | Ver campaña |
| PATCH | `/api/campaigns/:id` | ✓ | Editar campaña (owner) |
| DELETE | `/api/campaigns/:id` | ✓ | Eliminar campaña (owner) |
| GET | `/api/characters[?campaign_id=X]` | ✓ | Listar personajes |
| POST | `/api/characters` | ✓ | Crear personaje |
| GET | `/api/characters/:id` | ✓ | Ver personaje |
| PATCH | `/api/characters/:id` | ✓ | Editar personaje |
| DELETE | `/api/characters/:id` | ✓ | Eliminar personaje |
| GET | `/api/resources?campaign_id=X[&type=Y]` | ✓ | Listar recursos |
| POST | `/api/resources` | ✓ | Subir recurso (multipart) |
| DELETE | `/api/resources/:id` | ✓ | Eliminar recurso |
| GET | `/health` | ✗ | Health check |

## 🔄 Eventos Socket.io

| Evento (emit) | Payload | Descripción |
|---|---|---|
| `join:campaign` | `campaignId` | Unirse a sala de campaña |
| `leave:campaign` | `campaignId` | Salir de sala de campaña |
| `dice:roll` | `{ campaign_id, roll, result }` | Tirada de dados |
| `dice:result` | `{ campaign_id, roll, result, user_id }` | Resultado de tirada |

---
Desarrollado para la comunidad rolera.
