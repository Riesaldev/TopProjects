# TODO Backend NäraPaws

## 1. Configuración y Estructura Inicial

- [x] Inicializar proyecto Node.js con `pnpm` y configurar `package.json`.
- [x] Crear estructura de carpetas: `controllers/`, `models/`, `routes/`, `middlewares/`, `services/`, `utils/`, `database/`, `prisma/`.
- [x] Configurar `.env` con variables de entorno y conexión MySQL.
- [x] Instalar dependencias principales: Express, Prisma, bcrypt, jsonwebtoken, Joi, etc.

## 2. Prisma y Base de Datos

- [x] Inicializar Prisma (`npx prisma init`).
- [x] Definir modelos en `prisma/schema.prisma` (User, Dog, Booking, etc.).
- [x] Añadir campo `password` a User.
- [x] Ejecutar migraciones (`npx prisma migrate dev --name init`).
- [x] Sincronizar y resetear base de datos si es necesario (`npx prisma migrate reset`).

## 3. Registro de Usuario

- [x] Crear modelo `models/users/insertUserModel.js` para insertar usuarios.
- [x] Crear controlador `controllers/users/registerUserController.js` con lógica de validación, hash y uso del modelo.
- [x] Crear ruta `routes/users/register.js` y conectarla al controlador.
- [x] Añadir la ruta de registro al router principal de usuarios y al app principal.
- [x] Probar el endpoint de registro con Postman/curl.


## 4. Login de Usuario

- [x] Crear modelo para buscar usuario por email (usar instancia única de Prisma y centralizar lógica en modelos/servicios).
- [x] Crear controlador de login: validar, comparar hash, generar JWT (mensaje de error genérico, no exponer datos sensibles).
- [x] Crear ruta de login y conectarla.
- [ ] Probar login y manejo de errores.


## 5. Validación y Seguridad

- [x] Implementar validación robusta con Joi en registro y login (usar middleware en rutas, eliminar validación manual en controladores).
- [ ] Añadir middlewares de autenticación y autorización (usar authUserMiddleware en rutas protegidas).
- [ ] Configurar Helmet para cabeceras seguras.
- [ ] Configurar rate limiting para evitar ataques de fuerza bruta.
- [x] Configurar CORS.


## 6. Endpoints CRUD y lógica de negocio

- [ ] Crear modelos y controladores para Dog, Booking, Payment, Review, Notification, etc. (centralizar acceso a datos en modelos/servicios, no en controladores).
- [ ] Crear rutas y conectar controladores para cada dominio (usar index.js para centralizar rutas por dominio).
- [ ] Probar cada endpoint con datos reales.


## 7. Testing y Calidad

- [ ] Añadir tests unitarios y de integración (Jest, Supertest).
- [ ] Configurar ESLint y Prettier.
- [ ] Documentar y comentar rutas y controladores para facilitar el mantenimiento.


## 8. Documentación y Despliegue

- [ ] Documentar endpoints con Swagger.
- [ ] Preparar scripts de despliegue (PM2, Docker si aplica).
- [ ] Configurar logs y monitoreo.

---


## 9. Refactor y buenas prácticas

- [ ] Usar una única instancia de PrismaClient en toda la app (importar desde prisma/prismaClient.js).
- [ ] Centralizar toda la lógica de acceso a datos en modelos/servicios, no en controladores.
- [ ] No retornar nunca el password ni datos sensibles en respuestas.
- [ ] Mejorar mensajes de error para no revelar información sensible.
- [ ] Usar middlewares de validación y autenticación solo donde corresponda.
- [ ] Mantener la estructura modular y escalable (usar index.js en rutas por dominio).

**Sigue este checklist paso a paso para mantener el orden, la calidad y la seguridad en el desarrollo del backend. Marca cada tarea al completarla.**
