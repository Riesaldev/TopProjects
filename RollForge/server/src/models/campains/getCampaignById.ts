import { getPool } from '@/db/getPool.ts';
import type { CampaignRow } from './types.ts';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import type { RowDataPacket } from 'mysql2/promise';

export const getCampaignById = async (id: CampaignRow['id']): Promise<CampaignRow | null> => {
  const pool = await getPool();
  if (!pool) {
    generateErrorUtil(500, 'Error de conexión a la base de datos');
  }

  const [rows] = await pool!.query<RowDataPacket[]>('SELECT * FROM campaigns WHERE id = ?', [id]);
  return (rows[0] as CampaignRow) ?? null;
};