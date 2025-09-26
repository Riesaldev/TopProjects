//Acceso a las variables de entorno del fichero .env y las añadimos a la lista de variables de entorno
import 'dotenv/config';

//importamos dependencias
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
// Importamos config centralizada para rutas y entorno
import { UPLOADS_DIR_PATH } from '@/config/paths.ts';

//importamos rutas
import usersRouter from '@/routes/users.ts';
import campaignsRouter from '@/routes/campaigns.ts';
import pjsRouter from '@/routes/pjs.ts';
import resourcesRouter from '@/routes/resources.ts';
import diagnosticsRouter from '@/routes/diagnostics.ts';
import { errorHandler, notFound } from '@/middlewares/index.ts';
import tokensRouter from '@/routes/tokens.ts';
import { scheduleRecoveryCodesCleanup } from '@/jobs/cleanupRecoveryCodes.ts';

// sin uso de rutas locales aquí

//obtenemos variables de entorno necesarias
const { PORT = 3000 } = process.env as { PORT?: string };

//Creamos una aplicación express (server)
const app = express();

//
//middleware que muestra por consola información de la petición entrante
app.use(morgan('dev'));

// Seguridad HTTP básica con Helmet (cabeceras seguras)
app.use(helmet());

// midlleware CORS controlado: en desarrollo se puede abrir, en prod conviene restringir
const { CORS_ORIGIN } = process.env as { CORS_ORIGIN?: string };
app.use(cors({
  origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map(o => o.trim()) : true,
  credentials: true,
}));


//middleware que permite leer un body en formato JSON
app.use(express.json());

// middleware que permite leer un body en formato form-data (subidas de archivos)
// Añadimos opciones para mejorar seguridad:
// - limits: limitamos el tamaño de archivo para evitar abusos (p.ej. 5MB)
// - abortOnLimit: si el archivo supera el límite, corta la subida
// - useTempFiles=false: mantenemos en memoria; si se esperan archivos grandes, usar tempfiles en disco
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,
}));

// (nuevo) Servimos ficheros estáticos de la carpeta de subidas.
// Explicación (como junior): Queremos que el cliente (frontend) pueda acceder a las imágenes/documentos
// que los usuarios suben (por ejemplo, avatares). Para eso, Express debe exponer públicamente dicha carpeta.
// Usamos una ruta URL fija '/uploads' que mapea a la carpeta física UPLOADS_DIR_PATH.
app.use('/uploads', express.static(UPLOADS_DIR_PATH, {
  // Opciones de seguridad/perf sencillas
  fallthrough: true, // permitir que otras rutas manejen 404 si no existe el archivo
  index: false,      // no listar índices
  etag: true,        // permitir caching por ETag
  maxAge: '7d'       // cache simple
}));

//middleware que indica a Express dónde están las rutas.
app.use('/api/users', usersRouter);
// Montamos tanto las rutas nuevas (corregidas) como las antiguas para no romper clientes existentes
app.use('/api/campaigns', campaignsRouter);
app.use('/api/pjs', pjsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/diagnostics', diagnosticsRouter);
app.use('/api/tokens', tokensRouter);

// Define la ruta del archivo raiz
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'RollForge API' });
});

// Endpoint de salud simple (sin dependencias de BD) para monitoreo / tests
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Manejo del request favicon.ico
app.get('/favicon.ico', (_req, res) => res.status(204).end());

//middleware de ruta no encontrada
app.use(notFound);

//middleware de manejo de errores
app.use(errorHandler);

//Indicamos al servidor que escuche peticiones en un puerto específico
// Programamos job de limpieza de códigos de recuperación expirados (no crítico si falla)
scheduleRecoveryCodesCleanup();
app.listen(Number(PORT), () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  // Logging de configuración (no secretos) para diagnóstico rápido
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, MAIL_FROM, RECOVERY_CODE_MINUTES, RECOVERY_EMAIL_WINDOW_MS, RECOVERY_EMAIL_MAX } = process.env;
  const emailMode = (!SMTP_HOST || !SMTP_PORT) ? 'dev-console' : 'smtp';
  console.log('[startup] email', {
    mode: emailMode,
    host: SMTP_HOST || null,
    port: SMTP_PORT || null,
    authUserPresent: !!SMTP_USER,
    from: MAIL_FROM || null,
  });
  console.log('[startup] recovery', {
    codeMinutes: RECOVERY_CODE_MINUTES || '15',
    windowMs: RECOVERY_EMAIL_WINDOW_MS || '600000',
    maxPerWindow: RECOVERY_EMAIL_MAX || '5'
  });
});