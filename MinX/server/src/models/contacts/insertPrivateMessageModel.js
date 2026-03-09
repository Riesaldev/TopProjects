import getPool from '../../db/getPool.js';

const insertPrivateMessageModel = async ( senderId, receiverId, content ) => {
  const pool = await getPool();
  const [ result ] = await pool.query(
    `INSERT INTO private_messages (senderId, receiverId, content) VALUES (?, ?, ?)`,
    [ senderId, receiverId, content ]
  );

  return {
    id: result.insertId,
    senderId,
    receiverId,
    content,
  };
};

export default insertPrivateMessageModel;

