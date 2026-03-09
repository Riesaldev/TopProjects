import getPool from '../../db/getPool.js';

const updateContactRequestStatusModel = async ( requestId, status ) => {
  const pool = await getPool();
  await pool.query(
    `UPDATE contact_requests SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [ status, requestId ]
  );
};

export default updateContactRequestStatusModel;

