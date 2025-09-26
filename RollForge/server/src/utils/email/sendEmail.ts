import nodemailer from 'nodemailer';

// Crea (y reutiliza) un transporte SMTP basado en variables de entorno.
// Si faltan datos mínimos, lanzamos error para que el caller decida.
// En desarrollo se puede usar un servicio tipo Mailtrap / Ethereal.

let transporter: nodemailer.Transporter | null = null;

function getTransport() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, NODE_ENV } = process.env;
  if (!SMTP_HOST || !SMTP_PORT) {
    if (NODE_ENV !== 'production') {
      console.warn('[email] SMTP incompleto; se usará modo consola (solo desarrollo).');
      // Fake transport que imprime
      transporter = {
        sendMail: async (opts: any) => {
          // eslint-disable-next-line no-console
          console.log('[email:FAKE_DEV] ->', JSON.stringify({ to: opts.to, subject: opts.subject, text: opts.text }, null, 2));
          return { messageId: 'dev-fake', accepted: [opts.to] };
        }
      } as unknown as nodemailer.Transporter;
      return transporter;
    }
    throw new Error('Configuración SMTP incompleta (faltan host/port)');
  }
  const port = Number(SMTP_PORT);
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === 'false' ? false : (SMTP_SECURE === 'true' || port === 465),
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transporter;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  // Campos para plantilla simple opcional
  templateName?: 'passwordRecovery';
  templateData?: Record<string, string | number | null | undefined>;
}

function renderTemplate(name: string, data: Record<string, string | number | null | undefined>): { html: string; text: string } {
  switch (name) {
    case 'passwordRecovery': {
      const code = data.code ?? '******';
      const minutes = data.minutes ?? 15;
      const product = 'RollForge';
      const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><title>Recuperación de contraseña</title>
<style>
body { font-family: system-ui,-apple-system,'Segoe UI',Roboto,sans-serif; background:#0f0f17; color:#eee; padding:0; margin:0; }
.container { max-width:560px; margin:0 auto; padding:32px 24px; }
.panel { background:#1d1f29; border:1px solid #2e3241; border-radius:12px; padding:32px; }
h1 { font-size:20px; margin:0 0 16px; color:#ffd369; }
p { line-height:1.5; margin:0 0 16px; }
.code { font-size:32px; letter-spacing:6px; font-weight:600; background:#272b37; padding:16px 24px; text-align:center; border-radius:8px; color:#fff; border:1px solid #343b4d; }
.meta { font-size:12px; color:#9aa4b5; margin-top:24px; }
a.button { display:inline-block; margin-top:24px; background:#ffb347; color:#222; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:600; }
@media (prefers-color-scheme: light) {
  body { background:#fafafa; color:#222 }
  .panel { background:#ffffff; border-color:#e2e8f0 }
  .code { background:#f1f5f9; color:#111; border-color:#e2e8f0 }
  .meta { color:#64748b }
}
</style></head><body><div class="container"><div class="panel">
<h1>Recuperación de contraseña</h1>
<p>Has solicitado restablecer tu contraseña en <strong>${product}</strong>.</p>
<p>Introduce el siguiente código en la pantalla de recuperación:</p>
<div class="code">${code}</div>
<p>Este código caduca en <strong>${minutes} minutos</strong>. Si no has solicitado este correo, puedes ignorarlo con seguridad.</p>
<p style="font-size:13px;opacity:.8">Por motivos de seguridad, no reenvíes este código a nadie.</p>
<div class="meta">&copy; ${new Date().getFullYear()} ${product}. Todos los derechos reservados.</div>
</div></div></body></html>`;
      const text = `Recuperación de contraseña en ${product}\nCódigo: ${code}\nCaduca en ${minutes} min. Si no solicitaste este correo, ignóralo.`;
      return { html, text };
    }
    default:
      return { html: String(data.html ?? ''), text: String(data.text ?? '') };
  }
}

export async function sendEmail(opts: SendEmailOptions) {
  const { to, subject } = opts;
  const { MAIL_FROM } = process.env;
  if (!MAIL_FROM) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[email] MAIL_FROM no definido; usando fallback "no-reply@local.test"');
    } else {
      throw new Error('MAIL_FROM no definido');
    }
  }

  const transport = getTransport();
  let resolvedHtml = opts.html;
  let resolvedText = opts.text;
  if (opts.templateName) {
    const rendered = renderTemplate(opts.templateName, { ...opts.templateData });
    resolvedHtml = rendered.html;
    resolvedText = rendered.text;
  }
  const info = await transport.sendMail({
    from: MAIL_FROM || 'no-reply@local.test',
    to,
    subject,
    text: resolvedText ?? undefined,
    html: resolvedHtml ?? resolvedText ?? undefined,
  });
  // Logging de éxito (sin contenido del email)
  try {
    const debugMode = process.env.SMTP_DEBUG === 'true';
    const base = `[email] OK to=${to} template=${opts.templateName || 'raw'} id=${info.messageId}`;
    if (debugMode) {
      console.log(base, {
        accepted: (info as any).accepted,
        rejected: (info as any).rejected,
        response: (info as any).response,
      });
    } else {
      console.log(base);
    }
  } catch {
    // noop
  }
  return { success: true, messageId: (info as any).messageId };
}

export default sendEmail;
