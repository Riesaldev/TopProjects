import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { listTokenModel } from '@/models/pjTokens/index.ts';

export const listTokens = async (req: Request, res: Response) => {
  try {
    const { character_id, campaign_id, user_id } = req.query as { character_id?: string; campaign_id?: string; user_id?: string };
    const rows = await listTokenModel(
      character_id ? Number(character_id) : undefined,
      campaign_id ? Number(campaign_id) : undefined,
      user_id ? Number(user_id) : undefined,
    );
    res.json({ status: 'ok', data: rows });
  } catch {
    generateErrorUtil(500, 'Error al obtener tokens');
  }
};
