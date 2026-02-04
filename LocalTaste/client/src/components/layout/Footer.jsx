/**
 * @fileoverview Componente de pie de página principal
 * Footer completo con logo, enlaces de navegación, redes sociales y copyright
 */

/**
 * Footer principal de LocalTaste
 * 
 * Componente de pie de página organizado en 4 columnas:
 * - Columna 1: Logo, descripción de la empresa y redes sociales
 * - Columna 2: Enlaces del Mercado (categorías de productos)
 * - Columna 3: Enlaces de Compañía (sobre nosotros, productores, blog, empleo)
 * - Columna 4: Enlaces de Ayuda (centro de ayuda, envíos, términos, privacidad)
 * 
 * Incluye sección inferior con copyright y mensaje "Hecho con ♥ localmente"
 * 
 * @returns {JSX.Element} Componente Footer
 * 
 * @example
 * <Footer />
 */
const Footer = ( { } ) => {
  return (
    <footer className="w-full bg-background-light  border-t border-[#e7f3ec] pt-16 pb-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            {/* Logo */}
            <div className="flex items-center hover:scale-120 transition-transform duration-300">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="./FarmTractor.svg"
                  alt="Logo LocalTaste"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold text-gray-900">LocalTaste</h1>
              </a>
            </div>
            <p className="text-gray-500 text-sm">Conectando comunidades a través de alimentos reales y sostenibles de cercania.</p>
            <div className="flex gap-4 mt-2 ml-2">
              <a className="hover:scale-115 transition-scale" href="#"><img src="/insta.svg" alt="Instagram" width={22} height={22} /></a>
              <a className="hover:scale-115 transition-scale" href="#"><img src="/Mail.svg" alt="Email" width={26} height={26} /></a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main ">Mercado</h4>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Frutas y Verduras</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Lácteos y Huevos</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Carne y Pescado</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Despensa</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main ">Compañía</h4>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Sobre Nosotros</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Productores</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Blog</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Trabaja con nosotros</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-text-main ">Ayuda</h4>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Centro de Ayuda</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Envíos y Devoluciones</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Términos y Condiciones</a>
            <a className="text-gray-500 hover:text-[#2BEE7C] hover:scale-115 text-sm" href="#">Privacidad</a>
          </div>
        </div>
        <div className="border-t border-[#e7f3ec] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 LocalTaste Marketplace. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>Hecho con <span className="text-red-500">♥</span> localmente</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer