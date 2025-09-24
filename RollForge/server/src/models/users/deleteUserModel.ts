import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';

export const deleteUserModel = async (id: UserRow['id']) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};
