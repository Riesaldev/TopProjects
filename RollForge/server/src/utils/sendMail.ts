import nodemailer from 'nodemailer';

const normalizeBoolean = (value: string | undefined): boolean | undefined => {
  if (!value) return undefined;
  return ['true', '1', 'yes', 'y', 'on'].includes(value.toLowerCase());
};

const getTransporter = (() => {
  let transporter: nodemailer.Transporter | null = null;

  return async () => {
    if (transporter) return transporter;

    const {
      SMTP_URL,
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
    } = process.env as {
      SMTP_URL?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: string;
      SMTP_SECURE?: string;
      SMTP_USER?: string;
      SMTP_PASS?: string;
    };

    if (SMTP_URL) {
      transporter = nodemailer.createTransport(SMTP_URL);
      return transporter;
    }

    if (!SMTP_HOST) {
      console.warn('[mail] SMTP_HOST no definido; usando transporte JSON de nodemailer.');
      transporter = nodemailer.createTransport({ jsonTransport: true });
      return transporter;
    }

    const port = SMTP_PORT ? Number(SMTP_PORT) : 587;
    const secure = normalizeBoolean(SMTP_SECURE) ?? port === 465;

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: SMTP_USER
        ? {
          user: SMTP_USER,
          pass: SMTP_PASS ?? '',
        }
        : undefined,
    });

    return transporter;
  };
})();

export interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: string;
  replyTo?: string;
}

export const sendMail = async ({ to, subject, text, html, from, replyTo }: SendMailOptions) => {
  const transporter = await getTransporter();
  const { MAIL_FROM, APP_NAME } = process.env as { MAIL_FROM?: string; APP_NAME?: string };
  const defaultFrom = from ?? MAIL_FROM ?? APP_NAME ?? 'RollForge <no-reply@localhost>';

  const info = await transporter.sendMail({
    to,
    from: defaultFrom,
    replyTo,
    subject,
    text,
    html,
  });

  const options = transporter.options as { jsonTransport?: boolean };
  if (options?.jsonTransport) {
    console.info('[mail] Correo simulado (jsonTransport):', JSON.stringify({ to, subject, text }));
  } else {
    console.info('[mail] Correo enviado con id:', info.messageId);
  }

  return info;
};
