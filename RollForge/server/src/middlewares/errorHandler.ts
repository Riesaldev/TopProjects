import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

// Middleware para manejar rutas no existentes
// Explicación (como junior): si nadie respondió antes, Express llega aquí y devolvemos 404
export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
};

// Tipo de error extendido con httpStatus (nuestro generateErrorUtil lo añade)
type HttpError = Error & { httpStatus?: number };

// Middleware central para manejar errores
// Flujo:
// 1) Si ya se enviaron cabeceras, delegamos al manejador por defecto
// 2) Calculamos el status (por defecto 500) y el mensaje
// 3) Si es 5xx, lo registramos en consola
// 4) Enviamos JSON con forma { status: 'error', message }
export const errorHandler: ErrorRequestHandler = (err: HttpError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = typeof err.httpStatus === 'number' ? err.httpStatus : 500;
  const message = err.message || 'Error interno del servidor';
  if (status >= 500) {
    console.error('[ERROR]', err);
  }
  res.status(status).json({ status: 'error', message });
};

export default errorHandler;