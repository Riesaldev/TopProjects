import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const getPasswordHash = async (id: UserRow['id']): Promise<string | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>('SELECT password FROM users WHERE id = ?', [id]);
  const row = rows[0] as (RowDataPacket & { password?: string }) | undefined;
  return row?.password ?? null;
};
