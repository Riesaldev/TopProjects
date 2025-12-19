


const Header = ( { } ) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="./FarmTractor.svg"
                alt="Logo LocalTaste"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold text-gray-900">LocalTaste</h1>
            </a>
          </div>

          {/* Navigation and Search */}
          <div className="flex items-center flex-1 justify-center space-x-8">
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/mercado" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Mercado
              </a>
              <a href="/suscripciones" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Suscripciones
              </a>
              <a href="/productores" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Productores
              </a>
              <a href="/mision" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Nuestra Misión
              </a>
            </nav>

            {/* Search */}
            <div className="hidden sm:block ml-16">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-8">
            <button className="px-4 py-1 text-primary border border-primary rounded-full hover:bg-primary hover:text-white font-medium transition-colors cursor-pointer">
              Login
            </button>
            <button className="px-4 py-1 text-primary border border-primary rounded-full hover:bg-primary hover:text-white font-medium transition-colors">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header