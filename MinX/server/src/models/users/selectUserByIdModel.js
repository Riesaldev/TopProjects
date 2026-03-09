import getPool from '../../db/getPool.js';
import generateError from '../../utils/generateErrorUtil.js';

/**
 * Obtiene un usuario por ID con campos públicos/privados básicos.
 * Qué: devuelve email (para perfil privado), username, avatar y bio.
 * Cómo: si no encuentra registros lanza 404 vía generateError.
 * Por qué: necesario para endpoints de perfil y validaciones de propiedad.
 */
const selectUserByIdModel = async ( userId ) => {
  const pool = await getPool();

  const [ users ] = await pool.query(
    'SELECT id, email, username, avatar, bio FROM users WHERE id = ?',
    [ userId ]
  );

  if ( users.length < 1 )
  {
    generateError( 'Usuario no encontrado', 404 );
  }

  return users[ 0 ];
};

export default selectUserByIdModel;