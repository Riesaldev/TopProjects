import { Router } from 'express';
import { sendEmail } from '@/utils/email/sendEmail.ts';
import nodemailer from 'nodemailer';

export const diagnosticsRouter = Router();

diagnosticsRouter.get('/email', async (req, res) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, MAIL_FROM, NODE_ENV } = process.env;
  const test = req.query.test === '1';
  const verify = req.query.verify === '1';
  const debug = req.query.debug === '1';
  const safeConfig = {
    mode: !SMTP_HOST || !SMTP_PORT ? 'dev-console' : 'smtp',
    host: SMTP_HOST || null,
    port: SMTP_PORT ? Number(SMTP_PORT) : null,
    auth: !!SMTP_USER,
    from: MAIL_FROM || null,
    nodeEnv: NODE_ENV || 'development',
  } as const;
  let testResult: any = null;
  let verifyResult: any = null;
  if (debug) {
    process.env.SMTP_DEBUG = 'true';
  }
  if (test && NODE_ENV !== 'production') {
    try {
      const to = (req.query.to as string) || (MAIL_FROM || 'test@local.test');
      const r = await sendEmail({
        to,
        subject: 'Email diagnostic test',
        text: 'Mensaje de prueba de endpoint diagnóstico',
      });
      testResult = { ok: true, messageId: r.messageId };
    } catch (e: any) {
      testResult = { ok: false, error: e?.message || String(e) };
    }
  }
  if (verify && NODE_ENV !== 'production') {
    try {
      if (!SMTP_HOST || !SMTP_PORT) throw new Error('SMTP incompleto');
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: SMTP_USER && process.env.SMTP_PASS ? { user: SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });
      await transport.verify();
      verifyResult = { ok: true };
    } catch (e: any) {
      verifyResult = { ok: false, error: e?.message || String(e) };
    }
  }
  res.json({ email: safeConfig, test: testResult, verify: verifyResult, debugEnabled: debug || false });
});

export default diagnosticsRouter;