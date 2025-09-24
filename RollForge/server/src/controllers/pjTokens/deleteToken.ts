import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { deleteTokenModel, getTokenByIdModel } from '@/models/pjTokens/index.ts';

export const deleteToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const exists = await getTokenByIdModel(Number(id));
    if (!exists) {
      generateErrorUtil(404, 'Token no encontrado');
    }
    await deleteTokenModel(Number(id));
    res.json({ status: 'ok', message: 'Token borrado' });
  } catch (err) {
    console.error('Error al borrar token:', err);
    generateErrorUtil(500, 'Error al borrar token');
  }
};
