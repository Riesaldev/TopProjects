import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { clearRecoveryAndSetPassword, getRecoveryCode } from '@/models/users/index.ts';

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body as { email: string; code: string; newPassword: string };
    const stored = await getRecoveryCode(email);
    if (!stored) {
      generateErrorUtil(404, 'Usuario no encontrado');
    }
    if (stored !== code) {
      generateErrorUtil(400, 'Código inválido');
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await clearRecoveryAndSetPassword(email, hash);

    res.json({
      status: 'ok',
      message: 'Contraseña restablecida'
    });
  } catch {
    generateErrorUtil(500, 'Error al restablecer la contraseña');
  }
};
