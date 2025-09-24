import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

interface UserRowPacket extends RowDataPacket, UserRow { }

export const listUsersModel = async (): Promise<UserRow[]> => {
  const pool = await getPool();
  if (!pool) return [];
  const [rows] = await pool.query<UserRowPacket[]>(
    'SELECT id, username, email, avatar, created_at, updated_at FROM users ORDER BY id DESC'
  );
  return rows as UserRow[];
};
