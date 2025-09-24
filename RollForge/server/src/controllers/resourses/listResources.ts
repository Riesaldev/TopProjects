import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { listResourcesModel } from '@/models/resourses/index.ts';

export const listResources = async (req: Request, res: Response) => {
  try {
    const { campaign_id } = req.query as { campaign_id?: string };
    const uploaded_by = req.user!.userId;
    const rows = await listResourcesModel(campaign_id ? Number(campaign_id) : undefined, uploaded_by);

    return res.json({ status: 'ok', data: rows });
  } catch {
    return generateErrorUtil(500, 'Error al obtener recursos');
  }
};
