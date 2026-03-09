import getPool from '../../db/getPool.js';

/**
 * Actualiza la bio de un usuario.
 * Qué: guarda texto corto y refresca modifiedAt.
 * Cómo: update parametrizado para evitar inyecciones.
 * Por qué: soporte a personalización de perfil.
 */
const updateBioModel = async ( userId, bio ) => {
  const pool = await getPool();
  const [ result ] = await pool.query(
    'UPDATE users SET bio = ?, modifiedAt = NOW() WHERE id = ?',
    [ bio, userId ]
  );
  return result; // permite comprobar affectedRows
};

export default updateBioModel;
