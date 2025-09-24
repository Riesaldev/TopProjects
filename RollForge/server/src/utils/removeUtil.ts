//Util para eliminar un archivo o imagen
import fs from 'fs/promises';
import path from 'path';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { UPLOADS_DIR_PATH } from '@/config/paths.ts';
// Tipos locales para estas utilidades
type RemoveImageFn = (imageName: string) => Promise<void>;
type RemoveFileFn = (filePath: string) => Promise<void>;

export const removeImage: RemoveImageFn = async (imageName) => {
  try {
    // 1) Calculamos la ruta absoluta del archivo a eliminar en la carpeta unificada de uploads
    const fullPath = path.join(UPLOADS_DIR_PATH, imageName);
    await fs.access(fullPath);
    await fs.unlink(fullPath);
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    if (e.code === 'ENOENT') {
      generateErrorUtil(404, 'Imagen no encontrada');
    } else {
      generateErrorUtil(500, 'Error al eliminar la imagen');
    }
  }
};

export const removeFile: RemoveFileFn = async (filePath) => {
  try {
    // 1) Igual que arriba, trabajamos siempre dentro de UPLOADS_DIR_PATH
    const fullPath = path.join(UPLOADS_DIR_PATH, filePath);
    await fs.access(fullPath);
    await fs.unlink(fullPath);
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    if (e.code === 'ENOENT') {
      generateErrorUtil(404, 'Archivo no encontrado');
    } else {
      generateErrorUtil(500, 'Error al eliminar el archivo');
    }
  }
};