import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';

export const updatePassword = async (id: UserRow['id'], passwordHash: string) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [passwordHash, id]);
};
