import crypto from 'crypto';
import type { Request, Response } from 'express';
import { findByEmail, setRecoveryCodeWithExpiry } from '@/models/users/index.ts';
import { sendEmail } from '@/utils/email/sendEmail.ts';

// Memoria para rate limit por email (in-memory; para escalar usar Redis)
type EmailRateEntry = { count: number; resetAt: number };
const emailRecoveryRate: Map<string, EmailRateEntry> = new Map();

function checkEmailRate(email: string): boolean {
  const now = Date.now();
  const windowMs = Number(process.env.RECOVERY_EMAIL_WINDOW_MS || '600000'); // 10 min defecto
  const max = Number(process.env.RECOVERY_EMAIL_MAX || '5');
  const entry = emailRecoveryRate.get(email);
  if (!entry || entry.resetAt < now) {
    emailRecoveryRate.set(email, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}

export const startPasswordRecovery = async (req: Request, res: Response) => {
  const genericResponse = () => res.json({
    status: 'ok',
    message: 'Si el email existe se ha enviado un código de recuperación'
  });
  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      // Respuesta genérica para no filtrar formato inválido
      return genericResponse();
    }
    const emailNorm = email.toLowerCase().trim();
    const user = await findByEmail(emailNorm);
    if (!user) {
      return genericResponse();
    }

    // Rate limit por email
    if (!checkEmailRate(emailNorm)) {
      return genericResponse();
    }

    const EXP_MIN = Number(process.env.RECOVERY_CODE_MINUTES ?? '15');
    const code = crypto.randomInt(100000, 999999).toString();
    await setRecoveryCodeWithExpiry(emailNorm, code, EXP_MIN);

    try {
      await sendEmail({
        to: emailNorm,
        subject: 'Recuperación de contraseña',
        templateName: 'passwordRecovery',
        templateData: { code, minutes: EXP_MIN }
      });
    } catch (err) {
      console.error('[startPasswordRecovery] Fallo enviando email (continuamos respuesta genérica):', err);
    }
    return genericResponse();
  } catch (err) {
    console.error('[startPasswordRecovery] error inesperado:', err);
    return res.json({ status: 'ok' }); // Mantener respuesta genérica
  }
};
