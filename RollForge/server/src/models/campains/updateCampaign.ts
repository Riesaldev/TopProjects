import { getPool } from '@/db/getPool.ts';
import type { CampaignRow } from './types.ts';


export const updateCampaignModel = async (id: CampaignRow['id'], data: CampaignRow) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool!.query('UPDATE campaigns SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?', [data.name ?? null, data.description ?? null, id]);
};
