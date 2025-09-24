import { getPool } from '@/db/getPool.ts';
import type { ResourceRow } from './types.ts';
import type { ResultSetHeader } from 'mysql2/promise';

export const createResourceModel = async (data: Omit<ResourceRow, 'id'>): Promise<number> => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO resources (name, type, url, campaign_id, uploaded_by) VALUES (?, ?, ?, ?, ?)',
    [data.name, data.type, data.url, data.campaign_id, data.uploaded_by]
  );
  return result.insertId;
};
