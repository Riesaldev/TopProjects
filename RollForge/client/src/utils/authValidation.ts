/**
 * Funciones de validación para autenticación
 */

import { AUTH_VALIDATION, AUTH_MESSAGES } from '../data/authConstants';
import type { LoginFormData, RegisterFormData, PasswordRecoveryFormData } from '../types/auth';

/**
 * Valida el formato del email
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export const validateEmail = (email: string): boolean => {
  return AUTH_VALIDATION.EMAIL_REGEX.test(email.trim());
};

/**
 * Valida que la contraseña cumpla con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns null si es válida, o mensaje de error
 */
export const validatePassword = (password: string): string | null => {
  if (!password) return AUTH_MESSAGES.PASSWORD_REQUIRED;
  if (password.length < AUTH_VALIDATION.MIN_PASSWORD_LENGTH) {
    return AUTH_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return null;
};

/**
 * Valida un formulario de login
 * @param formData - Datos del formulario
 * @returns Objeto con errores por campo
 */
export const validateLoginForm = (
  formData: LoginFormData
): Partial<Record<keyof LoginFormData, string>> => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};

  if (!formData.email.trim()) {
    errors.email = AUTH_MESSAGES.EMAIL_REQUIRED;
  } else if (!validateEmail(formData.email)) {
    errors.email = AUTH_MESSAGES.EMAIL_INVALID;
  }

  if (!formData.password) {
    errors.password = AUTH_MESSAGES.PASSWORD_REQUIRED;
  }

  return errors;
};

/**
 * Valida un formulario de registro
 * @param formData - Datos del formulario
 * @returns Objeto con errores por campo
 */
export const validateRegisterForm = (
  formData: RegisterFormData
): Partial<Record<keyof RegisterFormData, string>> => {
  const errors: Partial<Record<keyof RegisterFormData, string>> = {};

  // Validar email
  if (!formData.email.trim()) {
    errors.email = AUTH_MESSAGES.EMAIL_REQUIRED;
  } else if (!validateEmail(formData.email)) {
    errors.email = AUTH_MESSAGES.EMAIL_INVALID;
  }

  // Validar contraseña
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  // Validar confirmación de contraseña
  if (!formData.confirmPassword) {
    errors.confirmPassword = AUTH_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = AUTH_MESSAGES.PASSWORD_MISMATCH;
  }

  return errors;
};

/**
 * Valida un formulario de recuperación de contraseña
 * @param formData - Datos del formulario
 * @returns Objeto con errores por campo
 */
export const validatePasswordRecoveryForm = (
  formData: PasswordRecoveryFormData
): Partial<Record<keyof PasswordRecoveryFormData, string>> => {
  const errors: Partial<Record<keyof PasswordRecoveryFormData, string>> = {};

  if (!formData.email.trim()) {
    errors.email = AUTH_MESSAGES.EMAIL_REQUIRED;
  } else if (!validateEmail(formData.email)) {
    errors.email = AUTH_MESSAGES.EMAIL_INVALID;
  }

  return errors;
};

/**
 * Verifica si hay errores en un objeto de errores
 * @param errors - Objeto con errores
 * @returns true si hay al menos un error
 */
export const hasValidationErrors = (errors: Record<string, any>): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== '');
};
