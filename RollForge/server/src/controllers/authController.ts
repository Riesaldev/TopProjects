import type { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import { env } from '../config/environment.js';
import { AppError } from '../middlewares/errorHandler.js';
import { loginSchema, registerSchema, recoverPasswordSchema, resetPasswordSchema } from '../utils/schemas.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import type { DbUser } from '../types/entities.js';

function signToken(userId: number, role: string): string {
  return jwt.sign({ sub: userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

function sanitizeUser(user: DbUser) {
  const { password_hash: _, ...safe } = user;
  return safe;
}

export async function login(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const [rows] = await pool.query<any[]>('SELECT * FROM users WHERE email = ?', [email]);
    const user: DbUser | undefined = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new AppError(401, 'Invalid email or password');
    }

    const token = signToken(user.id, user.role);
    res.json({ success: true, data: { token, user: sanitizeUser(user) } });
  } catch (err) {
    next(err);
  }
}

export async function register(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password, username, display_name } = registerSchema.parse(req.body);

    const [exists] = await pool.query<any[]>(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username],
    );
    if ((exists as any[]).length > 0) throw new AppError(409, 'Email or username already in use');

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query<any>(
      'INSERT INTO users (email, username, password_hash, display_name) VALUES (?, ?, ?, ?)',
      [email, username, hash, display_name ?? username],
    );

    const [userRows] = await pool.query<any[]>('SELECT * FROM users WHERE id = ?', [result.insertId]);
    const user: DbUser = userRows[0];
    const token = signToken(user.id, user.role);

    res.status(201).json({ success: true, data: { token, user: sanitizeUser(user) } });
  } catch (err) {
    next(err);
  }
}

export async function recoverPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = recoverPasswordSchema.parse(req.body);
    // TODO: generate reset token, store in DB, send email via emailService
    console.log(`[auth] password recovery requested for ${email}`);
    res.json({ success: true, message: 'If the email exists, a recovery link has been sent.' });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body);
    // TODO: verify token from DB, update password_hash, invalidate token
    console.log(`[auth] reset password with token ${token}`);
    const hash = await bcrypt.hash(password, 12);
    console.log('[auth] new hash:', hash);
    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query<any[]>('SELECT * FROM users WHERE id = ?', [req.userId]);
    const user: DbUser | undefined = rows[0];
    if (!user) throw new AppError(404, 'User not found');
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
}
