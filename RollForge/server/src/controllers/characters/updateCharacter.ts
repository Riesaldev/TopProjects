import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { idParamSchema, updateCharacterSchema as schema } from '@/schemas/pjs.ts';
import { getCharacterById, updateCharacterModel } from '@/models/characters/index.ts';
// Sin pool directo; delegamos en la capa de modelo

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      generateErrorUtil(400, 'ID de PJ inválido');
    }
    const { id } = parsedParams.data as { id: number };
    const parsedBody = schema.safeParse(req.body);

    if (!parsedBody.success) {
      generateErrorUtil(400, 'Datos de PJ inválidos');
    }
    const { name, image_url } = parsedBody.data as {
      name?: string;
      image_url?: string | null
    };

    const exists = await getCharacterById(id);
    if (!exists) {
      return generateErrorUtil(404, 'PJ no encontrado');
    }
    await updateCharacterModel(id, { name, image_url });

    res.json({
      status: 'ok',
      message: 'PJ actualizado'
    });

  } catch {
    generateErrorUtil(500, 'Error al actualizar personaje');
  }
};
