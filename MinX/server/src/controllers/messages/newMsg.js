
import insertMessage from '../../models/messages/insertMessageModel.js';
import generateError from '../../utils/generateErrorUtil.js';
import saveImage from '../../utils/saveImgUtil.js';

/**
 * Creación de un nuevo mensaje.
 * Qué: inserta un mensaje con texto y opcionalmente una imagen reducida.
 * Cómo: valida presencia de texto, procesa imagen (si llega) y delega inserción a modelo.
 * Por qué: endpoint fundamental para publicar contenido en el feed.
 */
const newMsg = async ( req, res, next ) => {
  try
  {
    const { text } = req.body;

    if ( !text )
    {
      generateError( 'Text is required', 400 );
    }

    const imagen = req.files?.image;
    let imgName = null;

    if ( imagen )
    {
      // Redimensionamos a 600px para balancear calidad/peso.
      imgName = await saveImage( imagen, 600 );
    }

    const idMsg = await insertMessage( req.user.id, text, imgName );

    res.status( 201 ).send( {
      status: 'ok',
      message: 'Message created',
      data: {
        id: idMsg,
      },
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default newMsg;
