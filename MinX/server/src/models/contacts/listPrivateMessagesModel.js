import getPool from '../../db/getPool.js';

const listPrivateMessagesModel = async ( userIdA, userIdB ) => {
  const pool = await getPool();
  const [ rows ] = await pool.query(
    `SELECT id, senderId, receiverId, content, createdAt
     FROM private_messages
     WHERE (senderId = ? AND receiverId = ?)
        OR (senderId = ? AND receiverId = ?)
     ORDER BY createdAt ASC
     LIMIT 200`,
    [ userIdA, userIdB, userIdB, userIdA ]
  );

  return rows;
};

export default listPrivateMessagesModel;

