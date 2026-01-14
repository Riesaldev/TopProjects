


const Header = ( { } ) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center hover:scale-120 transition-transform duration-300">
            <a href="/" className="flex items-center space-x-4">
              <img
                src="../FarmTractor.svg"
                alt="Logo LocalTaste"
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold text-gray-900">LocalTaste</h1>
            </a>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4 mr-4">
            <p className="text-sm font-medium text-[#1c7441]">¿Ya tienes cuenta?</p>
            <a className="px-4 py-2 hover:bg-[#2BEE7C] font-bold  text-sm text-[#1fa356] bg-[#2BEE7C]/10 hover:text-black rounded-full active:scale-95 cursor-pointer transition-all duration-500"
              href="/auth/login"
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