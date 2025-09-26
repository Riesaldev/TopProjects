import { getPool } from '@/db/getPool.ts';
import type { RowDataPacket } from 'mysql2/promise';

export interface PublicUser {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
}

export const getPublicByUsername = async (username: string): Promise<PublicUser | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, username, email, IFNULL(avatar, NULL) AS avatar FROM users WHERE username = ? LIMIT 1',
    [username]
  );
  const row = rows[0];
  if (!row) return null;
  return {
    id: Number(row.id),
    username: String(row.username),
    email: String(row.email),
    avatar: (row as Record<string, unknown>).avatar ? String((row as Record<string, unknown>).avatar) : null,
  };
};
