import { getPool } from '@/db/getPool.ts';
import type { CharacterRow } from './types.ts';

export const updateCharacterModel = async (id: CharacterRow['id'], data: Partial<Pick<CharacterRow, 'name' | 'image_url'>>) => {
  const pool = await getPool();
  if (!pool) throw new Error('DB no disponible');
  await pool.query(
    'UPDATE characters SET name = COALESCE(?, name), image_url = COALESCE(?, image_url) WHERE id = ?',
    [data.name ?? null, data.image_url ?? null, id]
  );
};
