import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { ResultSetHeader } from 'mysql2/promise';

export const createUser = async (data: Omit<UserRow, 'id'>): Promise<number> => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)',
    [data.username, data.email, data.password, data.avatar ?? null]
  );
  return result.insertId as number;
};
