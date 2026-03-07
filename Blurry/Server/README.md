# Blurry Server (Backend)

Backend de Blurry construido con NestJS + TypeORM sobre MySQL.

## Quick Start

```bash
cd Server
npm install

# crea .env desde ejemplo
cp .env.example .env

# desarrollo
npm run dev
```

Variables importantes en `.env`:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `JWT_SECRET`
- `FRONTEND_URL`
- `PORT`

## Scripts utiles

- `npm run dev`: levanta el backend en modo watch.
- `npm run build`: compila a `dist/`.
- `npm run initDb`: bootstrap local de BD (uso dev).
- `npm run db:patch:dev`: crea tablas admin faltantes en local (uso dev).
- `npm run db:seed:admin:dev`: inserta datos demo para dashboard admin (uso dev).

## Estructura

- `src/main.ts`: arranque de NestJS (CORS, pipes globales).
- `src/app.module.ts`: composicion de modulos de negocio.
- `src/modules/*`: dominios (auth, users, reports, sanctions, matches, etc.).
- `src/gateways/chat.gateway.ts`: eventos realtime por websockets.
- `src/database/entities/*`: modelo actual de tablas.
- `src/database/migrations/*`: cambios versionados de esquema.

## Migrations y esquema

La aplicacion usa `synchronize: false` en la configuracion principal para evitar cambios automáticos peligrosos en BD.

Regla recomendada:

1. Cambiar entidad.
2. Crear migration correspondiente.
3. Ejecutar migrations en cada entorno.

No relies solo en cambios de `entities` para produccion: si la migration no corre, el codigo y la BD quedan desalineados.

## Notas

- Se elimino el boilerplate inicial `Hello World` para evitar ruido y mantener solo endpoints de negocio.
- Los scripts bajo `scripts/dev/` son utilidades temporales para entorno local.
