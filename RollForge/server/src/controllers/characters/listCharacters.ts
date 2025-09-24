import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { listCharactersModel } from '@/models/characters/index.ts';

export const listCharacters = async (req: Request, res: Response) => {
  try {
    const { campaign_id } = req.query as { campaign_id?: string };
    const rows = await listCharactersModel(campaign_id ? Number(campaign_id) : undefined);
    res.json({ status: 'ok', data: rows });
  } catch {
    generateErrorUtil(500, 'Error al obtener personajes');
  }
};
