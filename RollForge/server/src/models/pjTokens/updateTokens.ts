import { getPool } from '@/db/getPool.ts';
import type { PJTokenRow, UpdateTokenModelInput } from './types.ts';

export const updateTokenModel = async (id: PJTokenRow['id'], data: UpdateTokenModelInput) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query(
    'UPDATE tokens SET name = COALESCE(?, name), image_url = COALESCE(?, image_url), character_id = COALESCE(?, character_id), user_id = COALESCE(?, user_id), campaign_id = COALESCE(?, campaign_id) WHERE id = ?',
    [
      data.name ?? null,
      data.image_url ?? null,
      data.character_id ?? null,
      data.user_id ?? null,
      data.campaign_id ?? null,
      id,
    ]
  );
};