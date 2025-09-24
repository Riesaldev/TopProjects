import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getResourceById } from '@/models/resourses/index.ts';

export const getResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const row = await getResourceById(Number(id));
    if (!row) {
      generateErrorUtil(404, 'Recurso no encontrado');
      return; // para el flujo de TS
    }
    const userId = req.user!.userId;
    if (row.uploaded_by !== null && row.uploaded_by !== userId) {
      return generateErrorUtil(403, 'No tienes acceso a este recurso');
    }

    res.json({ status: 'ok', data: row });
  } catch {
    generateErrorUtil(500, 'Error al obtener el recurso');
  }
};
