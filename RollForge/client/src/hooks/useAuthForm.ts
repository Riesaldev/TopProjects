/**
 * Hook personalizado para gestionar formularios de autenticación
 */

import { useState, useCallback, type ChangeEvent } from 'react';
import type { LoginFormData, RegisterFormData, PasswordRecoveryFormData } from '../types/auth';
import {
  validateLoginForm,
  validateRegisterForm,
  validatePasswordRecoveryForm,
  hasValidationErrors,
} from '../utils/authValidation';

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState<Partial<Omit<LoginFormData, 'remember'>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors = validateLoginForm(formData);
    const formErrors: Partial<Omit<LoginFormData, 'remember'>> = {
      email: newErrors.email,
      password: newErrors.password,
    };
    setErrors(formErrors);
    return !hasValidationErrors(formErrors);
  }, [formData]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setFormData({ email: '', password: '', remember: false });
    setErrors({});
    setShowPassword(false);
  }, []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    validateForm,
    reset,
  };
};

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors = validateRegisterForm(formData);
    setErrors(newErrors);
    return !hasValidationErrors(newErrors);
  }, [formData]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleInputChange,
    validateForm,
    reset,
  };
};

export const usePasswordRecoveryForm = () => {
  const [formData, setFormData] = useState<PasswordRecoveryFormData>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<PasswordRecoveryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof PasswordRecoveryFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors = validatePasswordRecoveryForm(formData);
    setErrors(newErrors);
    return !hasValidationErrors(newErrors);
  }, [formData]);

  const reset = useCallback(() => {
    setFormData({ email: '' });
    setErrors({});
  }, []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    reset,
  };
};
