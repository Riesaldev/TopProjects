import { getPool } from '@/db/getPool.ts';
import type { ResourceRow } from './types.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const getResourceById = async (id: ResourceRow['id']): Promise<ResourceRow | null> => {
  const pool = await getPool();
  if (!pool) return null;
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM resources WHERE id = ?', [id]);
  return (rows[0] as ResourceRow) ?? null;
};
