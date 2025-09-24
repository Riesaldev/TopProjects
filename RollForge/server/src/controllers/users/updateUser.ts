import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { Request, Response } from 'express';
import { findByEmail, findByUsername, getById, updateUserModel } from '@/models/users/index.ts';

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const { username, email } = req.body as { username?: string; email?: string };

    const exists = await getById(Number(id));
    if (!exists) {
      return generateErrorUtil(404, 'Usuario no encontrado');
    }
    if (email) {
      const other = await findByEmail(email);
      if (other && other.id !== Number(id)) {
        generateErrorUtil(409, 'Email ya en uso');
      }
    }
    if (username) {
      const otherU = await findByUsername(username);
      if (otherU && otherU.id !== Number(id)) {
        generateErrorUtil(409, 'Username ya en uso');
      }
    }
    await updateUserModel(Number(id), { username, email });

    res.json({
      status: 'ok',
      message: 'Usuario actualizado'
    });
  } catch {
    generateErrorUtil(500, 'Error al actualizar el usuario');
  }
};
