"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Simular registro exitoso
      console.log("Registration successful:", formData);
      
      // Redirigir directamente al dashboard (usuario ya "logueado")
      router.push("/user/dashboard");
      
    } catch (error) {
      console.error("Registration error:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de registro">
      {/* Name Field */}
      <div>
        <label htmlFor="register-name" className="block text-sm font-semibold text-gray-700 mb-2">
          Nombre Completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="register-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className="w-full pl-10 pr-4 py-3 border border-accent-400 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-accent-400 focus:bg-primary-50"
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="register-email" className="block text-sm font-semibold text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="register-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full pl-10 pr-4 py-3 border border-accent-400 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-accent-400 focus:bg-primary-50"
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 border border-accent-400 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-accent-400 focus:bg-primary-50"
            autoComplete="new-password"
            required
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="register-password2" className="block text-sm font-semibold text-gray-700 mb-2">
          Repetir Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="register-password2"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 border border-accent-400 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-accent-400 focus:bg-primary-50"
            autoComplete="new-password"
            required
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Terms Acceptance */}
      <div className="flex items-start space-x-3">
        <input
          id="accept-terms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
          required
          aria-required="true"
        />
        <label htmlFor="accept-terms" className="text-sm text-accent-600">
          Acepto los{" "}
          <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
            Términos de Servicio
          </a>
          {" "}y la{" "}
          <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
            Política de Privacidad
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!formData.acceptTerms}
          isLoading={isLoading}
          aria-label="Registrarse"
        >
          Registrarse
        </Button>
      </motion.div>

      {/* Password Requirements */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>La contraseña debe contener:</p>
        <ul className="list-disc list-inside ml-2 space-y-1">
          <li>Al menos 8 caracteres</li>
          <li>Una letra mayúscula</li>
          <li>Una letra minúscula</li>
          <li>Un número</li>
        </ul>
      </div>
    </form>
  );
}