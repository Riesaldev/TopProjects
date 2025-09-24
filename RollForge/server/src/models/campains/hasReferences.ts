import { getPool } from '@/db/getPool.ts';
import type { CampaignRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const campaignHasReferences = async (id: CampaignRow['id']): Promise<boolean> => {
  const pool = await getPool();
  if (!pool) return true; // conservador

  const [chars] = await pool.query<RowDataPacket[]>('SELECT id FROM characters WHERE campaign_id = ? LIMIT 1', [id]);
  const [res] = await pool.query<RowDataPacket[]>('SELECT id FROM resources WHERE campaign_id = ? LIMIT 1', [id]);
  const [toks] = await pool.query<RowDataPacket[]>('SELECT id FROM tokens WHERE campaign_id = ? LIMIT 1', [id]);
  return Boolean(chars.length || res.length || toks.length);
};