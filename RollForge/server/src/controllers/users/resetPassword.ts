import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { clearRecoveryAndSetPassword, getRecoveryData } from '@/models/users/index.ts';

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body as { email: string; code: string; newPassword: string };
    const { hash: storedHash, expires } = await getRecoveryData(email);
    if (!storedHash) {
      generateErrorUtil(404, 'Usuario no encontrado o sin código activo');
    }
    const match = await bcrypt.compare(code, storedHash!);
    if (!match) generateErrorUtil(400, 'Código inválido');
    if (!expires || Date.now() > expires.getTime()) {
      generateErrorUtil(400, 'Código caducado');
    }
    const newHash = await bcrypt.hash(newPassword, 10);
    await clearRecoveryAndSetPassword(email, newHash);

    res.json({
      status: 'ok',
      message: 'Contraseña restablecida'
    });
  } catch {
    generateErrorUtil(500, 'Error al restablecer la contraseña');
  }
};
