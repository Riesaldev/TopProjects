import { ArrowRight, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import AuthTabs from "./AuthTabs";
import AuthMedia from "./AuthMedia";
import AuthFooter from "./AuthFooter";
import { useLoginForm } from '../../../hooks/useAuthForm';
import { AUTH_MESSAGES } from '../../../data/authConstants';
import { mockUserData as mockAuthData } from '@/data/mockUser';
import { mockUserData as mockProfileData } from '@/data/mockProfile';

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    handleInputChange,
    validateForm,
    togglePasswordVisibility,
    setIsSubmitting,
    setErrors,
  } = useLoginForm();

  /**
   * Handles form submission with validation and API call
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const trimmedInput = formData.email.trim().toLowerCase();

      // Validate credentials against mock data
      const isValidEmail = trimmedInput === mockAuthData.email.toLowerCase();
      const isValidUsername = mockAuthData.username && trimmedInput === mockAuthData.username.toLowerCase();
      const isValidPassword = formData.password === mockAuthData.password;

      if ((isValidEmail || isValidUsername) && isValidPassword) {
        console.log('Login successful:', {
          input: trimmedInput,
          remember: formData.remember,
        });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Store user session in localStorage
        if (formData.remember) {
          localStorage.setItem('rememberMe', JSON.stringify({
            email: trimmedInput,
            timestamp: new Date().toISOString(),
          }));
        }

        // Store authenticated user profile data
        localStorage.setItem('userProfile', JSON.stringify(mockProfileData));
        localStorage.setItem('isAuthenticated', 'true');

        // Redirect to profile page
        navigate('/profile');
      } else {
        // Invalid credentials
        console.error('Login failed: Invalid credentials');
        setErrors({ email: AUTH_MESSAGES.INVALID_CREDENTIALS });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: AUTH_MESSAGES.INVALID_CREDENTIALS });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 h-auto w-full flex flex-col justify-center items-center p-4 sm:p-8 relative bg-background-primary gap-6 overflow-hidden">
      <section className="w-full max-w-120 flex flex-col">
        <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-6">
          Welcome, Traveler !
        </h2>
        <p className="text-sm text-text-secondary/60 mb-6">
          Return to the forge and reclaim your place among legends. Your journey awaits—step back into the fray and reunite with the heroes who fight by your side.
        </p>
        <AuthTabs />
      </section>

      <AuthMedia />

      <form onSubmit={handleSubmit} className="w-full max-w-120 flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-text-primary">
            Email or Username
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/40" />
            <input
              type="text"
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
              onClick={togglePasswordVisibility}
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

        <section className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={formData.remember}
              onChange={handleInputChange}
              className="mr-2 bg-border-dark-heavy/10"
            />
            <label htmlFor="remember" className="text-sm text-text-secondary/60">
              Remember me
            </label>
          </div>
          <Link to="/reset" className="text-primary brightness-175 hover:underline text-sm">
            Forgot password?
          </Link>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 active:scale-95 transition-transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none  cursor-pointer"
        >
          {isSubmitting ? (
            'Signing in...'
          ) : (
            <>
              Well met at the Forge <ArrowRight className="inline-block ml-2" />
            </>
          )}
        </button>
      </form>

      <AuthFooter />
    </main>
  );
}