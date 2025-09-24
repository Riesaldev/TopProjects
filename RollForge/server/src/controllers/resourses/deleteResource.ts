import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { deleteResourceModel, getResourceById } from '@/models/resourses/index.ts';

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const exists = await getResourceById(Number(id));
    if (!exists) {
      generateErrorUtil(404, 'Recurso no encontrado');
    }
    // exists no es null a partir de aquí porque generateErrorUtil lanza
    const userId = req.user!.userId;
    if (exists!.uploaded_by === null || exists!.uploaded_by !== userId) {
      return generateErrorUtil(403, 'No tienes acceso a este recurso');
    }
    await deleteResourceModel(Number(id));

    res.json({
      status: 'ok',
      message: 'Recurso borrado'
    }
    );
  } catch {
    generateErrorUtil(500, 'Error al eliminar el recurso');
  }
};
