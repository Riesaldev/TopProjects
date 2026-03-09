import getPool from '../../db/getPool.js';

/**
 * Selecciona un usuario por email incluyendo password hash (para login) y username.
 * Qué: recupera primera coincidencia.
 * Cómo: query parametrizada para evitar SQL injection.
 * Por qué: soporte a login y validaciones.
 */
const selectUserByEmailModel = async ( email ) => {
  const pool = await getPool();

  const [ users ] = await pool.query(
    'SELECT id, email, password, username FROM users WHERE email = ?',
    [ email ]
  );

  return users[ 0 ];
};

export default selectUserByEmailModel;