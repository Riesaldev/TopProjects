import generateError from '../../utils/generateErrorUtil.js';
import getContactRequestBetweenUsersModel from '../../models/contacts/getContactRequestBetweenUsersModel.js';
import updateContactRequestStatusModel from '../../models/contacts/updateContactRequestStatusModel.js';

const acceptContactController = async ( req, res, next ) => {
  try
  {
    const currentUserId = req.user.id;
    const { userId } = req.params;
    const requesterId = Number( userId );

    if ( Number.isNaN( requesterId ) )
    {
      generateError( 'Identificador de solicitud inválido', 400 );
    }

    const request = await getContactRequestBetweenUsersModel( requesterId, currentUserId );

    if ( !request || request.requestedId !== currentUserId )
    {
      generateError( 'No tienes solicitudes pendientes de este usuario', 404 );
    }

    if ( request.status === 'accepted' )
    {
      res.send( {
        status: 'ok',
        message: 'Ya estabais conectados',
      } );
      return;
    }

    if ( request.status !== 'pending' )
    {
      generateError( 'La solicitud no está pendiente', 400 );
    }

    await updateContactRequestStatusModel( request.id, 'accepted' );

    res.send( {
      status: 'ok',
      message: 'Contacto aceptado',
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default acceptContactController;

