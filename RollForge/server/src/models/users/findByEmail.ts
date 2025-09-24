import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

interface UserRowPacket extends RowDataPacket, UserRow { }

export const findByEmail = async (email: UserRow['email']): Promise<UserRow | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<UserRowPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
  return (rows[0] as UserRow | undefined) ?? null;
};
