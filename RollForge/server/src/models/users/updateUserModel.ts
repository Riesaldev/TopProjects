import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';

export const updateUserModel = async (id: UserRow['id'], data: Partial<Pick<UserRow, 'username' | 'email'>>) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query(
    'UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email) WHERE id = ?',
    [data.username ?? null, data.email ?? null, id]
  );
};
