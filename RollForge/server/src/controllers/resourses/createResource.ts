import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { createResourceSchema, type CreateResourceInput } from '@/schemas/resourses.ts';
import { createResourceModel } from '@/models/resourses/index.ts';

export const createResource = async (req: Request, res: Response) => {
  try {
    const parsed = createResourceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ status: 'error', message: 'Datos de recurso inválidos' });
    }

    const { name, type, url, campaign_id, is_public } = parsed.data as CreateResourceInput;
    const uploaded_by = is_public ? null : req.user!.userId;
    const id = await createResourceModel({
      name,
      type,
      url,
      campaign_id,
      uploaded_by
    });

    res.status(201).json({
      status: 'ok',
      data: {
        id,
        name,
        type,
        url,
        campaign_id,
        uploaded_by
      }
    }
    );
  } catch {
    generateErrorUtil(500, 'Error al crear el recurso');
  }
};
