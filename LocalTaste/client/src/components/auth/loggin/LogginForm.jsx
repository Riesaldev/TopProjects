/**
 * COMPONENTE DE FORMULARIO DE INICIO DE SESIÓN
 * 
 * Formulario para autenticación de usuarios existentes.
 * 
 * Características:
 * - Validación de email y contraseña
 * - Toggle de visibilidad de contraseña
 * - Manejo de estado con hooks personalizados
 * 
 * @component
 */

import { useState } from 'react';
import Image from 'next/image';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';

export default function LogginForm () {
  // ========================================================================
  // ESTADO
  // ========================================================================

  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ showPassword, togglePassword ] = usePasswordToggle();

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Maneja el envío del formulario
   * TODO: Implementar lógica de autenticación con backend
   */
  const handleSubmit = ( e ) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log( "Email:", email, "Password:", password );
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col justify-center items-center p-4 py-8 lg:p-12">
      <div className="w-full max-w-120 flex flex-col gap-6">

        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
            Iniciar sesión
          </h1>
          <p className="text-green-600">
            Entra a tu cuenta para continuar.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">

            {/* Email */}
            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-medium text-gray-700">
                Correo Electrónico
              </span>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={( e ) => setEmail( e.target.value )}
                  required
                />
              </div>
            </label>

            {/* Contraseña */}
            <label className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-medium text-gray-700">
                Contraseña
              </span>
              <div className="relative">
                <input
                  className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 pr-12 text-base outline-none transition-all"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={( e ) => setPassword( e.target.value )}
                  minLength={8}
                  required
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <Image
                      src="/ShowOff.svg"
                      alt="hide password"
                      width="24"
                      height="24"
                    />
                  ) : (
                    <Image
                      src="/Show.svg"
                      alt="show password"
                      width="24"
                      height="24"
                    />
                  )}
                </button>
              </div>
            </label>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform active:scale-[0.98] shadow-lg active:shadow-md font-bold cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}