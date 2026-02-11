// Componentes reutilizables para el formulario de registro
import AuthTabs from "./AuthTabs";
import AuthMedia from "./AuthMedia";
import AuthFooter from "./AuthFooter";
// Iconos
import { ArrowRight, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
// Hooks y estado
import { useState, type ChangeEvent } from 'react';

// Tipos para el formulario
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Constantes de validación
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
  // Estados de UI
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Estado del formulario
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado de errores
  const [errors, setErrors] = useState<Partial<FormData>>({});

  /**
   * Valida el formato del email
   */
  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.trim());
  };

  /**
   * Valida que la contraseña cumpla los requisitos mínimos
   */
  const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }
    // Opcional: añadir validación de complejidad
    // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    //   return 'Password must contain uppercase, lowercase, and numbers';
    // }
    return null;
  };

  /**
   * Maneja los cambios en los campos del formulario
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo específico
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Valida todo el formulario y retorna true si es válido
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validar contraseña
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: Implementar lógica de registro con API
      console.log('Form submitted:', {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Simular petición API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ email: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 h-auto w-full flex flex-col justify-center items-center p-4 sm:p-8 relative bg-background-primary gap-6 overflow-hidden">
      {/* Welcome Section */}
      <section className="w-full max-w-120 flex flex-col">
        <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-6">
          Welcome, Traveler !
        </h2>
        <p className="text-sm text-text-secondary/60 mb-6">
          Create an account to gain access to grand adventures in epic worlds alongside your trusted companions-in-arms. Welcome to RollForge!
        </p>
        <AuthTabs />
      </section>

      {/* Social Media Login Options */}
      <AuthMedia />

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-120 flex flex-col gap-4" noValidate>
        {/* Email Field */}
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

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-text-primary">
            Password
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/40" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full border-text-secondary/20 text-text-muted rounded-md border pl-10 pr-10 py-2 bg-border-dark-heavy/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${errors.password ? 'border-red-500 focus:ring-red-500/50' : ''
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60 hover:text-text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-text-primary">
            Confirm Password
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/40" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirm-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              className={`w-full border-text-secondary/20 text-text-muted rounded-md border pl-10 pr-10 py-2 bg-border-dark-heavy/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/50' : ''
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60 hover:text-text-primary transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="text-red-500 text-sm" role="alert">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 active:scale-95 transition-transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
        >
          {isSubmitting ? (
            'Creating Account...'
          ) : (
            <>
              Well met, traveler — welcome to the Forge <ArrowRight className="inline-block ml-2" />
            </>
          )}
        </button>
      </form>

      <AuthFooter />
    </main>
  );
}