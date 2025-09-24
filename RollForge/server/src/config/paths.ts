// Archivo de configuración de rutas y entorno
// Objetivo (explicado "como junior"):
// 1) Centralizar el cálculo de la ruta física donde se guardan las subidas (UPLOADS_DIR_PATH)
//    para que TODAS las utilidades la usen igual y no haya discrepancias.
// 2) Exponer banderas de entorno útiles (isProduction) que otros módulos puedan consultar.

import path from 'path';

// Determinamos si estamos en producción (NODE_ENV === 'production').
export const isProduction = process.env.NODE_ENV === 'production';

// Leemos UPLOADS_DIR de las variables de entorno si existe.
// Si no existe, usamos una ruta por defecto que apunta a "../uploads" relativa al directorio de ejecución del server.
// Explicación: normalmente el proceso se ejecuta dentro de la carpeta "server", por lo que "../uploads" apunta
// a la carpeta "uploads" en la raíz del proyecto (donde ya hay ficheros en este repo).
const envUploads = process.env.UPLOADS_DIR;

export const UPLOADS_DIR_PATH = envUploads
  ? path.resolve(envUploads)
  : path.resolve(process.cwd(), '../uploads');

// Nota: usamos path.resolve para convertir cualquier ruta relativa en absoluta y evitar problemas entre SOs.
