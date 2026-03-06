# TODO General - Blurry

Fecha de corte: 2026-03-05
Objetivo: cerrar gaps para pasar de MVP funcional a producto estable y presentable.

## Prioridad Alta (hacer primero)

- [x] Seguridad JWT: eliminar fallback `default_secret` y exigir `JWT_SECRET` obligatorio en backend.
- [x] Calidad de build: desactivar `ignoreBuildErrors` y `ignoreDuringBuilds` en `Client/next.config.ts`.
- [x] Corregir todos los errores de TypeScript/ESLint que aparezcan al activar build estricto.
- [x] Centralizar control de acceso admin en middleware/layout (no confiar solo en checks en componentes).
- [x] Definir y aplicar manejo uniforme de errores en API routes (status, shape, mensajes).

## UX/UI

- [x] Unificar estados de carga/error/vacio en todas las vistas de usuario y admin.
- [x] Revisar consistencia visual de badges, botones y estados deshabilitados en todas las pantallas.
- [x] Estandarizar feedback al usuario (toasts y mensajes) para operaciones exitosas, parciales y fallidas.
- [x] Validar responsive real (mobile/tablet/desktop) en dashboard, videollamada, juegos y admin.
- [x] Mejorar accesibilidad global: `aria-*`, foco visible, navegacion por teclado y contraste.
- [x] Crear checklist de UX para acciones criticas (registro, login, compra tokens, reporte, videollamada).
- [x] Revisar y mejorar estilos generales de la aplicación siguiendo estandares actuales (registro, login, compra tokens, reporte, videollamada, admin, ...).
- [ ] Hecho en falta un nav o boton de retroceso para poder moverme por las diferentes pantallas por lo menos como user.

## Seguridad

- [ ] Rotar secretos y moverlos a variables de entorno seguras por ambiente (dev/staging/prod).
- [ ] Endurecer CORS y origenes permitidos por ambiente.
- [ ] Asegurar rate limiting en auth, chat, reportes y endpoints sensibles.
- [ ] Validar autorizacion por rol en endpoints admin (guardas y tests de autorizacion).
- [ ] Auditar logs para no exponer datos sensibles (tokens, contrasenas, datos personales).
- [ ] Revisar expiracion/refresco de JWT y estrategia de revocacion.

## Arquitectura

- [ ] Eliminar duplicidad de contexto de auth (`components/AuthContext.tsx` vs `context/AuthContext.tsx`) y dejar una sola fuente de verdad.
- [ ] Consolidar patrones de proxy en `Client/src/app/api/*` para evitar implementaciones inconsistentes.
- [ ] Estandarizar contratos DTO entre frontend y backend (nombres de campos y tipos).
- [ ] Revisar y reducir logica duplicada de normalizacion de datos en rutas API.
- [ ] Documentar arquitectura objetivo (capas, ownership, flujo auth, realtime, errores).

## Frontend (funcional)

- [ ] Verificar que no queden rutas rotas o no existentes en navegacion interna.
- [ ] Completar revision de paginas de usuario para evitar race conditions restantes.
- [ ] Auditar todos los formularios para validacion consistente (cliente + servidor).
- [ ] Homologar estrategia de fetch (timeouts, cancelacion, retries cuando aplique).
- [ ] Implementar `robots.ts` y `sitemap.ts` en App Router.
- [ ] Configurar `metadataBase` y metadatos SEO minimos por seccion.

## Backend (funcional)

- [ ] Aplicar fail-fast al iniciar servidor si faltan variables criticas.
- [ ] Verificar guardas y validaciones en todos los modulos admin.
- [ ] Revisar coherencia de codigos HTTP y payloads de error en todos los endpoints.
- [ ] Completar endpoints o casos edge marcados como "pendiente" en `Server/TODO.md`.
- [ ] Endurecer validaciones de entrada con pipes/DTO en modulos con mayor riesgo.

## Datos y Persistencia

- [ ] Confirmar que no queden dependencias de mocks en flujos productivos.
- [ ] Revisar migraciones TypeORM y estado real de esquema en entornos.
- [ ] Definir estrategia de seeds para desarrollo sin contaminar datos reales.
- [ ] Auditar integridad referencial (users, matches, chats, reports, purchases, agenda).

## Testing y QA

- [ ] Definir suite minima obligatoria: auth, usuarios, reportes, compras, notificaciones.
- [ ] Agregar tests de integracion para rutas API criticas del cliente (proxy + errores).
- [ ] Agregar tests de backend para autorizacion por rol y casos no felices.
- [ ] Crear smoke tests E2E para flujos clave (registro, login, match, chat, videollamada, compra).
- [ ] Integrar pruebas en CI para bloquear merges con regresiones.

## DevEx, CI/CD y Operacion

- [ ] Configurar pipeline CI con lint, typecheck, tests y build obligatorios.
- [ ] Definir ambientes `dev/staging/prod` con variables separadas y politicas de despliegue.
- [ ] Revisar `docker-compose` y Dockerfiles para paridad local vs despliegue.
- [ ] Agregar healthchecks y readiness checks para servicios principales.
- [ ] Estandarizar scripts npm (nombres, objetivos y documentacion).

## Documentacion

- [ ] Actualizar README raiz con arquitectura actual, flujo de arranque y troubleshooting.
- [ ] Sincronizar READMEs de `Client` y `Server` con comandos reales existentes.
- [ ] Documentar contratos de API principales (request/response/errores).
- [ ] Crear guia corta de "como continuar" para el siguiente dia de trabajo.

## Orden sugerido para manana

- [ ] Bloque 1: Seguridad JWT + build estricto.
- [ ] Bloque 2: Corregir errores emergentes de lint/typescript.
- [ ] Bloque 3: Middleware de acceso admin + validacion de roles backend.
- [ ] Bloque 4: SEO base (`robots.ts`, `sitemap.ts`, `metadataBase`).
- [ ] Bloque 5: Limpieza arquitectura (AuthContext unico + proxy/API estandar).

## Go/No-Go para owner review

- [ ] Build de `Client` y `Server` en verde sin ignorar errores de lint/typescript.
- [ ] Variables criticas definidas y validadas al arranque (`JWT_SECRET`, DB, CORS, etc.).
- [ ] Flujos core verificados de punta a punta: registro, login, match, chat, videollamada, compra de tokens.
- [ ] Endpoints admin protegidos por rol y validados con pruebas de autorizacion.
- [ ] Sin rutas rotas en navegacion principal ni errores 500 en recorrido funcional.
- [ ] Manejo de errores consistente en frontend y backend (mensajes y codigos HTTP coherentes).
- [ ] Smoke E2E ejecutado con resultado estable en los flujos de negocio principales.
- [ ] Pipeline CI pasando (lint + typecheck + tests + build).
- [ ] SEO base implementado (`robots.ts`, `sitemap.ts`, `metadataBase`) y metadatos minimos.
- [ ] README/documentacion actualizados con setup real y pasos de validacion.

Regla de decision:

- [ ] GO: si todos los checks anteriores estan en verde.
- [ ] NO-GO: si falla cualquier check de seguridad, acceso o build.
