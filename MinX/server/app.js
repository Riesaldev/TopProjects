/**
 * Carga de variables de entorno antes que cualquier otra cosa.
 * Qué: importa dotenv/config para que process.env tenga las variables definidas en .env.
 * Cómo: usando el side‑effect import de dotenv/config (no necesitamos la librería explícitamente).
 * Por qué: garantiza que PUERTO, JWT_SECRET, UPLOADS_DIR, etc. estén disponibles en el resto del archivo.
 */
import 'dotenv/config';

/**
 * Dependencias base de la API.
 * express -> framework HTTP.
 * cors -> habilita peticiones cross‑origin desde el cliente (frontend Vite).
 * morgan -> logging de peticiones entrantes para depurar y medir.
 * express-fileupload -> parsea multipart/form-data para subir imágenes (avatar, imágenes de mensajes).
 */
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

/**
 * Rutas modulares.
 * Qué: agrupamos rutas de usuarios y mensajes.
 * Cómo: cada router exporta endpoints montados posteriormente con un prefijo.
 * Por qué: separa dominios y facilita mantenimiento / pruebas.
 */
import userRoutes from './src/routes/userRoutes.js';
import msgRoutes from './src/routes/msgRoutes.js';
import initChatServer from './src/ws/chatServer.js';

// Extraemos directorio de uploads desde variables de entorno (flexible entre entornos).
const { UPLOADS_DIR } = process.env;

/**
 * Instancia principal de Express.
 * Centraliza middlewares, rutas y manejadores de error.
 */
const app = express();

/**
 * Endpoint de healthcheck básico.
 * Qué: responde texto plano confirmando que el servicio está arriba.
 * Cómo: GET / devuelve 200 con un mensaje.
 * Por qué: útil para probes de Docker/K8s o tests sencillos de disponibilidad.
 */
app.get( '/', ( req, res ) => {
  res.send( '¡Servidor miniX funcionando!' );
} );

/**
 * Middleware de logging (morgan en modo 'dev').
 * Qué: registra método, ruta, tiempo y status.
 * Por qué: ayuda a depuración y seguimiento de rendimiento.
 */
app.use( morgan( 'dev' ) );

/**
 * Habilita CORS para permitir que el frontend acceda a la API.
 * Por defecto permite todos los orígenes; si se necesita restringir, añadir origin: [...].
 */
app.use( cors() );

/**
 * Parser JSON.
 * Qué: convierte body application/json en objeto JS.
 * Por qué: facilita acceso a req.body en controladores.
 */
app.use( express.json() );

/**
 * Parser de multipart/form-data para subida de archivos.
 * Qué: añade req.files.
 * Por qué: se necesita para subir avatar o imágenes en mensajes.
 */
app.use( fileUpload() );

/**
 * Servir archivos estáticos (imágenes subidas).
 * Qué: expone el directorio de uploads directamente.
 * Cómo: express.static sobre el path configurado en .env.
 * Por qué: permite que el cliente consuma imágenes sin endpoint adicional.
 */
if ( UPLOADS_DIR )
{
  app.use( express.static( UPLOADS_DIR ) );
}

/**
 * Montaje de routers de dominio.
 * /api/users -> autenticación, perfil, avatar, bio.
 * /api/messages -> CRUD y likes de mensajes.
 */
app.use( '/api/users', userRoutes );
app.use( '/api/messages', msgRoutes );

/**
 * Middleware centralizado de manejo de errores.
 * Qué: captura cualquier error lanzado con generateError u otros.
 * Cómo: Express detecta funciones con 4 parámetros como manejadores de error.
 * Por qué: respuesta consistente en formato JSON y logging unificado.
 */
app.use( ( err, req, res, next ) => {
  console.error( err );
  const statusCode = ( err.code && Number.isInteger( err.code ) ) ? err.code : 500;
  if ( res.headersSent ) return next( err ); // evita doble envío si ya se respondió.
  res.status( statusCode ).json( {
    status: 'error',
    message: err.message || 'Error interno del servidor'
  } );
} );

/**
 * Middleware para rutas no encontradas.
 * Qué: cualquier request que no coincida con rutas previas llega aquí.
 * Por qué: respuesta 404 uniforme.
 */
app.use( ( req, res ) => {
  res.status( 404 ).send( {
    status: 'error',
    message: 'Ruta no encontrada',
  } );
} );

/**
 * Arranque del servidor HTTP.
 * Qué: escucha en el puerto configurado.
 * Por qué: punto de entrada principal para recibir tráfico.
 */
const server = http.createServer( app );
initChatServer( server );

server.listen( process.env.PORT, () => {
  console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` );
} );
