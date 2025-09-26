import crypto from 'crypto';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { findByEmail, setRecoveryCode } from '@/models/users/index.ts';
import { sendMail } from '@/utils/sendMail.ts';

export const startPasswordRecovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    const user = await findByEmail(email);
    if (!user) {
      generateErrorUtil(404, 'Usuario no encontrado');
      return;
    }

    const code = crypto.randomInt(100000, 999999).toString();
    await setRecoveryCode(email, code);

    const { APP_NAME, FRONTEND_URL } = process.env as { APP_NAME?: string; FRONTEND_URL?: string };
    const appName = APP_NAME ?? 'RollForge';
    const recoveryUrl = FRONTEND_URL ? `${FRONTEND_URL.replace(/\/?$/, '')}/forgot-password` : undefined;
    const greeting = user.username ? `Hola ${user.username},` : 'Hola,';
    const textLines = [
      greeting,
      '',
      `Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en ${appName}.`,
      `Tu código de recuperación es: ${code}`,
      'Introduce este código en la página de recuperación y elige una nueva contraseña segura.',
      recoveryUrl ? `Página de recuperación: ${recoveryUrl}` : undefined,
      '',
      'Si no solicitaste este cambio, puedes ignorar este mensaje.',
      '',
      `${appName} · Equipo de soporte`,
    ].filter(Boolean).join('\n');

    const html = `
      <p>${greeting}</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>${appName}</strong>.</p>
      <p style="font-size: 1.25rem; font-weight: 700;">Código de recuperación: <span style="letter-spacing: 0.2rem;">${code}</span></p>
      <p>Introduce este código en la página de recuperación y elige una nueva contraseña segura.${recoveryUrl ? ` También puedes ir directamente haciendo clic en <a href="${recoveryUrl}">${recoveryUrl}</a>.` : ''}</p>
      <p style="margin-top: 2rem;">Si no solicitaste este cambio, ignora este mensaje.</p>
      <p>— ${appName}</p>
    `;

    await sendMail({
      to: email,
      subject: `${appName} · Código de recuperación`,
      text: textLines,
      html,
    });

    res.json({
      status: 'ok',
      message: 'Código de recuperación generado',
      code
    });

  } catch {
    generateErrorUtil(500, 'Error al iniciar la recuperación de contraseña');
  }
};
