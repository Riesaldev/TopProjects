import { useState, type ChangeEvent } from 'react';
import { ArrowRight, Mail, } from 'lucide-react';

import AuthTabs from "./AuthTabs";
import AuthMedia from "./AuthMedia";
import AuthFooter from './AuthFooter';


interface FormData {
  email: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PasswordRecovery() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Validates email format using RFC 5322 simplified regex pattern
   * @param email - Email string to validate
   * @returns True if email format is valid
   */
  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.trim());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Validates all form fields before submission
   * @returns True if all validations pass
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission for password recovery
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: Implementar lógica de recuperación de contraseña con API
      console.log('Submitting password recovery for:', formData.email);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: manejar respuesta de la API, mostrar mensajes de éxito/error, etc.
    } catch (error) {
      console.error('Error during password recovery:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 h-auto w-full flex flex-col justify-center items-center p-4 sm:p-8 relative bg-background-primary gap-6 overflow-hidden">
      <section className="w-full max-w-120 flex flex-col">
        <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-6">Welcome Traveler !</h2>
        <p className="text-sm text-text-secondary/60 mb-6">Forgot your password? Then fate has dealt you a natural 1, but fear not: a heroic Saving Throw from the Forge awaits, ready to guide you back to the path that is rightfully yours.
        </p>
        <AuthTabs />
      </section>
      <AuthMedia />

      <form onSubmit={handleSubmit} className="w-full max-w-120 flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-text-primary">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/40" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="laezel@bg3.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full border-text-secondary/20 text-text-muted rounded-md border pl-10 pr-3 py-2 bg-border-dark-heavy/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500/50' : ''
                }`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 active:scale-95 transition-transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              Invoke the Forge’s Saving Throw<ArrowRight className="inline-block ml-2" />
            </>
          )}
        </button>
      </form>
      <AuthFooter />
    </main>
  );
}