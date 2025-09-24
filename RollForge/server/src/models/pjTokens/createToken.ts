import { getPool } from '@/db/getPool.ts';
import type { CreateTokenModelInput } from './types.ts';
import type { ResultSetHeader } from 'mysql2/promise';

export const createTokenModel = async (data: CreateTokenModelInput): Promise<number> => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO tokens (name, image_url, character_id, campaign_id, user_id) VALUES (?, ?, ?, ?, ?)',
    [data.name, data.image_url ?? null, data.character_id ?? null, data.campaign_id, data.user_id]
  );
  return result.insertId;
};