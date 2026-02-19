import type { Response, NextFunction } from 'express';
import { pool } from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';
import { createCampaignSchema, updateCampaignSchema } from '../utils/schemas.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export async function getCampaigns(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query<any[]>(
      `SELECT c.*, u.username AS owner_username
       FROM campaigns c
       JOIN users u ON c.owner_id = u.id
       WHERE c.owner_id = ?
          OR c.id IN (SELECT campaign_id FROM campaign_players WHERE user_id = ?)
       ORDER BY c.updated_at DESC`,
      [req.userId, req.userId],
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

export async function createCampaign(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = createCampaignSchema.parse(req.body);
    const [result] = await pool.query<any>(
      'INSERT INTO campaigns (name, description, system, owner_id) VALUES (?, ?, ?, ?)',
      [data.name, data.description ?? null, data.system ?? null, req.userId],
    );
    const [rows] = await pool.query<any[]>('SELECT * FROM campaigns WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function getCampaign(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<any[]>(
      `SELECT c.*, u.username AS owner_username
       FROM campaigns c
       JOIN users u ON c.owner_id = u.id
       WHERE c.id = ?`,
      [id],
    );
    if (!(rows as any[]).length) throw new AppError(404, 'Campaign not found');
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function updateCampaign(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const data = updateCampaignSchema.parse(req.body);

    const [existing] = await pool.query<any[]>('SELECT owner_id FROM campaigns WHERE id = ?', [id]);
    if (!(existing as any[]).length) throw new AppError(404, 'Campaign not found');
    if ((existing as any[])[0].owner_id !== req.userId) throw new AppError(403, 'Forbidden');

    const fields = Object.entries(data)
      .filter(([, v]) => v !== undefined)
      .map(([k]) => `${k} = ?`).join(', ');
    const values = Object.values(data).filter((v) => v !== undefined);
    if (fields) {
      await pool.query(`UPDATE campaigns SET ${fields}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    }

    const [rows] = await pool.query<any[]>('SELECT * FROM campaigns WHERE id = ?', [id]);
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function deleteCampaign(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const [existing] = await pool.query<any[]>('SELECT owner_id FROM campaigns WHERE id = ?', [id]);
    if (!(existing as any[]).length) throw new AppError(404, 'Campaign not found');
    if ((existing as any[])[0].owner_id !== req.userId) throw new AppError(403, 'Forbidden');

    await pool.query('DELETE FROM campaigns WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
