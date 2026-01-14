

'use client';

import { useState } from 'react';

import Header from '@/components/auth/header';

export default function Register () {
  const [ role, setRole ] = useState( 'consumidor' );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ formData, setFormData ] = useState( {
    name: '',
    email: '',
    businessName: '',
    category: 'Verduras y Hortalizas',
    password: '',
    acceptTerms: false
  } );

  const handleInputChange = ( e ) => {
    const { name, value, type, checked } = e.target;
    setFormData( prev => ( {
      ...prev,
      [ name ]: type === 'checkbox' ? checked : value
    } ) );
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log( 'Datos del formulario:', { ...formData, role } );
  };

  return (
    <main className="overflow-x-hidden antialiased min-h-screen flex flex-col">
      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
        <Header />
        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row bg-green-50 brightness-90">
          {/* Left Side: Image/Branding (Hidden on mobile, visible on lg screens) */}
          <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden p-6 items-center justify-center">
            <div className="absolute inset-0 m-4 rounded-3xl overflow-hidden shadow-2xl shadow-green-600">
              <div className="w-full h-full bg-cover bg-center bg-[url('/hero-reg.png')] relative">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-14 text-white">
                  <h1 className="text-5xl font-black leading-tight mb-8">Del campo a tu mesa, sin intermediarios.</h1>
                  <div className="max-w-xl">
                    <p className="text-lg mt-2 opacity-90 tracking-wider leading-relaxed pl-4">Únete a la comunidad que valora el sabor real y apoya a los productores locales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col justify-center items-center p-4 py-8 lg:p-12">
            <div className="w-full max-w-120 flex flex-col gap-6">
              {/* Header Text */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Crear una cuenta</h1>
                <p className="text-green-600">Completa tus datos para empezar a comprar o vender.</p>
              </div>
              {/* Role Toggle */}
              <div className="w-full">
                <div className="flex h-12 w-full items-center justify-center rounded-xl p-1 bg-green-100">
                  <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${ role === 'consumidor' ? 'bg-white shadow-sm ring-1 ring-black/5' : '' }`}>
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
                  <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${ role === 'productor' ? 'bg-white shadow-sm ring-1 ring-black/5' : '' }`}>
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
              {/* Form Fields */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Name & Email */}
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
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
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
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                  </label>
                </div>
                {/* Producer Specific Fields (Visually distinct) */}
                {role === 'productor' && (
                  <div className="p-5 rounded-xl bg-green-50 border border-green-200 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider text-green-700">Datos del Negocio</span>
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
                        <div className="relative">
                          <select
                            className="flex w-full rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-12 px-4 text-base outline-none transition-all cursor-pointer"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                          >
                            <option value="Verduras y Hortalizas">Verduras y Hortalizas</option>
                            <option value="Frutas">Frutas</option>
                            <option value="Lácteos y Huevos">Lácteos y Huevos</option>
                            <option value="Miel y Conservas">Miel y Conservas</option>
                          </select>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
                {/* Password */}
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
                      onClick={() => setShowPassword( !showPassword )}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                        ) : (
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Debe tener al menos 8 caracteres</p>
                </label>
                {/* Terms */}
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
                    Acepto los <a className="font-bold underline decoration-green-500 decoration-2 underline-offset-2 hover:text-green-600 transition-colors" href="#" target="_blank">Términos de Servicio</a> y la <a className="font-bold underline decoration-green-500 decoration-2 underline-offset-2 hover:text-green-600 transition-colors" href="#" target="_blank">Política de Privacidad</a> de LocalTaste.
                  </span>
                </label>
                {/* Submit Button */}
                <button
                  className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-green-600 hover:bg-green-700 transition-all transform active:scale-[0.98] shadow-lg active:shadow-md text-white text-base font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={!formData.acceptTerms}
                >
                  Crear cuenta
                </button>
              </form>
              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="grow border-t border-gray-300"></div>
                <span className="shrink-0 mx-4 text-sm text-gray-500">o regístrate con</span>
                <div className="grow border-t border-gray-300"></div>
              </div>
              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-300 hover:bg-green-100 active:scale-95 transition-colors font-medium text-sm cursor-pointer"
                  type="button"
                  onClick={() => console.log( 'Google login' )}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button
                  className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-300 hover:bg-green-100 active:scale-95 transition-colors font-medium text-sm cursor-pointer"
                  type="button"
                  onClick={() => console.log( 'Facebook login' )}
                >
                  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}