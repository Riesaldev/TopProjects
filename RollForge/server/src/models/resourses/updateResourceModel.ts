import { getPool } from '@/db/getPool.ts';
import type { ResourceRow } from './types.ts';

export const updateResourceModel = async (id: ResourceRow['id'], data: Partial<Pick<ResourceRow, 'name' | 'type' | 'url'>>) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query(
    'UPDATE resources SET name = COALESCE(?, name), type = COALESCE(?, type), url = COALESCE(?, url) WHERE id = ?',
    [data.name ?? null, data.type ?? null, data.url ?? null, id]
  );
};
