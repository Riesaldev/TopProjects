# RollForge

RollForge es una plataforma web diseñada para la creación y gestión de personajes de rol, facilitando a los usuarios la organización de sus campañas y la interacción con otros jugadores.

## Características Principales

- **Gestión de Personajes**: Permite a los usuarios crear, editar y eliminar personajes de rol con atributos personalizados.
- **Organización de Campañas**: Los usuarios pueden crear campañas, invitar a otros jugadores y gestionar sesiones de juego.
- **Interacción Social**: Funcionalidades para que los jugadores puedan comunicarse, compartir recursos y colaborar en tiempo real.
- **Interfaz Intuitiva**: Diseño amigable y fácil de usar, optimizado para dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MySQL
- **Almacenamiento**: MySQL para datos estructurados, almacenamiento en la nube para archivos multimedia
- **Autenticación**: JSON Web Tokens (JWT), OAuth.

## Instalación y Configuración

1. Clona el repositorio: `git clone <URL_DEL_REPOSITORIO>`
2. Navega al directorio del proyecto: `cd RollForge/server`
3. Instala dependencias: `npm install`
4. Crea y rellena `.env` (ver sección Variables de Entorno)
5. Inicializa la base de datos (destructivo, recrea tablas): `npm run initDb`
6. Ejecuta en desarrollo: `npm run dev`
7. (Opcional) Pruebas: `npm test`
8. Lint: `npm run lint` | Typecheck: `npm run typecheck`

Servidor arranca (por defecto) en el puerto configurado vía `PORT` (si no se define, revisa `app.ts`).

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Modo desarrollo con recarga (`tsx watch`). |
| `npm start` | Ejecuta el servidor en modo producción (sin watch). |
| `npm run initDb` | Crea/recrea todas las tablas (DROPs + CREATE). Úsalo sólo en entornos no productivos salvo migraciones controladas. |
| `npm test` | Ejecuta la suite de pruebas (Vitest + Supertest). |
| `npm run lint` | Ejecuta ESLint sobre el código. |
| `npm run typecheck` | Verificación estricta de tipos (TS `--noEmit`). |

## Variables de Entorno

Crear archivo `.env` en `server/`. Ejemplo mínimo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=changeme
DB_NAME=rollforge
DB_PORT=3306

PORT=3001

# JWT
SECRET=un_secret_seguro_largo
JWT_EXPIRES_IN=7d

# Recuperación de contraseña
RECOVERY_CODE_MINUTES=15
RECOVERY_EMAIL_WINDOW_MS=600000
RECOVERY_EMAIL_MAX=5
RECOVERY_CLEAN_INTERVAL_MS=900000

# SMTP
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=usuario
SMTP_PASS=clave
MAIL_FROM="RollForge <no-reply@rollforge.local>"

# Otros opcionales
NODE_ENV=development
```

Descripción rápida:

- `DB_*`: conexión MySQL.
- `SECRET`: clave para firmar JWT (obligatoria).
- `JWT_EXPIRES_IN`: Duración del token (ej: `7d`, `1h`).
- `RECOVERY_CODE_MINUTES`: Minutos de validez del código.
- `RECOVERY_EMAIL_WINDOW_MS` + `RECOVERY_EMAIL_MAX`: Rate limit por email (ej: 5 solicitudes cada 10min).
- `RECOVERY_CLEAN_INTERVAL_MS`: Intervalo del job que limpia códigos expirados.
- `SMTP_*`, `MAIL_FROM`: Configuración envío de correos (nodemailer). Si faltan, el flujo de recuperación fallará.

## Flujo de Recuperación de Contraseña

1. Usuario envía POST `/api/users/password/recover` con `{ email }`.
2. Se genera un código aleatorio, se hashea (bcrypt) y se guarda junto a `recoverPasswordExpires`.
3. Se envía email con plantilla HTML y código. Respuesta API siempre: `{ status: 'ok' }` (no filtra si existe o no el correo).
4. Usuario POST `/api/users/password/reset` con `{ email, code, newPassword }`.
5. Backend compara el `code` contra el hash y verifica expiración. Si éxito: actualiza password, limpia campos y responde `{ status: 'ok' }`.

Seguridad aplicada:

- Código hashed (no se almacena plano).
- Expiración controlada.
- Rate limit por email configurado.
- Job de limpieza de códigos caducados.
- Respuestas genéricas para evitar enumeración de cuentas.

## Endpoints (Resumen Parcial)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Ping de salud. |
| POST | `/api/users/register` | Registro usuario. |
| POST | `/api/users/login` | Login (email o username + password). |
| POST | `/api/users/password/recover` | Inicia recuperación. |
| POST | `/api/users/password/reset` | Completa recuperación. |
| GET | `/api/campaigns` | Listar campañas (ejemplo). |

Rutas legacy mal escritas eliminadas: `/api/campains` y `/api/resourses` ya no están disponibles. Usar siempre `/api/campaigns` y `/api/resources`.

### Diagnóstico de Email

Endpoint de diagnóstico para inspeccionar la configuración de envío y (en no producción) enviar un correo de prueba:

`GET /api/diagnostics/email` devuelve:

```json
{
  "email": {
    "mode": "smtp|dev-console",
    "host": "smtp.example.com",
    "port": 2525,
    "auth": true,
    "from": "RollForge <no-reply@rollforge.local>",
    "nodeEnv": "development"
  },
  "test": null
}
```

Parámetros opcionales:

- `?test=1` (solo si `NODE_ENV !== 'production'`) intenta enviar un email de prueba.
- `&to=correo@destino` para especificar destinatario (por defecto usa `MAIL_FROM`).

Respuesta test exitosa:

```json
{
  "email": { "mode": "smtp", "host": "..." },
  "test": { "ok": true, "messageId": "<id>" }
}
```

Si falla:

```json
{
  "email": { "mode": "smtp", "host": "..." },
  "test": { "ok": false, "error": "Mensaje de error" }
}
```

Logs de éxito de envío muestran: `[email] OK to=<destino> template=<plantilla|raw> id=<messageId>`.

#### Uso con Gmail (SMTP)

Para que Gmail permita el envío:

1. Activa 2FA en la cuenta de Google.
2. Genera un App Password (Contraseña de aplicación) en Seguridad > Contraseñas de aplicaciones.
3. Usa ese valor como `SMTP_PASS` y el correo completo como `SMTP_USER`.
4. Configuración recomendada:

- Host: `smtp.gmail.com`
- Puerto TLS STARTTLS: `587` (`SMTP_SECURE=false`)
- (Alternativa) Puerto SSL: `465` (`SMTP_SECURE=true`)

5. `MAIL_FROM` debe ser la misma dirección (o un alias verificado) para evitar rechazo SPF.
6. No uses la contraseña normal de la cuenta (Gmail la bloquea).

Variables ejemplo para Gmail con STARTTLS:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_cuenta@gmail.com
SMTP_PASS=app_password_de_16_caracteres
SMTP_SECURE=false
MAIL_FROM="Tu Proyecto <tu_cuenta@gmail.com>"
```

Diagnóstico rápido:

- `GET /api/diagnostics/email?verify=1` comprobará conectividad y autenticación.
- `GET /api/diagnostics/email?test=1&to=tu_cuenta@gmail.com` intenta enviar un correo.
- Añade `&debug=1` para incluir `accepted/rejected/response` en logs.

Si no llega el correo:

- Revisa consola: busca `[email] OK` y si `accepted` contiene el destinatario.
- Mira carpeta Spam.
- Verifica que no haya error de SPF/DMARC en cabeceras (si usas dominio propio con Gmail for Workspace, configura registros DNS).
- Asegúrate de que la cuenta no alcanzó límites diarios (Gmail limita envíos).

Errores comunes:

| Mensaje | Causa típica | Solución |
|---------|--------------|----------|
| Invalid login | App password no creado o mal copiado | Regenerar app password |
| Connection timeout | Firewall o puerto bloqueado | Probar 587; comprobar red |
| Must issue a STARTTLS command first | Falta STARTTLS | Usar puerto 587 con secure false |
| Daily user sending quota exceeded | Límite diario superado | Esperar 24h o usar servicio transaccional |

Para producción, considera proveedores como SES, SendGrid, Mailgun o Resend para mejor entregabilidad.

## Quality Gates

Ejecutar antes de subir cambios:

```bash
npm run typecheck
npm run lint
npm test
```

Todo debe pasar sin errores. Añadir tests para nuevas funcionalidades públicas.

## Tests

Stack: Vitest + Supertest. Los tests montan una app Express aislada. Para añadir nuevos tests crear archivos en `src/tests/*.test.ts`.

## Notas de Desarrollo

- Alias de imports: usar `@/` para referirse a `src` (configurado en `tsconfig.json` y `vitest.config.ts`).
- `initDb` es destructivo: no ejecutar en producción sin copia de seguridad / migraciones formales.
- Preferir funciones puras y modelos centrados en queries; la lógica de negocio reside en controladores.

## Próximas Mejores Prácticas Sugeridas

- Sustituir rutas legacy una vez clientes actualicen.
- Añadir pruebas de expiración e integración completa de reset (mock hash compare).
- Implementar almacenamiento centralizado de sesiones/tokens revocados si se añade logout server-side.
- Pipeline CI con ejecución de quality gates.

---

Licencia: MIT (añadir archivo LICENSE si procede).
