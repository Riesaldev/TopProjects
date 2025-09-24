import { getPool } from '@/db/getPool.ts';
import type { CharacterRow } from './types.ts';

export const deleteCharacterModel = async (id: CharacterRow['id']) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query('DELETE FROM characters WHERE id = ?', [id]);
};
