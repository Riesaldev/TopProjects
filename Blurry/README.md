# Blurry - Premium Dating App ���

Blurry es una plataforma de citas moderna, orientada a la privacidad, las videollamadas y la gamificación. Recientemente rediseñada con una estética **Premium Dark Mode y Glassmorphism**, ofreciendo una experiencia inmersiva para los usuarios.

## ��� Características Destacadas

- **Premium UI/UX:** Interfaz en modo oscuro profundo (`zinc-950`), efectos de glassmorphism y animaciones fluidas con `framer-motion`.
- **Blurry Effect:** Sistema único de revelación de perfiles (Blur to Clear) mediante interacciones o tokens.
- **Videollamadas y Chat:** Integración en tiempo real (WebSockets) para citas virtuales.
- **Sistema de Tokens:** Economía virtual para enviar regalos, habilitar características exclusivas y potenciar el perfil.
- **Panel de Administración Completo:** Control total sobre usuarios, métricas, denuncias y configuración del sistema.

## ��� Stack Tecnológico

### Frontend (Client)

- **Next.js (App Router)** + React
- **Tailwind CSS** (Tema oscuro por defecto) + Tailwind Merge
- **Framer Motion** (Animaciones interactivas)
- Socket.io Client

### Backend (Server)

- **NestJS** (Framework robusto y modular)
- **PostgreSQL + TypeORM** (Base de datos relacional)
- **Socket.io** (Gateways en tiempo real)
- Seguridad Integral (JWT, Roles, Rate Limiting)

## ��� Estructura del Repositorio

- `/Client`: Aplicación Frontend en Next.js.
- `/Server`: API Backend en NestJS.

---
_Nota: Cada proyecto tiene su propio README con instrucciones de despliegue._

## Checklist UX

- Ver `UX_CHECKLIST.md` para la validacion manual de flujos criticos (registro, login, compra de tokens, reportes y videollamada).
