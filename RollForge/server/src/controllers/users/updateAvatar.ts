import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { Request, Response, NextFunction } from 'express';
import type { UploadedFile } from 'express-fileupload';
import { saveImage } from '@/utils/saveUtil.ts';
import { removeImage } from '@/utils/removeUtil.ts';
import { getById, updateAvatarModel } from '@/models/users/index.ts';

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getById(Number(id));
    if (!user) return generateErrorUtil(404, 'Usuario no encontrado');

    const files: Record<string, UploadedFile | UploadedFile[]> | undefined = (req as Request & { files?: Record<string, UploadedFile | UploadedFile[]> }).files;
    const file = files?.avatar as UploadedFile | UploadedFile[] | undefined;
    const one = Array.isArray(file) ? file[0] : file;
    if (!one?.data) return generateErrorUtil(400, 'Falta archivo avatar');

    const newAvatar = await saveImage({ data: one!.data, isAvatar: true });

    await updateAvatarModel(Number(id), newAvatar);

    const oldAvatar = user!.avatar ?? null;

    if (oldAvatar) {
      try {
        await removeImage(oldAvatar);
      } catch {
        console.error('Error al eliminar avatar antiguo:', oldAvatar);
        generateErrorUtil(500, 'Error al eliminar avatar antiguo');
      }
    }
    res.json({ status: 'ok', data: { avatar: newAvatar } });

  } catch (err) { next(err as Error); }
};
