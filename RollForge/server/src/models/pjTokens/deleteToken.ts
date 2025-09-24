import { getPool } from '@/db/getPool.ts';
import type { PJTokenRow } from './types.ts';

export const deleteTokenModel = async (id: PJTokenRow['id']) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('DELETE FROM tokens WHERE id = ?', [id]);
};