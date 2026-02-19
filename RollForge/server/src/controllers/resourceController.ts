import type { Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

const resourceTypes = ['map', 'token', 'handout', 'audio', 'pdf', 'other'] as const;

export async function getResources(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { campaign_id, type } = z.object({
      campaign_id: z.coerce.number().int().positive(),
      type: z.enum(resourceTypes).optional(),
    }).parse(req.query);

    // Verify user has access to the campaign
    const [access] = await pool.query<any[]>(
      `SELECT id FROM campaigns WHERE id = ? AND (owner_id = ? OR id IN (SELECT campaign_id FROM campaign_players WHERE user_id = ?))`,
      [campaign_id, req.userId, req.userId],
    );
    if (!(access as any[]).length) throw new AppError(403, 'Access denied');

    const query = type
      ? 'SELECT * FROM resources WHERE campaign_id = ? AND type = ? ORDER BY created_at DESC'
      : 'SELECT * FROM resources WHERE campaign_id = ? ORDER BY created_at DESC';
    const params = type ? [campaign_id, type] : [campaign_id];
    const [rows] = await pool.query<any[]>(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

export async function uploadResource(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { campaign_id, type } = z.object({
      campaign_id: z.coerce.number().int().positive(),
      type: z.enum(resourceTypes).default('other'),
    }).parse(req.body);

    const file = req.file;
    if (!file) throw new AppError(400, 'No file uploaded');

    // TODO: upload to cloud storage (S3, Cloudinary, etc.) and get the public URL
    const url = `/uploads/${file.filename}`;

    const [result] = await pool.query<any>(
      'INSERT INTO resources (campaign_id, uploader_id, name, type, url, size_bytes, mime_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [campaign_id, req.userId, file.originalname, type, url, file.size, file.mimetype],
    );
    const [rows] = await pool.query<any[]>('SELECT * FROM resources WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function deleteResource(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const [existing] = await pool.query<any[]>('SELECT uploader_id FROM resources WHERE id = ?', [id]);
    if (!(existing as any[]).length) throw new AppError(404, 'Resource not found');
    if ((existing as any[])[0].uploader_id !== req.userId) throw new AppError(403, 'Forbidden');

    await pool.query('DELETE FROM resources WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
