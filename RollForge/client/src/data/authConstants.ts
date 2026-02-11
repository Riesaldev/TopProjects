/**
 * Constantes de validación y configuración de autenticación
 */

export const AUTH_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_EMAIL_LENGTH: 254,
} as const;

export const AUTH_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: `Password must be at least ${AUTH_VALIDATION.MIN_PASSWORD_LENGTH} characters`,
  PASSWORD_MISMATCH: 'Passwords do not match',
  CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
  RESET_SUCCESS: 'Password reset email sent!',
} as const;

export const BRAND_CONFIG = {
  LOGO_TEXT: 'RollForge',
  AUTH_QUOTE: {
    text: 'The dice tell the story, but the forge is where legends are built. Join thousands of game masters crafting worlds today.',
    subtitle: '',
  },
} as const;
