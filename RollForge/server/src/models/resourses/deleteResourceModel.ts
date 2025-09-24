import { getPool } from '@/db/getPool.ts';
import type { ResourceRow } from './types.ts';

export const deleteResourceModel = async (id: ResourceRow['id']) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('DELETE FROM resources WHERE id = ?', [id]);
};
