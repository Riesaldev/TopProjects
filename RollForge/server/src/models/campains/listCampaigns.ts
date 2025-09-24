import { getPool } from '@/db/getPool.ts';


export const listCampaignsModel = async () => {
  const pool = await getPool();
  if (!pool) return [];
  const [rows] = await pool.query('SELECT * FROM campaigns ORDER BY id DESC');
  return rows;
}; 