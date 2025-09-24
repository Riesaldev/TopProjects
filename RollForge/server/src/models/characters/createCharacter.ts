import { getPool } from '@/db/getPool.ts';
import type { CharacterRow } from './types.ts';
import type { ResultSetHeader } from 'mysql2/promise';

export const createCharacterModel = async (data: Omit<CharacterRow, 'id'>): Promise<number> => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO characters (name, image_url, user_id, campaign_id) VALUES (?, ?, ?, ?)',
    [data.name, data.image_url ?? null, data.user_id, data.campaign_id]
  );
  return result.insertId as number;
};
