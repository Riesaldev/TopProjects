import deleteLike from '../../models/messages/deleteLikeModel.js';

/**
 * Elimina un like del usuario sobre un mensaje.
 * Qué: borra la relación userId-messageId en la tabla likes.
 * Cómo: operación idempotente; si no existía like simplemente devuelve recuento actualizado.
 * Por qué: permitir revertir acciones y ajustar métricas de interacción.
 */
const deleteLikeMessage = async ( req, res, next ) => {
  try
  {
    const { msgId } = req.params;

    let numLikes = await deleteLike( req.user.id, msgId );
    numLikes = numLikes ? numLikes : 0;

    res.send( {
      status: 'ok',
      message: 'Like removed',
      data: {
        msgId,
        userId: req.user.id,
        numLikes,
      },
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default deleteLikeMessage;
