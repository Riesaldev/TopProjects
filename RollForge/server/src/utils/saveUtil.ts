//Util que salva un archivo o imagen
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { UPLOADS_DIR_PATH } from '@/config/paths.ts';
// Tipos locales para estas utilidades
type ImageInput =
  | { data: Buffer; isAvatar?: boolean; innerWidth?: number }
  | { file: { data: Buffer }; isAvatar?: boolean; innerWidth?: number };
type SaveImageFn = (image: ImageInput) => Promise<string>;
type SaveFileInput = { data: Buffer; originalName: string };
type SaveFileFn = (file: SaveFileInput) => Promise<string>;

// image: { data: Buffer, isAvatar?: boolean, innerWidth?: number }
export const saveImage: SaveImageFn = async (image) => {
  try {
    // 1) Aseguramos que la carpeta de subidas exista
    const uploadPath = UPLOADS_DIR_PATH;
    await fs.mkdir(uploadPath, { recursive: true });

    // 2) Generamos un nombre de archivo único
    const imageName = `${crypto.randomUUID()}.jpg`;
    const imagePath = path.join(uploadPath, imageName);

    // 3) Obtenemos el buffer y validamos que pueda ser interpretado como imagen
    const buffer = 'data' in image ? image.data : image.file.data;
    // Validación ligera de tipo: intentamos leer metadatos; si falla, no es imagen válida
    const sharpImage = sharp(buffer);
    try { await sharpImage.metadata(); }
    catch { return generateErrorUtil(400, 'Archivo de imagen inválido'); }

    if (image.isAvatar) {
      await sharpImage
        .resize(200, 200)
        .jpeg({ quality: 80 })
        .toFile(imagePath);
    } else if (image.innerWidth) {
      await sharpImage
        .resize(image.innerWidth, null)
        .jpeg({ quality: 80 })
        .toFile(imagePath);
    } else {
      await sharpImage.jpeg({ quality: 80 }).toFile(imagePath);
    }
    return imageName;
  } catch (error) {
    console.error(error);
    generateErrorUtil(500, 'Error al guardar la imagen');
    return '';
  }
};

// file: { data: Buffer, originalName: string }
export const saveFile: SaveFileFn = async (file) => {
  try {
    // 1) Aseguramos carpeta
    const uploadPath = UPLOADS_DIR_PATH;
    await fs.mkdir(uploadPath, { recursive: true });
    const fileName = `${crypto.randomUUID()}_${file.originalName}`;
    const filePath = path.join(uploadPath, fileName);
    await fs.writeFile(filePath, file.data);
    return fileName;
  } catch (error) {
    console.error(error);
    generateErrorUtil(500, 'Error al guardar el archivo');
    return '';
  }
};