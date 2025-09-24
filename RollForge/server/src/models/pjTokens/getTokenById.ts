import { getPool } from '@/db/getPool.ts';
import type { PJTokenRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const getTokenByIdModel = async (id: PJTokenRow['id']): Promise<PJTokenRow | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, image_url, character_id, campaign_id, user_id FROM tokens WHERE id = ?', [id]);
  return (rows[0] as PJTokenRow) ?? null;
};