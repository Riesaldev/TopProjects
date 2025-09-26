import type { Request, Response, NextFunction } from 'express';
import { getById } from '@/models/users/index.ts';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';

// Devuelve la información básica del usuario autenticado (sin password ni campos sensibles)
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(generateErrorUtil(401, 'No autenticado'));
    }
    const user = await getById(req.user.userId);
    if (!user) {
      return next(generateErrorUtil(404, 'Usuario no encontrado'));
    }
    const { password, recoverPassword, ...safe } = user as any;
    res.json({ user: safe });
  } catch (err) {
    next(err);
  }
};
