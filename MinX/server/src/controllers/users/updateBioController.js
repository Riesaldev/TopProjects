import updateBioModel from '../../models/users/updateBioModel.js';
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import generateError from '../../utils/generateErrorUtil.js';

/**
 * Actualiza la biografía del usuario autenticado.
 * Qué: persiste texto corto (máx 255 chars) que personaliza el perfil.
 * Cómo: valida tipo, elimina espacios extra y controla límites de longitud.
 * Por qué: previene entradas vacías o demasiado largas que afectarían UI.
 */
const updateBioController = async ( req, res, next ) => {
  try
  {
    const { bio } = req.body;

    if ( typeof bio !== 'string' )
    {
      generateError( 'Bio inválida', 400 );
    }

    const trimmed = bio.trim();
    if ( trimmed.length === 0 )
    {
      generateError( 'La bio no puede estar vacía', 400 );
    }
    if ( trimmed.length > 255 )
    {
      generateError( 'La bio no puede superar 255 caracteres', 400 );
    }

    const result = await updateBioModel( req.user.id, trimmed );
    if ( !result || result.affectedRows === 0 )
    {
      generateError( 'No se pudo actualizar la bio', 500 );
    }

    // Re-consulta para devolver estado actual consistente.
    const user = await selectUserByIdModel( req.user.id );

    res.send( {
      status: 'ok',
      message: 'Bio actualizada',
      data: { bio: user.bio }
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default updateBioController;
