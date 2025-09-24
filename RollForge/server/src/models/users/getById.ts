import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

interface UserRowPacket extends RowDataPacket, UserRow { }

export const getById = async (id: UserRow['id']): Promise<UserRow | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<UserRowPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
  return (rows[0] as UserRow | undefined) ?? null;
};
