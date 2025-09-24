import { getPool } from '@/db/getPool.ts';
import type { UserRow } from './types.ts';

export const updateAvatarModel = async (id: UserRow['id'], avatar: UserRow['avatar']) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('UPDATE users SET avatar = ? WHERE id = ?', [avatar, id]);
};
