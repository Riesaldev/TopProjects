import type { UserProfileData } from '../types/profile';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validateProfileData = (data: UserProfileData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.displayName?.trim()) {
    errors.displayName = 'Display name is required';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!HEX_COLOR_REGEX.test(data.badgeColor)) {
    errors.badgeColor = 'Invalid color format';
  }

  return errors;
};

export const hasValidationErrors = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length > 0;
};
