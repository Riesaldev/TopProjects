
import getPool from '../../db/getPool.js';

import generateError from '../../utils/generateErrorUtil.js';

/**
 * Inserta un like si no existe previamente.
 * Qué: enforce UNIQUE(userId, messageId) a nivel lógico antes de intentar insertar.
 * Cómo: consulta existencia y luego inserta; retorna número total de likes actualizado.
 * Por qué: feedback inmediato para UI y prevención de duplicados.
 */
const insertLike = async ( userId, messageId ) => {
  const pool = await getPool();

  const [ existingLike ] = await pool.query(
    'SELECT id FROM likes WHERE userId = ? AND messageId = ?',
    [ userId, messageId ]
  );

  if ( existingLike.length > 0 )
  {
    generateError( 'You have already liked this message', 409 );
  }

  await pool.query(
    'INSERT INTO likes (userId, messageId) VALUES (?, ?)',
    [ userId, messageId ]
  );

  const [ likes ] = await pool.query(
    'SELECT COUNT(id) as totalLikes FROM likes WHERE messageId = ? GROUP BY messageId',
    [ messageId ]
  );

  return likes[ 0 ]?.totalLikes;
};

export default insertLike;