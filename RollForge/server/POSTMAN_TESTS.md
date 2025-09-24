# RollForge API — Guía Postman

Base URL (ajústala a tu `.env`): <http://localhost:3000>

Autenticación: Las rutas PROTEGIDAS requieren cabecera `Authorization: Bearer <token>`.
El middleware `authUser` está ACTIVO y valida JWT. Usa siempre el formato con prefijo "Bearer".
Además, el token se invalida de facto si el usuario asociado ha sido eliminado: en ese caso, la API responderá 401 con `Usuario no encontrado o deshabilitado`.
Rutas protegidas actualmente: `/api/users` (excepto register, login y recuperación de contraseña), `/api/campains`, `/api/pjs`, `/api/resourses`, `/api/tokens`.

Variables útiles en Postman:

- {{baseUrl}} = <http://localhost:3000>
- {{token}} = token JWT devuelto por login
- {{userId}} = id de usuario creado/logueado
- {{campaignId}}, {{characterId}}, {{resourceId}}, {{tokenId}}

Headers por defecto:

- Para JSON: `Content-Type: application/json`
- Para subida de ficheros: usar `form-data` (Postman gestiona el boundary y el Content-Type automáticamente)

---

## Salud del servidor

GET {{baseUrl}}/

- Respuesta 200

```json
{ "status": "ok", "message": "RollForge API" }
```

---
✅ probado
❌ pendiente o error

## Usuarios

Ruta base: {{baseUrl}}/api/users

### Registrar usuario  (probado)

POST {{baseUrl}}/api/users/register

- Body (raw JSON)

```json
{
  "username": "gandalf",
  "email": "gandalf@example.com",
  "password": "secret123"
}
```

- Respuesta 201

```json
{
  "status": "ok",
  "data": { "id": 1, "username": "gandalf", "email": "gandalf@example.com", "avatar": null }
}
```

### Login (probado)

POST {{baseUrl}}/api/users/login

- Body (raw JSON)

```json
{ "email": "gandalf@example.com", "password": "secret123" }
```

- Respuesta 200

```json
{
  "status": "ok",
  "data": {
    "id": 1,
    "username": "gandalf",
    "email": "gandalf@example.com",
    "avatar": null,
    "token": "<JWT>"
  }
}
```

- Guarda data.token en {{token}} y data.id en {{userId}}
  - En Postman (Tests), puedes guardar automáticamente:

    ```js
    const json = pm.response.json();
    pm.environment.set('token', json.data.token);
    pm.environment.set('userId', json.data.id);
    ```

### Listar usuarios (probado)

GET {{baseUrl}}/api/users

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": (lista de elementos) }
  - Sin token válido: 401 { "status": "error", "message": "Falta cabecera de autorización" | "Token inválido" | "Usuario no encontrado o deshabilitado" }

### Obtener usuario por id (probado)

GET {{baseUrl}}/api/users/{{userId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": { ... } }
  - Sin token válido: 401

### Actualizar usuario (probado)

PUT {{baseUrl}}/api/users/{{userId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Body (raw JSON) — al menos 1 campo

```json
{ "username": "mithrandir", "email": "mith@example.com" }
```

- Respuesta 200: { "status": "ok", "message": "Usuario actualizado" }
  - Sin token válido: 401

### Subir avatar (probado)

POST {{baseUrl}}/api/users/{{userId}}/avatar

- Body (form-data):
  - Key: avatar (File) -> Selecciona una imagen

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Respuesta 200: { "status": "ok", "data": { "avatar": "`nombre_de_fichero`" } }
  - Sin token válido: 401

### Cambiar contraseña (probado)

POST {{baseUrl}}/api/users/{{userId}}/password

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Body (raw JSON)

```json
{ "currentPassword": "secret123", "newPassword": "newSecret456" }
```

- Respuesta 200: { "status": "ok", "message": "Contraseña actualizada" }
  - Sin token válido: 401

### Iniciar recuperación de contraseña (probado)

POST {{baseUrl}}/api/users/password/recover

- Body (raw JSON)

```json
{ "email": "gandalf@example.com" }
```

- Respuesta 200 (dev): devuelve un código para pruebas

```json
{ "status": "ok", "message": "Código de recuperación generado", "code": "123456" }
```

### Restablecer contraseña (probado)

POST {{baseUrl}}/api/users/password/reset

- Body (raw JSON)

```json
{ "email": "gandalf@example.com", "code": "123456", "newPassword": "brandNew789" }
```

- Respuesta 200: { "status": "ok", "message": "Contraseña restablecida" }

### Eliminar Usuario (probado)

DELETE {{baseUrl}}/api/users/{{userId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "message": "Usuario eliminado" }
  - Sin token válido: 401

---

## Campañas

Ruta base: {{baseUrl}}/api/campains

Nota: Todas las rutas de esta sección requieren `Authorization: Bearer {{token}}` y pueden responder 401 con uno de estos mensajes: "Falta cabecera de autorización", "Token inválido" o "Usuario no encontrado o deshabilitado".

### Listar campañas (probado)

GET {{baseUrl}}/api/campains

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": (lista de elementos) }
  - Sin token válido: 401 { "status": "error", "message": "Falta cabecera de autorización" | "Token inválido" | "Usuario no encontrado o deshabilitado" }

### Obtener campaña (probado)

GET {{baseUrl}}/api/campains/{{campaignId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": { ... } }
  - Sin token válido: 401

### Crear campaña (probado)

POST {{baseUrl}}/api/campains

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Body (raw JSON)

```json
{
  "name": "Anillo Único",
  "description": "Viaje por la Tierra Media",
  "gm_id": 1
}
```

- Respuesta 201

```json
{
  "status": "ok",
  "data": { "id": 1, "name": "Anillo Único", "description": "Viaje por la Tierra Media", "gm_id": 1 }
}
```

### Actualizar campaña (probado)

PUT {{baseUrl}}/api/campains/{{campaignId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Body (raw JSON) — al menos 1 campo

```json
{ "name": "Anillo Único (Ed. Revisada)", "description": "Actualizada" }
```

- Respuesta 200: { "status": "ok", "message": "Campaña actualizada" }
  - Sin token válido: 401

### Borrar campaña (probado)

DELETE {{baseUrl}}/api/campains/{{campaignId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Respuesta 200: { "status": "ok", "message": "Campaña borrada" }
  - Sin token válido: 401

---

## Personajes (PJs)

Ruta base: {{baseUrl}}/api/pjs

Nota: Todas las rutas de esta sección requieren `Authorization: Bearer {{token}}` y pueden responder 401 con uno de estos mensajes: "Falta cabecera de autorización", "Token inválido" o "Usuario no encontrado o deshabilitado".

### Listar PJs (probado)

GET {{baseUrl}}/api/pjs

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": (lista de elementos) }
  - Sin token válido: 401

### Obtener PJ (probado)

GET {{baseUrl}}/api/pjs/{{characterId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": { ... } }
  - Sin token válido: 401

### Crear PJ (probado)

POST {{baseUrl}}/api/pjs

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Body (raw JSON)

```json
{
  "name": "Frodo",
  "image_url": "",
  "user_id": 1,
  "campaign_id": 1
}
```

- Respuesta 201: { "status": "ok", "data": { "id": 1, "name": "Frodo", "image_url": null, "user_id": 1, "campaign_id": 1 } }
  - Sin token válido: 401

### Actualizar PJ (probado)

PUT {{baseUrl}}/api/pjs/{{characterId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Body (raw JSON) — al menos 1 campo

```json
{ "name": "Frodo Bolsón", "image_url": "https://ejemplo.com/frodo.png" }
```

- Respuesta 200: { "status": "ok", "message": "PJ actualizado" }
  - Sin token válido: 401

### Borrar PJ (probado)

DELETE {{baseUrl}}/api/pjs/{{characterId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Respuesta 200: { "status": "ok", "message": "PJ borrado" }
  - Sin token válido: 401

---

## Recursos

Ruta base: {{baseUrl}}/api/resourses

Nota: Todas las rutas de esta sección requieren `Authorization: Bearer {{token}}` y pueden responder 401 con uno de estos mensajes: "Falta cabecera de autorización", "Token inválido" o "Usuario no encontrado o deshabilitado".

### Listar recursos (probado)

GET {{baseUrl}}/api/resourses

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Devuelve los recursos públicos (uploaded_by = null) y los del usuario autenticado.
- Puedes filtrar por campaña con `?campaign_id=ID`.
- Respuesta 200: { "status": "ok", "data": (lista de elementos) }
  - Sin token válido: 401

### Obtener recurso (probado)

GET {{baseUrl}}/api/resourses/{{resourceId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Solo puedes acceder a tus propios recursos. Si no eres el propietario, 403.
- Respuesta 200: { "status": "ok", "data": { ... } }
  - Sin token válido: 401

### Crear recurso (probado)

POST {{baseUrl}}/api/resourses

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Body (raw JSON)

```json
{
  "name": "Mapa del Bosque Negro",
  "type": "image",
  "url": "https://ejemplo.com/mapa.png",
  "campaign_id": 1,
  "is_public": true
}
```

- Si `is_public` es true, el backend asigna `uploaded_by` = null (accesible por todos en lectura). Si no, asigna tu `userId`.
- Respuesta 201: { "status": "ok", "data": { "id": 1, "name": "Mapa del Bosque Negro", "type": "image", "url": "<https://ejemplo.com/mapa.png>", "campaign_id": 1, "uploaded_by": 1 } }
  - Sin token válido: 401

### Actualizar recurso (probado)

PUT {{baseUrl}}/api/resourses/{{resourceId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Body (raw JSON) — al menos 1 campo

```json
{ "name": "Mapa v2", "type": "image", "url": "https://ejemplo.com/mapa-v2.png" }
```

- Solo el propietario puede actualizar. Si no eres el propietario, 403.
- Respuesta 200: { "status": "ok", "message": "Recurso actualizado" }
  - Sin token válido: 401

### Borrar recurso (probado)

DELETE {{baseUrl}}/api/resourses/{{resourceId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}

- Solo el propietario puede borrar. Si no eres el propietario, 403.
- Respuesta 200: { "status": "ok", "message": "Recurso borrado" }
  - Sin token válido: 401

---

## Tokens de PJs

Ruta base: {{baseUrl}}/api/tokens

Nota: Todas las rutas de esta sección requieren `Authorization: Bearer {{token}}` y pueden responder 401 con uno de estos mensajes: "Falta cabecera de autorización", "Token inválido" o "Usuario no encontrado o deshabilitado".

Los tokens representan la ficha en el mapa y hacen referencia directa a un `character_id`. El `user_id` y `campaign_id` del token se derivan del propio personaje (relación indirecta pero fuerte con el usuario).

### Listar tokens (probado)

GET {{baseUrl}}/api/tokens

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Filtros opcionales (se combinan con AND): `character_id`, `campaign_id`, `user_id`
- Respuesta 200: { "status": "ok", "data": (lista de elementos) }
  - Sin token válido: 401

Ejemplos:

- `GET {{baseUrl}}/api/tokens?character_id={{characterId}}`
- `GET {{baseUrl}}/api/tokens?campaign_id={{campaignId}}&user_id={{userId}}`

### Obtener token (probado)

GET {{baseUrl}}/api/tokens/{{tokenId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "data": { ... } }
  - 404 si no existe

### Crear token (probado)

POST {{baseUrl}}/api/tokens

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Body (raw JSON)

```json
{
  "name": "Ficha Frodo",
  "image_url": "",
  "character_id": {{characterId}}
}
```

- El backend buscará el PJ por `character_id` y asignará automáticamente `user_id` y `campaign_id` del propio PJ al token.
- Respuesta 201: { "status": "ok", "data": { "id": 1, "name": "Ficha Frodo", "image_url": null, "character_id": 1, "user_id": 1, "campaign_id": 1 } }

### Actualizar token (probado)

PUT {{baseUrl}}/api/tokens/{{tokenId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Body (raw JSON) — al menos 1 campo

```json
{ "name": "Ficha Frodo v2", "image_url": null, "character_id": {{characterId}} }
```

- Si se envía `character_id`, el backend validará que el PJ existe; además sincronizará `user_id` y `campaign_id` del token con los del nuevo PJ.
- Respuesta 200: { "status": "ok", "message": "Token actualizado" }

### Borrar token (probado)

DELETE {{baseUrl}}/api/tokens/{{tokenId}}

- Headers requeridos:
  - Authorization: Bearer {{token}}
- Respuesta 200: { "status": "ok", "message": "Token borrado" }

## Errores comunes

- 400: Datos inválidos (Zod validation)
- 401: Credenciales incorrectas o autorización faltante/incorrecta (p. ej., falta cabecera Authorization, token inválido o usuario no encontrado/deshabilitado)
- 403: Prohibido (no eres propietario del recurso)
- 404: No encontrado
- 409: Conflicto (duplicados o referencias)
- 500: Error interno

---

## Notas

- Todas las rutas protegidas exigen `Authorization: Bearer {{token}}` con el JWT del login.
- Para avatar, usa form-data y clave `avatar` (tipo File).
- Asegúrate de tener variables de entorno: `PORT`, `UPLOADS_DIR`, `JWT_SECRET`, `JWT_EXPIRES_IN` (opcionales con valores por defecto de desarrollo).

---
