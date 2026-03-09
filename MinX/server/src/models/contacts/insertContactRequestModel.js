import getPool from '../../db/getPool.js';

const insertContactRequestModel = async ( requesterId, requestedId ) => {
  const pool = await getPool();
  const [ result ] = await pool.query(
    `INSERT INTO contact_requests (requesterId, requestedId) VALUES (?, ?)`,
    [ requesterId, requestedId ]
  );

  return {
    id: result.insertId,
    requesterId,
    requestedId,
    status: 'pending'
  };
};

export default insertContactRequestModel;

