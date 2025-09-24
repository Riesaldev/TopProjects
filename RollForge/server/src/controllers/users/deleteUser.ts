import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { deleteUserModel, getById, hasReferences } from '@/models/users/index.ts';

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const refs = await hasReferences(Number(id));
    if (refs) {
      generateErrorUtil(409, 'El usuario tiene referencias y no puede ser borrado');
    }
    const exists = await getById(Number(id));
    if (!exists) {
      return generateErrorUtil(404, 'Usuario no encontrado');
    }
    await deleteUserModel(Number(id));
    res.json({
      status: 'ok',
      message: 'Usuario borrado'
    });

  } catch {
    generateErrorUtil(500, 'Error al borrar usuario');
  }
};
