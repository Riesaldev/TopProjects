import { getPool } from '@/db/getPool.ts';
import type { RowDataPacket } from 'mysql2/promise';

export interface RecoveryData {
  hash: string | null; // hash bcrypt del código
  expires: Date | null;
}

export const getRecoveryData = async (email: string): Promise<RecoveryData> => {
  const pool = await getPool();
  if (!pool) return { hash: null, expires: null };
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT recoverPassword as hash, recoverPasswordExpires as expires FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  const row = rows[0] as (RowDataPacket & { hash?: string | null; expires?: Date | null }) | undefined;
  return { hash: row?.hash ?? null, expires: row?.expires ? new Date(row.expires) : null };
};
