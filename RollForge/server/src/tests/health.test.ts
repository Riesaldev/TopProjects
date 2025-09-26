import request from 'supertest';
import './testSetup';
import { describe, it, expect } from 'vitest';

// Importamos la app levantando un servidor efímero.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import usersRouter from '@/routes/users.ts';
import campaignsRouter from '@/routes/campaigns.ts';
import pjsRouter from '@/routes/pjs.ts';
import resourcesRouter from '@/routes/resources.ts';
import tokensRouter from '@/routes/tokens.ts';
import { errorHandler, notFound } from '@/middlewares/index.ts';

function buildApp() {
  const app = express();
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/users', usersRouter);
  app.use('/api/campaigns', campaignsRouter);
  app.use('/api/pjs', pjsRouter);
  app.use('/api/resources', resourcesRouter);
  app.use('/api/tokens', tokensRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

const app = buildApp();

describe('Health endpoint', () => {
  it('GET /health debe responder 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
