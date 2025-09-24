import { getPool } from '@/db/getPool.ts';
import type { ResourceRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const listResourcesModel = async (
  campaign_id?: ResourceRow['campaign_id'],
  uploaded_by?: number
): Promise<ResourceRow[]> => {
  const pool = await getPool();
  if (!pool) return [];
  const where: string[] = [];
  const params: number[] = [];
  if (campaign_id) { where.push('campaign_id = ?'); params.push(campaign_id); }
  // Incluir públicos (uploaded_by IS NULL) o del propio usuario
  if (typeof uploaded_by === 'number') { where.push('(uploaded_by IS NULL OR uploaded_by = ?)'); params.push(uploaded_by); }
  let query = 'SELECT * FROM resources';
  if (where.length) query += ' WHERE ' + where.join(' AND ');
  query += ' ORDER BY id DESC';
  const [rows] = await pool.query<RowDataPacket[]>(query, params);
  return (rows as unknown) as ResourceRow[];
};
