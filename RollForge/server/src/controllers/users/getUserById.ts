import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getById } from '@/models/users/index.ts';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const row = await getById(Number(id));
    if (!row) {
      generateErrorUtil(404, 'Usuario no encontrado');
    }
    res.json({ status: 'ok', data: row });

  } catch {
    generateErrorUtil(500, 'Error al obtener usuario');
  }
};
