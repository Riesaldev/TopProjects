import crypto from 'crypto';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { findByEmail, setRecoveryCode } from '@/models/users/index.ts';

export const startPasswordRecovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    const user = await findByEmail(email);
    if (!user) {
      generateErrorUtil(404, 'Usuario no encontrado');
    }

    const code = crypto.randomInt(100000, 999999).toString();
    await setRecoveryCode(email, code);

    res.json({
      status: 'ok',
      message: 'Código de recuperación generado',
      code
    });

  } catch {
    generateErrorUtil(500, 'Error al iniciar la recuperación de contraseña');
  }
};
