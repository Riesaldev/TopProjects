import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import { env } from './config/environment.js';
import { testConnection } from './config/database.js';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();
const httpServer = createServer(app);

// ─── Socket.io ──────────────────────────────────────────────────────────────
export const io = new SocketIO(httpServer, {
  cors: { origin: env.CLIENT_URL, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log(`[socket] client connected: ${socket.id}`);

  socket.on('join:campaign', (campaignId: number) => {
    socket.join(`campaign:${campaignId}`);
    console.log(`[socket] ${socket.id} joined campaign:${campaignId}`);
  });

  socket.on('leave:campaign', (campaignId: number) => {
    socket.leave(`campaign:${campaignId}`);
  });

  // TODO: dice roll events, chat messages, resource updates
  socket.on('dice:roll', (payload: { campaign_id: number; roll: string; result: number }) => {
    io.to(`campaign:${payload.campaign_id}`).emit('dice:result', {
      ...payload,
      user_id: (socket.handshake.auth as any).userId,
    });
  });

  socket.on('disconnect', () => {
    console.log(`[socket] client disconnected: ${socket.id}`);
  });
});

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api', apiRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error handler (must be last) ───────────────────────────────────────────
app.use(errorHandler);

// ─── Start server ────────────────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  try {
    await testConnection();
    httpServer.listen(env.PORT, () => {
      console.log(`🚀  RollForge API running on http://localhost:${env.PORT}`);
      console.log(`🌍  Environment: ${env.NODE_ENV}`);
    });
  } catch (err) {
    console.error('❌  Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();
