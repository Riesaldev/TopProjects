
import selectMessageById from '../../models/messages/selectMessageByIdModel.js';

/**
 * Detalle de un mensaje.
 * Qué: obtiene un mensaje específico incluyendo info de likes agregada.
 * Cómo: consulta con joins y agrega likedByMe / totalLikes.
 * Por qué: para mostrar vista expandida o modal con todos los datos.
 */
const detailMsg = async ( req, res, next ) => {
  try
  {
    const { msgId } = req.params;

    const message = await selectMessageById( msgId, req.user?.id );

    res.send( {
      status: 'ok',
      message: 'Message details',
      data: message[ 0 ],
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default detailMsg;