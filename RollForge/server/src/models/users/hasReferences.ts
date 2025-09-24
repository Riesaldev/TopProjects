import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const hasReferences = async (id: UserRow['id']): Promise<boolean> => {
  const pool = await getPool();
  if (!pool) return false;
  const [refs1] = await pool.query<RowDataPacket[]>('SELECT id FROM campaigns WHERE gm_id = ? LIMIT 1', [id]);
  const [refs2] = await pool.query<RowDataPacket[]>('SELECT id FROM characters WHERE user_id = ? LIMIT 1', [id]);
  const [refs3] = await pool.query<RowDataPacket[]>('SELECT id FROM resources WHERE uploaded_by = ? LIMIT 1', [id]);
  return Boolean(refs1.length || refs2.length || refs3.length);
};
