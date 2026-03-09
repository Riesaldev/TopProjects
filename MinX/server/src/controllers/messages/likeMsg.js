
import insertLike from '../../models/messages/insertLikeModel.js';
import generateError from '../../utils/generateErrorUtil.js';

/**
 * Da like a un mensaje.
 * Qué: inserta registro en tabla likes evitando duplicados.
 * Cómo: valida msgId y delega lógica de unicidad al modelo (que lanza error 409 si ya existe).
 * Por qué: interacción social clave que incrementa visibilidad del contenido.
 */
const likeMsg = async ( req, res, next ) => {
  try
  {
    const { msgId } = req.params;

    if ( !msgId )
    {
      generateError( 'Message ID is required', 400 );
    }

    const numLike = await insertLike( req.user.id, msgId );

    res.send( {
      status: 'ok',
      message: 'Message liked',
      data: {
        numLike
      },
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default likeMsg;