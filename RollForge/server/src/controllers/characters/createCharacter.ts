import { Request, Response, NextFunction } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { createCharacterSchema } from '@/schemas/pjs.ts';
import { createCharacterModel } from '@/models/characters/index.ts';

export const createCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createCharacterSchema.safeParse(req.body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(', ');
      return generateErrorUtil(400, msg);
    }
    const { name, image_url, user_id, campaign_id } = parsed.data;
    const id = await createCharacterModel({ name, image_url: image_url ?? null, user_id, campaign_id });
    res.status(201).json({ status: 'ok', data: { id, name, image_url: image_url ?? null, user_id, campaign_id } });
  } catch (err) { next(err); }
};
