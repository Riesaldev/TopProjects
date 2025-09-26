import crypto from 'crypto';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
<<<<<<< HEAD
import { findByEmail, setRecoveryCodeWithExpiry } from '@/models/users/index.ts';
import { sendEmail } from '@/utils/email/sendEmail.ts';

// Rate limit por email en memoria (simple). Para producción usar redis u otro almacén distribuido.
interface EmailRateData { count: number; first: number; }
const emailRateWindowMs = Number(process.env.RECOVERY_EMAIL_WINDOW_MS ?? '900000'); // 15 min
const emailRateMax = Number(process.env.RECOVERY_EMAIL_MAX ?? '5');
const emailRateMap = new Map<string, EmailRateData>();

function checkEmailRate(email: string) {
  const now = Date.now();
  const data = emailRateMap.get(email);
  if (!data) {
    emailRateMap.set(email, { count: 1, first: now });
    return true;
  }
  if (now - data.first > emailRateWindowMs) {
    // ventana expirada, reiniciamos
    emailRateMap.set(email, { count: 1, first: now });
    return true;
  }
  if (data.count >= emailRateMax) return false;
  data.count += 1;
  return true;
}
=======
import { findByEmail, setRecoveryCode } from '@/models/users/index.ts';
import { sendMail } from '@/utils/sendMail.ts';
>>>>>>> 957448fce1e42a4499f2e508d7cc222881dce444

export const startPasswordRecovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    // Para no permitir enumeración de emails devolvemos siempre respuesta genérica.
    const user = await findByEmail(email);
<<<<<<< HEAD
    const exists = !!user;
=======
    if (!user) {
      generateErrorUtil(404, 'Usuario no encontrado');
      return;
    }
>>>>>>> 957448fce1e42a4499f2e508d7cc222881dce444

    const EXP_MIN = Number(process.env.RECOVERY_CODE_MINUTES ?? '15');
    if (exists) {
      // Comprobar rate limit específico por email (si excede, respondemos genérico igualmente)
      const allowed = checkEmailRate(email.toLowerCase());
      if (!allowed) {
        return res.json({
          status: 'ok',
          message: 'Si el email existe se ha enviado un código de recuperación'
        });
      }
      const code = crypto.randomInt(100000, 999999).toString();
      await setRecoveryCodeWithExpiry(email, code, EXP_MIN);
      try {
        await sendEmail({
          to: email,
          subject: 'Recuperación de contraseña',
          templateName: 'passwordRecovery',
          templateData: { code, minutes: EXP_MIN }
        });
      } catch (err) {
        console.error('[startPasswordRecovery] Fallo enviando email (se continuará con respuesta genérica):', err);
      }
    }

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
      message: 'Si el email existe se ha enviado un código de recuperación'
    });

  } catch (e) {
    console.error('[startPasswordRecovery] error:', e);
    generateErrorUtil(500, 'Error al iniciar la recuperación de contraseña');
  }
};
