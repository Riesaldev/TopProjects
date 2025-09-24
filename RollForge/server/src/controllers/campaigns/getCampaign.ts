import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getCampaignById } from '@/models/campains/index.ts';

export const getCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const row = await getCampaignById(Number(id));

    if (!row) {
      generateErrorUtil(404, 'Campaña no encontrada');
    }

    res.json({
      status: 'ok',
      data: row
    }
    );

  } catch {
    generateErrorUtil(500, 'Error al obtener campaña');
  }
};
