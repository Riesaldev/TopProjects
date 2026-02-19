import type { Response, NextFunction } from 'express';
import { pool } from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';
import { createCharacterSchema, updateCharacterSchema } from '../utils/schemas.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export async function getCharacters(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { campaign_id } = req.query;
    const query = campaign_id
      ? 'SELECT * FROM characters WHERE user_id = ? AND campaign_id = ? ORDER BY updated_at DESC'
      : 'SELECT * FROM characters WHERE user_id = ? ORDER BY updated_at DESC';
    const params = campaign_id ? [req.userId, campaign_id] : [req.userId];
    const [rows] = await pool.query<any[]>(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

export async function createCharacter(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = createCharacterSchema.parse(req.body);
    const [result] = await pool.query<any>(
      `INSERT INTO characters
        (name, user_id, campaign_id, system, class, race, level, hp, max_hp, ac, main_stat, main_stat_value)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.name, req.userId, data.campaign_id ?? null, data.system, data.class, data.race,
       data.level, data.hp, data.max_hp, data.ac, data.main_stat, data.main_stat_value],
    );
    const [rows] = await pool.query<any[]>('SELECT * FROM characters WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function getCharacter(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<any[]>('SELECT * FROM characters WHERE id = ? AND user_id = ?', [id, req.userId]);
    if (!(rows as any[]).length) throw new AppError(404, 'Character not found');
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function updateCharacter(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const data = updateCharacterSchema.parse(req.body);

    const [existing] = await pool.query<any[]>('SELECT user_id FROM characters WHERE id = ?', [id]);
    if (!(existing as any[]).length) throw new AppError(404, 'Character not found');
    if ((existing as any[])[0].user_id !== req.userId) throw new AppError(403, 'Forbidden');

    const fields = Object.entries(data)
      .filter(([, v]) => v !== undefined)
      .map(([k]) => `${k} = ?`).join(', ');
    const values = Object.values(data).filter((v) => v !== undefined);
    if (fields) {
      await pool.query(`UPDATE characters SET ${fields}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    }

    const [rows] = await pool.query<any[]>('SELECT * FROM characters WHERE id = ?', [id]);
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function deleteCharacter(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const [existing] = await pool.query<any[]>('SELECT user_id FROM characters WHERE id = ?', [id]);
    if (!(existing as any[]).length) throw new AppError(404, 'Character not found');
    if ((existing as any[])[0].user_id !== req.userId) throw new AppError(403, 'Forbidden');

    await pool.query('DELETE FROM characters WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
