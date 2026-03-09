import getPool from '../../db/getPool.js';
import generateError from '../../utils/generateErrorUtil.js';

/**
 * Elimina un mensaje (y sus likes asociados) si pertenece al usuario.
 * Qué: asegura propiedad antes de borrar para evitar borrado arbitrario.
 * Cómo: SELECT previo -> validación -> DELETE likes -> DELETE message.
 * Por qué: mantener integridad relacional y reglas de negocio.
 */
const deleteMsg = async ( messageId, userId ) => {
  const pool = await getPool();
  const [ msg ] = await pool.query(
    'SELECT id, userId FROM messages WHERE id = ?',
    [ messageId ]
  );

  if ( !msg.length )
  {
    throw generateError( 'Message not found', 404 );
  }

  if ( msg[ 0 ].userId !== userId )
  {
    throw generateError( 'Unauthorized', 403 );
  }

  // Eliminamos likes dependientes primero para evitar referencias colgantes.
  await pool.query(
    'DELETE FROM likes WHERE messageId = ?',
    [ messageId ]
  );

  await pool.query(
    'DELETE FROM messages WHERE id = ?',
    [ messageId ]
  );
};

export default deleteMsg;
