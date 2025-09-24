import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getById } from '@/models/users/index.ts';
import { getJwtSecret } from '@/config/jwt.ts';

type TokenPayload = { id: number; email: string };

// Extensión mínima de Request para adjuntar user
declare module 'express-serve-static-core' {
  interface Request {
    user?: { userId: number; email: string };
  }
}
export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Paso 1: comprobamos que llega un header Authorization
    const { authorization } = req.headers;
    if (!authorization) {
      return next(generateErrorUtil(401, 'Falta cabecera de autorización'));
    }
    try {
      // Paso 2: extraemos el token (aceptamos "Bearer <token>" o token directo)
      const token = authorization.startsWith('Bearer ')
        ? authorization.slice(7).trim()
        : authorization.trim();

      // Paso 3: verificamos el token con la clave secreta
      const secret = getJwtSecret();
      const tokenInfo = jwt.verify(token, secret) as TokenPayload;

      // Verifica que el usuario del token existe actualmente en BD
      // Paso 4: comprobamos que el usuario del token existe
      const userRow = await getById(tokenInfo.id);
      if (!userRow) {
        return next(generateErrorUtil(401, 'Usuario no encontrado o deshabilitado'));
      }

      req.user = {
        userId: tokenInfo.id,
        email: tokenInfo.email,
      };
      next();
    } catch (error: any) {
      // Si algo falla (token caducado/formato incorrecto), respondemos 401 con mensaje más específico
      if (error?.name === 'TokenExpiredError') {
        console.warn('[authUser] token expirado');
        return next(generateErrorUtil(401, 'Token expirado'));
      }
      if (error?.name === 'JsonWebTokenError') {
        console.warn('[authUser] token inválido (firma)');
        return next(generateErrorUtil(401, 'Token inválido'));
      }
      console.error('[authUser] error verificando token:', error);
      return next(generateErrorUtil(401, 'Token no válido'));
    }
  } catch (err) {
    next(err);
  }
};