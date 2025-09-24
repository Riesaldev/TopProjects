import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { idParamSchema, updateResourceSchema as schema } from '@/schemas/resourses.ts';
import { getResourceById, updateResourceModel } from '@/models/resourses/index.ts';

export const updateResource = async (req: Request, res: Response) => {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);

    if (!parsedParams.success) {
      generateErrorUtil(400, 'ID de recurso inválido');
    }
    const { id } = parsedParams.data as { id: number };

    const parsedBody = schema.safeParse(req.body);

    if (!parsedBody.success) {
      generateErrorUtil(400, 'Datos de recurso inválidos');
    }
    const { name, type, url } = parsedBody.data as {
      name?: string;
      type?: 'image' | 'audio' | 'pdf' | 'other';
      url?: string;
    };

    const exists = await getResourceById(id);
    if (!exists) generateErrorUtil(404, 'Recurso no encontrado');
    const userId = req.user!.userId;
    if (exists!.uploaded_by === null || exists!.uploaded_by !== userId) {
      return generateErrorUtil(403, 'No tienes acceso a este recurso');
    }
    await updateResourceModel(id, { name, type, url });

    res.json({ status: 'ok', message: 'Recurso actualizado' });
  } catch {
    generateErrorUtil(500, 'Error al actualizar recurso');
  }
};
