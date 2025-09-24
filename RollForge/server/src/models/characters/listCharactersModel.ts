import { getPool } from '@/db/getPool.ts';
import type { CharacterRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const listCharactersModel = async (campaign_id?: CharacterRow['campaign_id']): Promise<CharacterRow[]> => {
  const pool = await getPool();
  if (!pool) return [];
  if (campaign_id) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM characters WHERE campaign_id = ? ORDER BY id DESC',
      [campaign_id]
    );
    return (rows as unknown) as CharacterRow[];
  }
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM characters ORDER BY id DESC');
  return (rows as unknown) as CharacterRow[];
};
