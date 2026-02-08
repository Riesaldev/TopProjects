# TODO Backend – Blurry

## 🧍‍♂️ Experiencia del Usuario No Registrado
- [x] Registro rápido y sencillo (`/auth/register`)
- [ ] Landing Page, calificaciones, opiniones, secciones informativas, enlace de descarga (Frontend)

## 👤 Gestión de Cuenta y Acceso – Usuario Registrado
- [x] Login seguro (`/auth/login`)
- [x] Editar datos personales (`/users/:id` PATCH)
- [x] Configurar privacidad (campo en usuario, endpoint)
- [ ] Suspender temporalmente cuenta (endpoint PATCH, lógica de estado)
- [x] Eliminar cuenta (DELETE `/users/:id`)

## 💬 Interacción Social
- [x] Sistema de rating/feedback (`/feedback`)
- [ ] Selección anónima de perfiles (lógica de matching, pendiente anonimato)
- [x] Ver info completa de perfiles (`/users/:id`)
- [x] Agenda automática por interés mutuo (`/matches` + agenda/contactos)
- [x] Mensajes en tiempo real (WebSocket, `/chat`)
- [x] Alertas de mensajes (WebSocket, notificaciones)

## 📹 Videollamadas y Juegos
- [x] Iniciar videollamadas (WebSocket + endpoint)
- [x] Juegos rompehielo en videollamadas (endpoint + WebSocket)
- [x] Terminar chats/videollamadas (endpoint)
- [x] Tomar notas durante videollamadas (endpoint `/notes`)
- [x] Ver, editar, eliminar notas (CRUD `/notes`)

## 🛡️ Seguridad y Moderación
- [x] Moderación IA en chats/videollamadas (microservicio IA, endpoint)
- [x] Reportar conductas inapropiadas (endpoint `/reports`)
- [x] Informar problemas técnicos (endpoint `/reports` tipo técnico)

## 💰 Sistema de Tokens
- [x] Obtener tokens (lógica de acumulación, endpoint `/tokens`)
- [x] Comprar juegos/tests (endpoint `/products`, `/purchases`)
- [x] Pagar tiempo extra en videollamadas (endpoint, lógica de consumo tokens)
- [x] Usar tokens para compensar faltas (endpoint, lógica de penalización)
- [x] Hacer regalos a otros usuarios (endpoint `/tokens` tipo regalo)
- [x] Personalizar perfil con mejoras cosméticas (endpoint, pendiente integración frontend)
- [x] Ver estado de entrega de regalo (endpoint, historial)

## 🧑‍💼 Funciones del Administrador
- [x] Login seguro (rol admin)
- [x] Vista general con filtros avanzados (`/admin/users`)
- [x] Revisar denuncias y strikes (`/admin/reports`, `/admin/sanctions`)
- [x] Visualizar partes técnicos (`/admin/reports`)
- [x] Aplicar/revocar sanciones (`/admin/sanctions`)
- [x] Controlar sistema de tokens (`/admin/tokens`)
- [x] Actualizar funcionalidades (`/admin/settings`)
- [x] Ver métricas de uso, denuncias, ratings, actividad (`/admin/dashboard`)
- [ ] Ajustar parámetros de matching con sliders y testear (endpoint, pendiente lógica avanzada)
- [x] Mensajes/videollamadas entre admins (WebSocket, endpoint)
- [x] Recibir alertas sobre eventos/incidencias (WebSocket, notificaciones)
- [x] Acceso a informes automáticos (`/admin/reports-generated`)

---

## **Notas**
- [ ] Todo lo marcado como pendiente requiere integración o lógica adicional en el backend.
- [ ] La agenda automática y matching avanzado están implementados, pero pueden mejorarse con lógica IA y anonimato.
- [ ] La integración WebSocket está lista para todos los eventos clave. 