import getPool from '../../db/getPool.js';

/**
 * Selecciona un mensaje por ID con agregados de likes.
 * Qué: incluye totalLikes y likedByMe (booleano 0/1) si se pasa userId.
 * Cómo: usa SUM(CASE WHEN ...) para calcular likedByMe evitando BIT_OR ambiguo.
 * Por qué: necesario para vista de detalle con estado de interacción.
 */
const selectMessageById = async ( msgId, userId ) => {
  const pool = await getPool();

  const [ message ] = await pool.query(
    `SELECT 
      msg.id,
      usr.username,
      msg.text,
      msg.image,
      msg.createdAt,
      IFNULL(SUM(CASE WHEN like.userId = ? THEN 1 ELSE 0 END) > 0, 0) AS likedByMe,
      COUNT(like.id) AS totalLikes
    FROM messages msg
    LEFT JOIN users usr ON msg.userId = usr.id
    LEFT JOIN likes like ON like.messageId = msg.id
    WHERE msg.id = ?
    GROUP BY msg.id`,
    [ userId, msgId ]
  );

  return message;
};

export default selectMessageById;