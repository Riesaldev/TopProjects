import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const findByUsername = async (username: UserRow['username']): Promise<UserRow | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
  return (rows[0] as UserRow | undefined) ?? null;
};
