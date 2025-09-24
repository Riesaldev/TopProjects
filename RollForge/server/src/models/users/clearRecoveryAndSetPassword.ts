import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';

export const clearRecoveryAndSetPassword = async (email: UserRow['email'], passwordHash: string) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('UPDATE users SET password = ?, recoverPassword = NULL WHERE email = ?', [passwordHash, email]);
};
