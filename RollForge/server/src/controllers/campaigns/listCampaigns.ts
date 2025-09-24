import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { listCampaignsModel } from '@/models/campains/index.ts';

export const listCampaigns = async (_req: Request, res: Response) => {
  try {
    const rows = await listCampaignsModel();
    res.json({ status: 'ok', data: rows });
  } catch {
    generateErrorUtil(500, 'Error al listar campañas');
  }
};
