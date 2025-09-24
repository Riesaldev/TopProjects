import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const getRecoveryCode = async (email: UserRow['email']): Promise<string | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>('SELECT recoverPassword FROM users WHERE email = ?', [email]);
  const row = rows[0] as (RowDataPacket & { recoverPassword?: string | null }) | undefined;
  return row?.recoverPassword ?? null;
};
