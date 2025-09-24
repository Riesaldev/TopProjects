import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getTokenByIdModel } from '@/models/pjTokens/index.ts';

export const getToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const row = await getTokenByIdModel(Number(id));
    if (!row) {
      generateErrorUtil(404, 'Token no encontrado');
    }
    res.json({ status: 'ok', data: row });
  } catch {
    generateErrorUtil(500, 'Error al obtener token');
  }
};
