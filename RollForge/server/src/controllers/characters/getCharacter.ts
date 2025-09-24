import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getCharacterById } from '@/models/characters/index.ts';

export const getCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const row = await getCharacterById(Number(id));

    if (!row) {
      generateErrorUtil(404, 'PJ no encontrado');
    }

    res.json({ status: 'ok', data: row });

  } catch {
    generateErrorUtil(500, 'Error al obtener PJ');
  }
};
