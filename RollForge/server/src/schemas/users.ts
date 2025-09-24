import { z } from 'zod';

// common
export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

// register
export const registerSchema = z.object({
  username: z
    .string()
    .min(4, 'El usuario debe tener al menos 4 caracteres')
    .max(50, 'El usuario no puede superar 50 caracteres')
    .regex(/^[A-Za-z0-9]+$/, 'El usuario solo puede contener letras y números'),
  email: z
    .string()
    .email('Email inválido')
    .max(100, 'El email no puede superar 100 caracteres')
    .refine((v) => /\.[A-Za-z]{2,}$/.test(v), {
      message: 'El email debe terminar con un dominio válido (.com, .es, etc.)',
    }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100),
});

// login: permitir email o username junto con password
export const loginSchema = z.union([
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  z.object({
    username: z
      .string()
      .min(3, 'El usuario debe tener al menos 3 caracteres')
      .max(50, 'El usuario no puede superar 50 caracteres'),
    password: z.string().min(6),
  }),
]);

// update
export const updateUserSchema = z
  .object({
    username: z.string().min(3).max(50).optional(),
    email: z.string().email().max(100).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'Debe enviar al menos un campo' });

// password change
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// start recovery
export const startPasswordRecoverySchema = z.object({ email: z.string().email() });

// reset password
export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  newPassword: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type StartPasswordRecoveryInput = z.infer<typeof startPasswordRecoverySchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
