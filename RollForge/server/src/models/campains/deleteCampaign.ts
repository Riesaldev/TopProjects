import { getPool } from '@/db/getPool.ts';
import type { CampaignRow } from './types.ts';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';

export const deleteCampaignModel = async (id: CampaignRow['id']) => {
  const pool = await getPool();
  if (!pool) {
    generateErrorUtil(500, 'Error de conexión a la base de datos');
  }
  await pool!.query('DELETE FROM campaigns WHERE id = ?', [id]);
};
