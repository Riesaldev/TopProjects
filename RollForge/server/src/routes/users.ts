import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { zodValidator, authUser } from '@/middlewares/index.ts';
import {
  registerSchema,
  loginSchema,
  startPasswordRecoverySchema,
  resetPasswordSchema,
  idParamSchema,
  updateUserSchema,
  changePasswordSchema,
} from '@/schemas/users.ts';
import {
  registerUser,
  loginUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateAvatar,
  changePassword,
  startPasswordRecovery,
  resetPassword,
  getUsersByName,
  getMe,
} from '@/controllers/users/index.ts';
// Las rutas sensibles requieren estar autenticado mediante authUser

export const usersRouter = Router();

// Limitador para proteger endpoints sensibles contra fuerza bruta
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                 // máximo 100 peticiones por IP en la ventana
  standardHeaders: true,
  legacyHeaders: false,
});

// Autenticación y gestión de cuenta
usersRouter.post('/register', zodValidator(registerSchema), registerUser);
usersRouter.post('/login', authLimiter, zodValidator(loginSchema), loginUser);
usersRouter.post('/password/recover', authLimiter, zodValidator(startPasswordRecoverySchema), startPasswordRecovery);
usersRouter.post('/password/reset', zodValidator(resetPasswordSchema), resetPassword);

// Rutas específicas deben ir ANTES de rutas con parámetros genéricos
usersRouter.get('/me', authUser, getMe);
usersRouter.get('/by-name/:username', authUser, getUsersByName);

// Perfil de usuario / listado
usersRouter.get('/', authUser, listUsers);
usersRouter.get('/:id', authUser, zodValidator(idParamSchema, 'params'), getUserById);
usersRouter.put('/:id', authUser, zodValidator(idParamSchema, 'params'), zodValidator(updateUserSchema), updateUser);
usersRouter.delete('/:id', authUser, zodValidator(idParamSchema, 'params'), deleteUser);
usersRouter.post('/:id/avatar', authUser, zodValidator(idParamSchema, 'params'), updateAvatar);
usersRouter.post('/:id/password', authUser, zodValidator(idParamSchema, 'params'), zodValidator(changePasswordSchema), changePassword);

export default usersRouter;
