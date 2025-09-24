import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getTokenByIdModel, updateTokenModel } from '@/models/pjTokens/index.ts';
import { getCharacterById } from '@/models/characters/index.ts';

export const updateToken = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const exists = await getTokenByIdModel(Number(id));
  if (!exists) {
    return generateErrorUtil(404, 'Token no encontrado');
  }
  const { name, image_url, character_id } = req.body as { name?: string; image_url?: string | null; character_id?: number | null };
  // Si envían character_id, validar que exista; user_id y campaign_id no se actualizan directamente
  if (typeof character_id !== 'undefined' && character_id !== null) {
    const pj = await getCharacterById(Number(character_id));
    if (!pj) return generateErrorUtil(404, 'PJ no encontrado');
    await updateTokenModel(Number(id), {
      name,
      image_url,
      character_id,
      user_id: pj.user_id,
      campaign_id: pj.campaign_id,
    });
  } else {
    await updateTokenModel(Number(id), { name, image_url });
  }
  res.json({ status: 'ok', message: 'Token actualizado' });
};
