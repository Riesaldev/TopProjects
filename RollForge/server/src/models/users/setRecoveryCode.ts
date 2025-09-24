import { getPool } from '@/db/getPool.ts';
import { UserRow } from './types.ts';

export const setRecoveryCode = async (email: UserRow['email'], code: UserRow['recoverPassword']) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('UPDATE users SET recoverPassword = ? WHERE email = ?', [code, email]);
};
