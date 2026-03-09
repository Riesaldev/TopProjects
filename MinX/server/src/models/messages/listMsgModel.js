
import getPool from '../../db/getPool.js';

/**
 * Lista mensajes con agregados de likes.
 * Qué: devuelve cada mensaje con total de likes y flag likedByMe (si userId proporcionado y existe su like).
 * Cómo: LEFT JOIN likes y BIT_OR(likes.userId = ?) para calcular likedByMe como 0/1.
 * Por qué: optimiza al evitar múltiples queries por mensaje en el feed.
 */
const listMessages = async ( userId ) => {
  const pool = await getPool();
  const [ messages ] = await pool.query(
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
    GROUP BY msg.id
    ORDER BY msg.createdAt DESC`,
    [ userId ]
  );

  return messages;
};

export default listMessages;