import crypto from 'crypto';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
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

export const startPasswordRecovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    // Para no permitir enumeración de emails devolvemos siempre respuesta genérica.
    const user = await findByEmail(email);
    const exists = !!user;

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

    res.json({
      status: 'ok',
      message: 'Si el email existe se ha enviado un código de recuperación'
    });

  } catch (e) {
    console.error('[startPasswordRecovery] error:', e);
    generateErrorUtil(500, 'Error al iniciar la recuperación de contraseña');
  }
};
