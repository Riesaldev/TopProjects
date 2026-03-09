import getPool from '../../db/getPool.js';

/**
 * Actualiza el nombre de archivo del avatar para un usuario dado.
 * Qué: reemplaza valor anterior y refresca modifiedAt.
 * Cómo: simple UPDATE parametrizado.
 * Por qué: persistir referencia a la imagen procesada en almacenamiento.
 */
const updateAvatarModel = async ( userId, avatarName ) => {
  const pool = await getPool();

  const [ result ] = await pool.query(
    'UPDATE users SET avatar = ?, modifiedAt = NOW() WHERE id = ?', [
    avatarName,
    userId
  ]
  );
  return result; // permite comprobar affectedRows para validar éxito.
};

export default updateAvatarModel;