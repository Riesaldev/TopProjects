import request from 'supertest';
import './testSetup';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import usersRouter from '@/routes/users.ts';
import { errorHandler, notFound } from '@/middlewares/index.ts';
import { getPool } from '@/db/getPool.ts';

function buildApp() {
  const app = express();
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use('/api/users', usersRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

const app = buildApp();

// Mock de envío de correo: evita dependencias externas en test
vi.mock('@/utils/email/sendEmail.ts', () => ({
  sendEmail: vi.fn().mockResolvedValue({ messageId: 'test' })
}));

// Helper para crear un usuario de prueba directamente
async function createTestUser() {
  const pool = await getPool();
  if (!pool) throw new Error('Sin pool');
  await pool.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [
    'tester', 'tester@example.com', '$2b$10$abcdefghijklmnopqrstuv' // hash dummy
  ]);
}

describe('Flujo recuperación contraseña', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  it('Solicitud recovery responde ok genérico', async () => {
    const res = await request(app).post('/api/users/password/recover').send({ email: 'tester@example.com' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });

  it('Rate limit excesivo mantiene respuesta genérica', async () => {
    for (let i = 0; i < 6; i++) {
      await request(app).post('/api/users/password/recover').send({ email: 'tester@example.com' });
    }
    const res = await request(app).post('/api/users/password/recover').send({ email: 'tester@example.com' });
    expect(res.status).toBe(200);
  });
});
