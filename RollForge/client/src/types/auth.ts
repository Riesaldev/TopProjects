/**
 * Tipos e interfaces para autenticación
 */

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordRecoveryFormData {
  email: string;
}

export type AuthFormData = LoginFormData | RegisterFormData | PasswordRecoveryFormData;

export interface AuthError {
  field: keyof AuthFormData;
  message: string;
}
