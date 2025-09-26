import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { findByEmail, findByUsername } from '@/models/users/index.ts';
import { getJwtSecret } from '@/config/jwt.ts';

const { JWT_EXPIRES_IN } = process.env;

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Datos ya validados por zodValidator en la ruta: puede venir email o username
    const { email, username, password } = req.body as { email?: string; username?: string; password: string };

    let user = null as Awaited<ReturnType<typeof findByEmail>> | Awaited<ReturnType<typeof findByUsername>> | null;
    if (email) {
      user = await findByEmail(email);
    } else if (username) {
      user = await findByUsername(username);
    }
    if (!user) {
      generateErrorUtil(401, 'Credenciales inválidas');
    }
    const ensuredUser = user as NonNullable<typeof user>;
    const ok = await bcrypt.compare(password, ensuredUser.password);

    if (!ok) {
      generateErrorUtil(401, 'Credenciales inválidas');
    }

    // Paso 3: generamos un token JWT si las credenciales son correctas
    const secretEnv = getJwtSecret();
    const expiresIn = (JWT_EXPIRES_IN ?? '7d') as jwt.SignOptions['expiresIn'];
    const options: jwt.SignOptions = { expiresIn };

    const token = jwt.sign(
      { id: ensuredUser.id, email: ensuredUser.email },
      secretEnv as jwt.Secret,
      options
    );

    res.json({
      status: 'ok',
      data: {
        id: ensuredUser.id,
        username: ensuredUser.username!,
        email: ensuredUser.email,
        avatar: ensuredUser.avatar ?? null,
        token
      }
    });

  } catch (e: unknown) {
    console.error('[loginUser] error:', e);
    // Si ya viene con httpStatus (lanzado por generateErrorUtil), re-lanzamos tal cual.
    if (e && typeof e === 'object' && 'httpStatus' in e) {
      throw e;
    }
    // Error inesperado
    generateErrorUtil(500, 'Error al iniciar sesión');
  }
};
