import listContactsModel from '../../models/contacts/listContactsModel.js';
import { isUserOnline } from '../../ws/presenceStore.js';

const listContactsController = async ( req, res, next ) => {
  try
  {
    const userId = req.user.id;
    const contacts = await listContactsModel( userId );

    const grouped = contacts.reduce( ( acc, contact ) => {
      const entry = {
        ...contact,
        isOnline: isUserOnline( contact.userId ),
      };
      acc[ contact.status ] = acc[ contact.status ] || [];
      acc[ contact.status ].push( entry );
      return acc;
    }, { pending: [], accepted: [], rejected: [] } );

    res.send( {
      status: 'ok',
      data: {
        accepted: grouped.accepted,
        pending: grouped.pending.filter( ( item ) => item.direction === 'incoming' ),
        sent: grouped.pending.filter( ( item ) => item.direction === 'outgoing' ),
      }
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default listContactsController;

