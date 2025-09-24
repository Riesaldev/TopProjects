import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

type Where = 'body' | 'query' | 'params';

export const zodValidator = <T extends z.ZodTypeAny>(schema: T, where: Where = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Paso 1: seleccionamos qué parte del request queremos validar (body / query / params)
    const target: unknown = where === 'body' ? req.body : where === 'query' ? req.query : req.params;
    const result = schema.safeParse(target);
    if (!result.success) {
      // Paso 2: si falla, construimos una respuesta 400 con detalles para el cliente
      const errors = result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
      return res.status(400).json({ status: 'error', message: 'Validación fallida', errors });
    }
    // Paso 3: si pasa, copiamos los datos saneados en el mismo objeto (sin reasignar)
    // Nota: Express 5 define getters para req.query/req.params, por eso mutamos el objeto y no lo reemplazamos
    try {
      // Limpiar claves existentes y copiar saneados en el mismo objeto
      const tgt = where === 'body' ? (req.body as Record<string, unknown>) : where === 'query' ? (req.query as Record<string, unknown>) : (req.params as Record<string, unknown>);
      if (tgt && typeof tgt === 'object') {
        for (const key of Object.keys(tgt)) {
          delete tgt[key];
        }
        Object.assign(tgt, result.data as object);
      } else {
        // Fallback: si por alguna razón no es objeto, no mutamos y seguimos
      }
    } catch {
      // Si fallase la mutación (poco probable), continuamos con los datos originales
    }
    // Paso 4: continuamos al siguiente middleware/controlador
    next();
  };
};

export default zodValidator;
