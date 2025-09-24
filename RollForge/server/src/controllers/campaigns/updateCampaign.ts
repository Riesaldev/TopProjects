import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { idParamSchema, updateCampaignSchema as schema } from '@/schemas/campaign.ts';
import { getCampaignById, updateCampaignModel } from '@/models/campains/index.ts';
// No usamos pool directamente en el controlador; delegamos en el modelo

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);

    if (!parsedParams.success) {
      generateErrorUtil(400, 'ID de campaña inválido');
    }
    const { id } = parsedParams.data as { id: number };

    const parsedBody = schema.safeParse(req.body);

    if (!parsedBody.success) {
      generateErrorUtil(400, 'Datos de campaña inválidos');
    }
    const { name, description } = parsedBody.data as { name?: string; description?: string | null };

    const exists = await getCampaignById(id);
    if (!exists) {
      return generateErrorUtil(404, 'Campaña no encontrada');
    }
    await updateCampaignModel(id, {
      id,
      name: name ?? exists.name,
      description: typeof description === 'undefined' ? exists.description : description,
      gm_id: exists.gm_id,
    });

    res.json({
      status: 'ok',
      message: 'Campaña actualizada'
    });

  } catch {
    generateErrorUtil(500, 'Error al actualizar campaña');
  }
};
