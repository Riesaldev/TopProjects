import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { saveImage } from '@/utils/saveUtil.ts';
import { createUser, findByEmail, findByUsername } from '@/models/users/index.ts';

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Paso 1: inicializamos variable para el nombre del archivo avatar (si se envía)
    let avatar: string | null = null;
    // Paso 2: recogemos datos del body (ya validados por zodValidator)
    const { username, email, password } = req.body as { username: string; email: string; password: string };

    // Paso 3: comprobamos si el email ya existe
    const existingByEmail = await findByEmail(email);
    if (existingByEmail) generateErrorUtil(409, 'Email ya en uso');
    // Paso 4: comprobamos si el username ya existe
    const existingByUsername = await findByUsername(username);
    if (existingByUsername) generateErrorUtil(409, 'Username ya en uso');

    // Paso 5: generamos el hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);


    // Paso 6: si se adjunta un archivo 'avatar' en form-data, lo guardamos usando saveImage
    const files: Record<string, UploadedFile | UploadedFile[]> | undefined = (req as Request & { files?: Record<string, UploadedFile | UploadedFile[]> }).files;
    const file = files?.avatar as UploadedFile | UploadedFile[] | undefined;
    const one = Array.isArray(file) ? file[0] : file;

    if (one?.data) {
      avatar = await saveImage({
        data: one.data,
        isAvatar: true
      });
    }

    // Paso 7: creamos el usuario en la base de datos
    const id = await createUser({ username, email, password: passwordHash, avatar });
    // Paso 8: respondemos con los datos públicos del usuario (no devolvemos el hash)
    res.status(201).json({
      status: 'ok',
      data: {
        id,
        username,
        email,
        avatar
      }
    });

  } catch (err) {
    console.error('[registerUser] Error:', err);
    generateErrorUtil(500, 'Error al registrar usuario');
  }
};