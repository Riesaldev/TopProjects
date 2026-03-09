import generateError from '../../utils/generateErrorUtil.js';
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import getContactRequestBetweenUsersModel from '../../models/contacts/getContactRequestBetweenUsersModel.js';
import insertContactRequestModel from '../../models/contacts/insertContactRequestModel.js';

const requestContactController = async ( req, res, next ) => {
  try
  {
    const requesterId = req.user.id;
    const { userId } = req.body;

    if ( !userId )
    {
      generateError( 'Debes indicar el usuario que quieres añadir', 400 );
    }

    const requestedId = Number( userId );
    if ( Number.isNaN( requestedId ) )
    {
      generateError( 'Identificador de usuario no válido', 400 );
    }

    if ( requestedId === requesterId )
    {
      generateError( 'No puedes agregarte a ti mismo', 400 );
    }

    await selectUserByIdModel( requestedId );

    const existing = await getContactRequestBetweenUsersModel( requesterId, requestedId );

    if ( existing )
    {
      if ( existing.status === 'accepted' )
      {
        generateError( 'Ya tenéis una conexión activa', 409 );
      }

      if ( existing.status === 'pending' )
      {
        if ( existing.requesterId === requesterId )
        {
          generateError( 'Solicitud ya enviada. Espera a que la otra persona acepte.', 409 );
        }
        else
        {
          generateError( 'Tienes una invitación pendiente de esta persona. Revísala en tus solicitudes.', 409 );
        }
      }
    }

    const request = await insertContactRequestModel( requesterId, requestedId );

    res.status( 201 ).send( {
      status: 'ok',
      data: request,
      message: 'Solicitud enviada. Espera a que el usuario la acepte.',
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default requestContactController;

