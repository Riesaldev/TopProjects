/**
 * @fileoverview Componente de encabezado principal de la aplicación
 * Barra de navegación sticky con logo, menú, búsqueda y botones de autenticación
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * Header principal de LocalTaste
 * 
 * Componente de navegación sticky que incluye:
 * - Logo y nombre de la aplicación
 * - Menú de navegación (Nuestra Misión, Productos, Productores)
 * - Menú hamburguesa para dispositivos móviles y tablets
 * - Barra de búsqueda global
 * - Botones de registro e inicio de sesión
 * 
 * Se mantiene fijo en la parte superior de la página al hacer scroll.
 * 
 * @returns {JSX.Element} Componente Header
 * 
 * @example
 * <Header />
 */
const Header = () => {
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const [ isMounted, setIsMounted ] = useState( false );

  useEffect( () => {
    setIsMounted( true );
  }, [] );

  const toggleMenu = () => {
    setIsMenuOpen( !isMenuOpen );
  };

  return (
    <header className="w-full max-w-full overflow-x-hidden bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 lg:gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0 hover:scale-105 transition-transform duration-300">
            <a href="/" className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="/FarmTractor.svg"
                alt="Logo LocalTaste"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-950 whitespace-nowrap">LocalTaste</h1>
            </a>
          </div>

          {/* Navigation and Search - Desktop */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-4 xl:space-x-6 leading-tight">
            {/* Navigation */}
            <nav className="flex space-x-4 xl:space-x-6 brightness-60">
              <a href="/ourMision" className="text-green-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                Nuestra Misión
              </a>
              <a href="/products" className="text-green-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                Productos
              </a>
              <a href="/producers" className="text-green-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                Productores
              </a>
            </nav>

            {/* Search */}
            <div className="shrink-0">
              <div className="relative text-green-800 focus-within:text-green-800">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-48 xl:w-72 pl-10 xl:pl-14 pr-4 py-2 bg-[#2BEE7C]/10 focus:bg-[#2BEE7C]/25 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-green-800 brightness-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Auth buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 shrink-0">
            <a className="px-3 xl:px-4 py-2 text-green-950 bg-[#2BEE7C] font-bold text-xs xl:text-sm rounded-full hover:text-[#1fa356] hover:bg-[#2BEE7C]/10 active:scale-95 cursor-pointer transition-all duration-500 whitespace-nowrap"
              href="/auth/register"
            >
              Registrarse
            </a>
            <a className="px-3 xl:px-4 py-2 hover:bg-[#2BEE7C] font-bold text-xs xl:text-sm text-[#1fa356] bg-[#2BEE7C]/10 hover:text-green-950 rounded-full active:scale-95 cursor-pointer transition-all duration-500 whitespace-nowrap"
              href="/auth/loggin"
            >
              Iniciar Sesión
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BEE7C] shrink-0"
            aria-label="Menú"
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMounted && (
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${ isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-3 bg-white border-t border-gray-100">
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <a
                href="/ourMision"
                className="text-gray-700 hover:text-[#2BEE7C] font-medium py-2 px-3 rounded-lg hover:bg-[#2BEE7C]/10 transition-colors"
                onClick={() => setIsMenuOpen( false )}
              >
                Nuestra Misión
              </a>
              <a
                href="/products"
                className="text-gray-700 hover:text-[#2BEE7C] font-medium py-2 px-3 rounded-lg hover:bg-[#2BEE7C]/10 transition-colors"
                onClick={() => setIsMenuOpen( false )}
              >
                Productos
              </a>
              <a
                href="/producers"
                className="text-gray-700 hover:text-[#2BEE7C] font-medium py-2 px-3 rounded-lg hover:bg-[#2BEE7C]/10 transition-colors"
                onClick={() => setIsMenuOpen( false )}
              >
                Productores
              </a>
            </nav>

            {/* Mobile Search */}
            <div className="pt-2">
              <div className="relative text-green-800">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 bg-[#2BEE7C]/10 focus:bg-[#2BEE7C]/25 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-green-800 brightness-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Auth buttons */}
            <div className="flex flex-col space-y-2 pt-2">
              <a
                className="px-4 py-2 bg-[#2BEE7C] font-bold text-sm text-center rounded-full hover:text-[#1fa356] hover:bg-[#2BEE7C]/10 active:scale-95 cursor-pointer transition-all duration-500"
                href="/auth/register"
                onClick={() => setIsMenuOpen( false )}
              >
                Registrarse
              </a>
              <a
                className="px-4 py-2 hover:bg-[#2BEE7C] font-bold text-sm text-center text-[#1fa356] bg-[#2BEE7C]/10 hover:text-black rounded-full active:scale-95 cursor-pointer transition-all duration-500"
                href="/auth/loggin"
                onClick={() => setIsMenuOpen( false )}
              >
                Iniciar Sesión
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;