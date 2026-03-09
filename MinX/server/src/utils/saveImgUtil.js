import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

import generateError from './generateErrorUtil.js';

/**
 * Guarda una imagen redimensionada en el directorio de uploads.
 * Qué: asegura existencia del directorio, redimensiona y genera nombre único.
 * Cómo: usa sharp para manipulación y crypto.randomUUID para nombre.
 * Por qué: estandariza proceso de almacenamiento y evita colisiones de nombres.
 */
const saveImgUtil = async ( img, size ) => {
  try
  {
    const uploadPath = path.join(
      process.cwd(),
      process.env.UPLOADS_DIR
    );

    // Creamos carpeta si no existe.
    try
    {
      await fs.access( uploadPath );
    } catch
    {
      await fs.mkdir( uploadPath, { recursive: true } );
    }

    const sharpImg = sharp( img.data );
    sharpImg.resize( size );

    const imgName = `${ crypto.randomUUID() }.jpg`;
    const imgPath = path.join( uploadPath, imgName );

    await sharpImg.toFile( imgPath );

    return imgName;
  } catch ( err )
  {
    console.error( err );
    generateError( 'Error al guardar la imagen', 500 );
  }
};

export default saveImgUtil;
