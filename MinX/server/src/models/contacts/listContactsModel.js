import getPool from '../../db/getPool.js';

/**
 * Lista contactos y solicitudes asociadas a un usuario.
 * Devuelve registros con datos del otro usuario para mostrar agenda básica.
 */
const listContactsModel = async ( userId ) => {
  const pool = await getPool();
  const [ rows ] = await pool.query(
    `SELECT
        cr.id,
        cr.status,
        cr.requesterId,
        cr.requestedId,
        cr.createdAt,
        cr.updatedAt,
        CASE WHEN cr.requesterId = ? THEN 'outgoing' ELSE 'incoming' END AS direction,
        u.id AS userId,
        u.username,
        u.email,
        u.avatar
     FROM contact_requests cr
     JOIN users u ON u.id = CASE WHEN cr.requesterId = ? THEN cr.requestedId ELSE cr.requesterId END
     WHERE cr.requesterId = ? OR cr.requestedId = ?
     ORDER BY cr.updatedAt DESC`,
    [ userId, userId, userId, userId ]
  );

  return rows;
};

export default listContactsModel;

