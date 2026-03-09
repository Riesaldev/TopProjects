import selectMessageById from '../models/messages/selectMessageByIdModel.js';
import generateError from '../utils/generateErrorUtil.js';

/**
 * Verifica existencia de un mensaje antes de ejecutar la ruta destino.
 * Qué: comprueba que el msgId está presente y que el mensaje existe en DB.
 * Cómo: consulta selectMessageById; si no retorna filas lanza 404.
 * Por qué: evita lógica duplicada en controladores (DRY) y asegura error consistente.
 */
const messageExist = async ( req, res, next ) => {
  try
  {
    const { msgId } = req.params;
    if ( !msgId )
    {
      generateError( 'No se proporcionó un ID de mensaje', 400 );
    }
    const message = await selectMessageById( msgId, req.user?.id );
    if ( !message.length )
    {
      generateError( 'El mensaje no existe', 404 );
    }
    next();
  } catch ( err )
  {
    next( err );
  }
};

export default messageExist;
