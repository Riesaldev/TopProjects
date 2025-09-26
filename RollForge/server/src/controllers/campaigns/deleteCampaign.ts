import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { deleteCampaignModel, getCampaignById, campaignHasReferences } from '@/models/campaigns/index.ts';

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const exists = await getCampaignById(Number(id));
    if (!exists) {
      return generateErrorUtil(404, 'Campaña no encontrada');
    }
    const hasRefs = await campaignHasReferences(Number(id));
    if (hasRefs) {
      return generateErrorUtil(409, 'La campaña tiene referencias y no puede borrarse');
    }
    await deleteCampaignModel(Number(id));
    res.json({
      status: 'ok',
      message: 'Campaña borrada'
    }
    );

  } catch {
    generateErrorUtil(500, 'Error al borrar campaña');
  }
};
