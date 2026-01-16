


const Header = ( { } ) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center hover:scale-120 transition-transform duration-300">
            <a href="/" className="flex items-center space-x-4">
              <img
                src="./FarmTractor.svg"
                alt="Logo LocalTaste"
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold text-gray-900">LocalTaste</h1>
            </a>
          </div>

          {/* Navigation and Search */}
          <div className="flex items-center justify-center space-x-24">
            {/* Navigation */}
            <nav className="hidden md:flex space-x-18 brightness-60">
              <a href="/mision" className="text-gray-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110">
                Nuestra Misión
              </a>
              <a href="/productos" className="text-gray-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110">
                Productos
              </a>
              <a href="/productores" className="text-gray-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110">
                Productores
              </a>
              <a href="/favoritos" className="text-gray-700 hover:text-[#2BEE7C] font-medium transition-transform duration-300 hover:scale-110">
                Favoritos
              </a>
            </nav>

            {/* Search */}
            <div className="hidden sm:block ml-12">
              <div className="relative text-green-800 focus-within:text-green-800">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-72 pl-14 pr-4 py-2 bg-[#2BEE7C]/10 focus:bg-[#2BEE7C]/25 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800 "
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-green-800 brightness-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <a className="px-4 py-2 bg-[#2BEE7C] font-bold text-sm rounded-full hover:text-[#1fa356] hover:bg-[#2BEE7C]/10 active:scale-95 cursor-pointer transition-all duration-500"
              href="/auth/register"
            >
              Registrarse
            </a>
            <a className="px-4 py-2 hover:bg-[#2BEE7C] font-bold  text-sm text-[#1fa356] bg-[#2BEE7C]/10 hover:text-black rounded-full active:scale-95 cursor-pointer transition-all duration-500"
              href="/auth/loggin"
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header