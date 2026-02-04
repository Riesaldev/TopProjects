/**
 * COMPONENTE DE FORMULARIO DE REGISTRO
 * 
 * Formulario para registro de nuevos usuarios (consumidores o productores).
 * 
 * Características:
 * - Toggle entre rol de consumidor y productor
 * - Campos específicos para productores
 * - Validación de contraseñas
 * - Toggle de visibilidad de contraseña
 * - Integración con redes sociales
 * 
 * @component
 */

import { useState } from 'react';
import Image from 'next/image';

import SocialIcons from '@/components/layout/auth/SocialIcons';
import { useFormInput } from '@/hooks/useFormInput';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { BUSINESS_CATEGORIES } from '@/constants';

export default function RegisterForm () {
  // ========================================================================
  // ESTADO
  // ========================================================================

  // Rol seleccionado: 'consumidor' o 'productor'
  const [ role, setRole ] = useState( 'consumidor' );

  // Hook para toggle de visibilidad de contraseñas
  const [ showPassword, togglePassword ] = usePasswordToggle();

  // Hook para manejo de datos del formulario
  const [ formData, handleInputChange ] = useFormInput( {
    name: '',
    email: '',
    businessName: '',
    category: BUSINESS_CATEGORIES[ 0 ],
    password: '',
    confirmPassword: '',
    acceptTerms: false
  } );

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Maneja el envío del formulario
   * TODO: Implementar lógica de registro con backend
   */
  const handleSubmit = ( e ) => {
    e.preventDefault();

    // Aquí iría la lógica de registro
    console.log( 'Datos del formulario:', { ...formData, role } );
  };

  // ========================================================================
  // VALIDACIONES
  // ========================================================================

  // Verificar si las contraseñas coinciden
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0;

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col justify-center items-center p-4 py-8 lg:p-12">
      <div className="w-full max-w-120 flex flex-col gap-6">

        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
            Crear una cuenta
          </h1>
          <p className="text-green-600">
            Completa tus datos para empezar a comprar o vender.
          </p>
        </div>

        {/* Toggle de Rol: Consumidor / Productor */}
        <div className="w-full">
          <div className="flex h-12 w-full items-center justify-center rounded-xl p-1 bg-green-100">
            <label
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${ role === 'consumidor' ? 'bg-white shadow-sm ring-1 ring-black/5' : ''
                }`}
            >
              <span className="truncate text-sm font-bold">Soy Consumidor</span>
              <input
                className="sr-only"
                name="role"
                type="radio"
                value="consumidor"
                checked={role === 'consumidor'}
                onChange={( e ) => setRole( e.target.value )}
              />
            </label>
            <label
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${ role === 'productor' ? 'bg-white shadow-sm ring-1 ring-black/5' : ''
                }`}
            >
              <span className="truncate text-sm font-bold">Soy Productor</span>
              <input
                className="sr-only"
                name="role"
                type="radio"
                value="productor"
                checked={role === 'productor'}
                onChange={( e ) => setRole( e.target.value )}
              />
            </label>
          </div>
        </div>

        {/* Formulario */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Nombre y Email */}
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-bold">Nombre completo</span>
              <div className="relative">
                <input
                  className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 pr-12 text-base outline-none transition-all"
                  placeholder="Ej. Juan Pérez"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Image
                  src="/User.svg"
                  alt="user icon"
                  width="20"
                  height="20"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-bold">Correo electrónico</span>
              <div className="relative">
                <input
                  className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 pr-12 text-base outline-none transition-all"
                  placeholder="nombre@ejemplo.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Image
                  src="/Email.svg"
                  alt="email icon"
                  width="20"
                  height="20"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </label>
          </div>

          {/* Campos específicos de Productor */}
          {role === 'productor' && (
            <div className="p-5 rounded-xl bg-green-50 border border-green-200 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Image
                  src="/Business.svg"
                  alt="business icon"
                  width="20"
                  height="20"
                  className="text-green-700"
                />
                <span className="text-sm font-bold uppercase tracking-wider text-green-700">
                  Datos del Negocio
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 w-full">
                  <span className="text-sm font-bold">Nombre del Negocio</span>
                  <input
                    className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 text-base outline-none transition-all"
                    placeholder="Ej. Granja El Sol"
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required={role === 'productor'}
                  />
                </label>

                <label className="flex flex-col gap-1.5 w-full">
                  <span className="text-sm font-bold">Categoría Principal</span>
                  <select
                    className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 text-base outline-none transition-all cursor-pointer"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {BUSINESS_CATEGORIES.map( ( category ) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ) )}
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Contraseña */}
          <label className="flex flex-col gap-1.5 w-full">
            <span className="text-sm font-bold">Contraseña</span>
            <div className="relative">
              <input
                className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 pr-12 text-base outline-none transition-all"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                minLength={8}
                required
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <Image src="/ShowOff.svg" alt="hide password" width="24" height="24" />
                ) : (
                  <Image src="/Show.svg" alt="show password" width="24" height="24" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Debe tener al menos 8 caracteres
            </p>
          </label>

          {/* Confirmar Contraseña */}
          <label className="flex flex-col gap-1.5 w-full">
            <span className="text-sm font-bold">Confirmar Contraseña</span>
            <div className="relative">
              <input
                className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 pr-12 text-base outline-none transition-all"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                minLength={8}
                required
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <Image src="/ShowOff.svg" alt="hide password" width="24" height="24" />
                ) : (
                  <Image src="/Show.svg" alt="show password" width="24" height="24" />
                )}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">
                Las contraseñas no coinciden
              </p>
            )}
          </label>

          {/* Términos y Botón de Envío */}
          <div className="flex flex-col mt-2">
            <label className="flex items-start gap-3 py-2 cursor-pointer">
              <input
                className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-5 h-5 mt-0.5"
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                required
              />
              <span className="text-sm leading-tight">
                Acepto los{' '}
                <a
                  className="font-bold underline decoration-green-500 decoration-2 underline-offset-2 hover:text-green-600 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Términos de Servicio
                </a>
                {' '}y la{' '}
                <a
                  className="font-bold underline decoration-green-500 decoration-2 underline-offset-2 hover:text-green-600 transition-colors"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad
                </a>
                {' '}de LocalTaste.
              </span>
            </label>

            <button
              className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-green-600 hover:bg-green-700 transition-all transform active:scale-[0.98] shadow-lg active:shadow-md text-white text-base font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!formData.acceptTerms || !passwordsMatch}
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="relative flex items-center py-8 w-full max-w-120">
        <div className="grow border-t border-gray-300"></div>
        <span className="shrink-0 mx-4 text-sm text-gray-500">
          o regístrate con
        </span>
        <div className="grow border-t border-gray-300"></div>
      </div>

      {/* Social Login */}
      <SocialIcons />
    </div>
  );
}