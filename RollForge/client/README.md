
# RollForge - Cliente Web

RollForge es una plataforma web colaborativa para jugar juegos de rol de mesa en línea. Este cliente está construido con React, TypeScript y Vite, y ofrece una experiencia moderna, rápida y responsiva para jugadores y Game Masters.

## 🚀 Características principales

- Autenticación de usuarios (registro, login, recuperación de contraseña)
- Gestión de campañas, personajes y compendio
- Mapas hexagonales interactivos
- Chat y sistema de tiradas de dados en tiempo real
- Notificaciones visuales y sonoras
- Panel de usuario y preferencias de perfil
- Interfaz adaptable para escritorio y móvil

## 🛠️ Stack Tecnológico

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** para estilos
- **Socket.io-client** para comunicación en tiempo real
- **React Context API** para estado global
- **Lucide React** para iconos

## 📂 Estructura del proyecto

- `src/components/` — Componentes reutilizables y de features (auth, dashboard, chat, mapas, perfil, etc.)
- `src/context/` — Contextos globales (auth, notificaciones, juego)
- `src/services/` — Servicios para interactuar con la API
- `src/hooks/` — Hooks personalizados
- `src/types/` — Tipos y contratos TypeScript
- `src/utils/` — Utilidades y validaciones

## ▶️ Scripts útiles

- `pnpm install` — Instala las dependencias
- `pnpm dev` — Inicia el servidor de desarrollo
- `pnpm build` — Compila la aplicación para producción
- `pnpm preview` — Previsualiza el build de producción
- `pnpm lint` — Linting del código
- `pnpm format` — Formatea el código con Prettier

## ⚡ Inicio rápido

1. Instala dependencias:

   ```bash
   pnpm install
   ```

2. Inicia el entorno de desarrollo:

   ```bash
   pnpm dev
   ```

3. Accede a [http://localhost:5173](http://localhost:5173)

## 📢 Notas

- Este frontend está pensado para funcionar junto al backend de RollForge.
- Configura las variables de entorno en `.env` si es necesario.
- Para desarrollo, asegúrate de que el backend esté corriendo para probar funcionalidades en tiempo real.

---
Desarrollado con ❤️ para la comunidad rolera.
