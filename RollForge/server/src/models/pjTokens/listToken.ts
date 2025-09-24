import { getPool } from '@/db/getPool.ts';
import type { PJTokenRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const listTokenModel = async (
  character_id?: PJTokenRow['character_id'],
  campaign_id?: PJTokenRow['campaign_id'],
  user_id?: PJTokenRow['user_id'],
): Promise<PJTokenRow[]> => {
  const pool = await getPool();
  if (!pool) return [];
  let query = 'SELECT id, name, image_url, character_id, campaign_id, user_id FROM tokens';
  const where: string[] = [];
  const params: Array<number> = [];
  if (typeof character_id !== 'undefined' && character_id !== null) {
    where.push('character_id = ?');
    params.push(character_id);
  }
  if (typeof campaign_id !== 'undefined' && campaign_id !== null) {
    where.push('campaign_id = ?');
    params.push(campaign_id);
  }
  if (typeof user_id !== 'undefined' && user_id !== null) {
    where.push('user_id = ?');
    params.push(user_id);
  }
  if (where.length) {
    query += ' WHERE ' + where.join(' AND ');
  }
  const [rows] = await pool.query<RowDataPacket[]>(query, params);
  return (rows as unknown) as PJTokenRow[] ?? [];
};