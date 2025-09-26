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
2. Navega al directorio del proyecto: `cd RollForge`
3. Instala las dependencias: `npm install`
4. Configura las variables de entorno: Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias (puedes usar el archivo `.env.example` como referencia).
5. Inicia el servidor: `npm run dev`
6. Abre tu navegador y visita `http://localhost:3000` para acceder a la aplicación.

### Variables de entorno para el envío de correos

Para que el sistema de recuperación de contraseña envíe el código por correo debes definir los siguientes valores en tu `.env`:

```dotenv
SMTP_HOST=smtp.tu_proveedor.com
SMTP_PORT=587
SMTP_USER=usuario@example.com
SMTP_PASS=contraseña_super_segura
SMTP_SECURE=false           # Usa true si el puerto es 465
MAIL_FROM="RollForge <no-reply@example.com>"
FRONTEND_URL=https://app.rollforge.dev
APP_NAME=RollForge
```

También puedes usar `SMTP_URL` si tu proveedor facilita una URL de conexión (en ese caso no es necesario establecer el resto de variables SMTP). En entornos sin SMTP configurado el servidor utilizará un modo simulado que registra el correo por consola, útil para desarrollo pero no recomendado para producción.
