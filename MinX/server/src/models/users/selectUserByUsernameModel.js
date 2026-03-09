import getPool from '../../db/getPool.js';

/**
 * Selecciona usuario por username.
 * Qué: usado principalmente en login cuando identificador no contiene '@'.
 * Cómo: devuelve primer match (username es UNIQUE).
 * Por qué: soporte autenticación flexible.
 */
const selectUserByUsernameModel = async ( username ) => {
  const pool = await getPool();
  const [ users ] = await pool.query(
    'SELECT id, email, password, username FROM users WHERE username = ?',
    [ username ]
  );
  return users[ 0 ];
};

export default selectUserByUsernameModel;
