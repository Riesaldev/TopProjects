import { getPool } from '@/db/getPool.ts';
import type { CharacterRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const getCharacterById = async (id: CharacterRow['id']): Promise<CharacterRow | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM characters WHERE id = ?', [id]);
  return (rows[0] as CharacterRow | undefined) ?? null;
};
