import getPool from '../../db/getPool.js';

/**
 * Busca usuarios por username o email (parcial).
 * Qué: soporte a agenda/contactos para sugerir coincidencias.
 * Cómo: usa LIKE con comodines y limita resultados para evitar responses enormes.
 * Por qué: permite al cliente encontrar a quien invitar sin exponer contraseñas u otros datos sensibles.
 */
const searchUsersModel = async ( query, excludeUserId ) => {
  const pool = await getPool();
  const likeQuery = `%${ query }%`;

  const [ users ] = await pool.query(
    `SELECT id, username, email, avatar
     FROM users
     WHERE (username LIKE ? OR email LIKE ?)
       AND id <> ?
     ORDER BY username ASC
     LIMIT 20`,
    [ likeQuery, likeQuery, excludeUserId ]
  );

  return users;
};

export default searchUsersModel;

