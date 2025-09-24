import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { createCampaignSchema } from '@/schemas/campaign.ts';
import { createCampaignModel } from '@/models/campains/index.ts';



export const createCampaign = async (req: Request, res: Response) => {
  try {
    const parsed = createCampaignSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ status: 'error', message: 'Datos de campaña inválidos' });
    }
    const { name, description, gm_id } = parsed.data;
    const id = await createCampaignModel({
      name,
      description: description ?? null,
      gm_id
    });

    res.status(201).json({
      status: 'ok', data: {
        id,
        name,
        description: description ?? null,
        gm_id
      }
    }
    );

  } catch {
    generateErrorUtil(500, 'Error al crear campaña');
  }
};
