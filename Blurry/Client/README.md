# Blurry Client (Frontend) ���

Aplicación frontend construida con **Next.js** (App Router), enfocada en un diseño **Premium Oscuro** utilizando **Tailwind CSS** y **Framer Motion**.

## ��� Diseño y UI

El frontend ha sido completamente refactorizado para soportar una estética moderna:
- **Colores:** Fondos en `zinc-950`, acentos en `accent-500`, gradientes radiantes.
- **Efectos:** Componentes con estilo *Glassmorphism* (Backdrop Blur), bordes semi-transparentes blancos/plateados.
- **Interactividad:** La landing page cuenta con un efecto distintivo "Blur Reveal" interactivo al pasar el cursor.

## ��� Inicio Rápido

```bash
cd Client
npm install
npm run dev
```

## ��� Estructura Principal

- `src/app/`: Rutas principales basadas en Next.js App Router (User, Admin, Auth, Tokens, Legal).
- `src/components/`: Componentes reutilizables adaptados al diseño premium (Cards, Forms, Navbars).
- `src/context/`: Manejo de estado global y WebSockets (Auth, Notificaciones).
