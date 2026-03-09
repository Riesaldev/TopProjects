import deleteMsg from '../../models/messages/deleteMsgModel.js';

/**
 * Borrado de mensaje.
 * Qué: elimina un mensaje y sus likes asociados.
 * Cómo: modelo valida propiedad (solo autor puede eliminar) y hace cleanup de likes.
 * Por qué: mantener integridad referencial y permitir gestión del propio contenido.
 */
const deleteMessage = async ( req, res, next ) => {
  try
  {
    const { msgId } = req.params;

    await deleteMsg( msgId, req.user.id );
    res.send( {
      status: 'ok',
      message: 'Message deleted',
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default deleteMessage;
