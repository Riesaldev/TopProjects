import { Request, Response } from 'express';
import generateErrorUtil from '@/utils/generateErrorUtil.ts';
import { listUsersModel } from '@/models/users/index.ts';

export const listUsers = async (req: Request, res: Response) => {
  try {
    const rows = await listUsersModel();

    res.json({
      status: 'ok',
      data: rows
    }
    );

  } catch {
    generateErrorUtil(500, 'Error al obtener usuarios');
  }
};