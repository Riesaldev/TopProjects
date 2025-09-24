import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { getPasswordHash, updatePassword } from '@/models/users/index.ts';

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };

    const storedHash = await getPasswordHash(Number(id));
    if (!storedHash) {
      return generateErrorUtil(404, 'Usuario no encontrado');
    }
    const ok = await bcrypt.compare(currentPassword, storedHash);

    if (!ok) {
      return generateErrorUtil(401, 'Contraseña actual incorrecta');
    }
    const hash = await bcrypt.hash(newPassword, 10);

    await updatePassword(Number(id), hash);

    res.json({
      status: 'ok',
      message: 'Contraseña actualizada'
    }
    );
  } catch {
    generateErrorUtil(500, 'Error al cambiar la contraseña');
  }
};
