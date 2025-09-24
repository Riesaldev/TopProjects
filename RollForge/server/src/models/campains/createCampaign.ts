import { getPool } from '@/db/getPool.ts';
import type { CampaignRow } from './types.ts';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import type { ResultSetHeader } from 'mysql2/promise';

export const createCampaignModel = async (data: Omit<CampaignRow, 'id'>) => {
  const pool = await getPool();
  if (!pool) {
    generateErrorUtil(500, 'Error de conexión a la base de datos');
  }
  const [result] = await pool!.query<ResultSetHeader>(
    'INSERT INTO campaigns (name, description, gm_id) VALUES (?, ?, ?)',
    [data.name, data.description ?? null, data.gm_id]
  );

  return result.insertId;
};