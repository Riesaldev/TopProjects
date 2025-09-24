import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getPublicByUsername } from '@/models/users/getPublicByUsername.ts';

// GET /api/users/by-name/:username
export const getUsersByName = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    if (!username || !username.trim()) {
      return generateErrorUtil(400, 'Username requerido');
    }
    const user = await getPublicByUsername(username.trim());
    if (!user) {
      return generateErrorUtil(404, 'Usuario no encontrado');
    }
    res.json({ status: 'ok', data: user });
  } catch (e) {
    generateErrorUtil(500, 'Error al obtener usuario por nombre');
  }
};
