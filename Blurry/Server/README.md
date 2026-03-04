# Blurry Server (Backend) ⚙️

API Backend construida con **NestJS** y **PostgreSQL**. Soporta todas las interacciones en tiempo real de Blurry, gestión de usuarios, tokens y mensajería a través de WebSockets.

## ��� Inicio Rápido

```bash
cd Server
npm install

# Correr migraciones de base de datos
npm run typeorm:run-migrations

# Iniciar servidor en desarrollo
npm run start:dev
```

## ��� Estructura Principal

- `src/modules/`: Módulos principales: Auth, Users, Tokens, Matches, Reports, Activity Logs.
- `src/gateways/`: Gateways de WebSockets (Chat, Notifications).
- `src/database/`: Configuración TypeORM, Entidades y Migraciones PostgreSQL.

## ��� Autenticación y Seguridad

Utiliza guards de NestJS y JWT para asegurar perfiles de usuario y accesos de administración mediante roles.
