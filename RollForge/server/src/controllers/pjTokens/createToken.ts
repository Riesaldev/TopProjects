import { Request, Response } from 'express';
import { createTokenModel } from '@/models/pjTokens/index.ts';
import { getCharacterById } from '@/models/characters/index.ts';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';

export const createToken = async (req: Request, res: Response) => {
  const { name, image_url, character_id } = req.body as { name: string; image_url?: string | null; character_id: number };
  const pj = await getCharacterById(Number(character_id));
  if (!pj) return generateErrorUtil(404, 'PJ no encontrado');
  const id = await createTokenModel({
    name,
    image_url: image_url ?? null,
    user_id: pj.user_id,
    campaign_id: pj.campaign_id,
    character_id: pj.id,
  });
  res.status(201).json({
    status: 'ok',
    data: { id, name, image_url: image_url ?? null, user_id: pj.user_id, campaign_id: pj.campaign_id, character_id: pj.id },
  });
};
