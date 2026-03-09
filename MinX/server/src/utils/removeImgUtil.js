
import fs from 'fs/promises';
import path from 'path';

import generateError from './generateErrorUtil.js';

/**
 * Elimina una imagen del sistema de archivos si existe.
 * Qué: construye path absoluto y borra archivo.
 * Cómo: verifica existencia con fs.access para evitar errores si ya no existe.
 * Por qué: liberar espacio y evitar basurización del directorio de uploads.
 */
const removeImgUtil = async ( imgName ) => {
  try
  {
    const imgPath = path.join(
      process.cwd(),
      process.env.UPLOADS_DIR,
      imgName
    );

    try
    {
      await fs.access( imgPath ); // Si falla, no hacemos nada (archivo ya inexistente).
    } catch
    {
      return;
    }

    await fs.unlink( imgPath );
  } catch ( err )
  {
    console.error( err );
    generateError( 'Error al eliminar la imagen', 500 );
  }
};

export default removeImgUtil;