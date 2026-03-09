import getPool from '../../db/getPool.js';

/**
 * Elimina un like concreto y devuelve nuevo total.
 * Qué: borra la fila (si existe) que une userId y messageId.
 * Cómo: DELETE seguido de recuento.
 * Por qué: mantener contador actualizado para feedback en UI.
 */
const deleteLike = async ( userId, messageId ) => {
  const pool = await getPool();
  await pool.query(
    'DELETE FROM likes WHERE userId = ? AND messageId = ?',
    [ userId, messageId ]
  );

  const [ likes ] = await pool.query(
    'SELECT COUNT(id) AS totalLikes FROM likes WHERE messageId = ? GROUP BY messageId',
    [ messageId ]
  );

  return likes[ 0 ]?.totalLikes;
};

export default deleteLike;
