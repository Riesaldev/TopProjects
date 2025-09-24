import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { deleteCharacterModel, getCharacterById } from '@/models/characters/index.ts';

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const exists = await getCharacterById(Number(id));
    if (!exists) {
      generateErrorUtil(404, 'PJ no encontrado');
    }
    await deleteCharacterModel(Number(id));
    res.json({
      status: 'ok',
      message: 'PJ borrado'
    });

  } catch (err) {
    console.error('Error al borrar personaje:', err);
    generateErrorUtil(500, 'Error al borrar PJ');
  }
};
