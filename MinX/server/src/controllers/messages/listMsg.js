import listMsgModel from '../../models/messages/listMsgModel.js';

/**
 * Listado de mensajes.
 * Qué: devuelve colección ordenada descendente por fecha.
 * Cómo: pasa opcionalmente req.user?.id para marcar likedByMe en la query.
 * Por qué: feed principal consumido por la UI.
 */
const listMsg = async ( req, res, next ) => {
  try
  {
    const messages = await listMsgModel( req.user?.id );
    res.send( {
      status: 'ok',
      data: messages,
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default listMsg;
