import getPool from '../../db/getPool.js';

/**
 * Recupera la solicitud (si existe) entre dos usuarios.
 * Retorna la primera coincidencia independientemente de la dirección.
 */
const getContactRequestBetweenUsersModel = async ( userIdA, userIdB ) => {
  const pool = await getPool();
  const [ requests ] = await pool.query(
    `SELECT *
     FROM contact_requests
     WHERE (requesterId = ? AND requestedId = ?)
        OR (requesterId = ? AND requestedId = ?)
     LIMIT 1`,
    [ userIdA, userIdB, userIdB, userIdA ]
  );

  return requests[ 0 ];
};

export default getContactRequestBetweenUsersModel;

