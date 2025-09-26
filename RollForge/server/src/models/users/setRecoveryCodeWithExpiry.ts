import { getPool } from '@/db/getPool.ts';
import { UserRow } from './types.ts';
import bcrypt from 'bcrypt';

// Genera hash bcrypt del código y lo almacena con expiración.
export const setRecoveryCodeWithExpiry = async (
  email: UserRow['email'],
  plainCode: string,
  minutes: number
) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainCode, saltRounds);
  await pool.query(
    'UPDATE users SET recoverPassword = ?, recoverPasswordExpires = DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? MINUTE) WHERE email = ?',
    [hash, minutes, email]
  );
};
