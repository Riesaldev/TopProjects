
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MisionPage () {
  return (
    <>
      <Header />
      {/* Main Content */}
      <main className="flex h-full grow flex-col items-center bg-gray-100">
        {/* Hero Section */}
        <div className="w-full max-w-7xl p-4 lg:p-8">
          <div className="relative flex min-h-125 flex-col gap-6 overflow-hidden rounded-xlp-8 items-center justify-center text-center shadow-lg" data-alt="Farmer hands holding fresh soil and vegetables">
            <div>
              <Image
                src="/hero-mis.png"
                alt="Farmer hands holding fresh soil and vegetables"
                width={1200}
                height={500}
                className="absolute inset-0 h-full w-full object-cover brightness-60 z-0"
              />
            </div>
            <div className="max-w-200 flex flex-col gap-4 z-50 px-4">
              <span className="font-bold uppercase tracking-wider text-sm text-[#27fc8e] md:text-base bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mx-auto">Nuestra Promesa</span>
              <h1 className="text-gray-50 text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                Nuestra Misión:<br />Reconectar con la Tierra
              </h1>
              <h2 className="text-gray-100 text-lg md:text-xl font-normal leading-relaxed max-w-150 mx-auto">
                Conectando consumidores conscientes con productores locales apasionados para construir un futuro más fresco, justo y sostenible para todos.
              </h2>
            </div>
            <button className="mt-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-[#27fc8e] hover:bg-primary/90 text-base font-bold leading-normal tracking-[0.015em] transition-all transform hover:scale-105 shadow-lg shadow-primary/30 z-5">
              <span className="truncate">Leer nuestra historia</span>
            </button>
          </div>
        </div>
        {/* Intro Text Section */}
        <div className="w-full max-w-full px-6 py-16 md:py-24 flex flex-col items-center text-center bg-gray-100">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full">
            <span className="text-3xl bg-gray-200 rounded-full h-12 w-12 items-center justify-center flex"><Image src="/favorite.svg" alt="Favorite icon" width={26} height={26} /></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">El Corazón de LocalTaste</h2>
          <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed max-w-150">
            Nuestra misión es empoderar a los productores locales y llevar comida real a tu mesa. Creemos firmemente en un futuro donde la logística alimentaria es <span className="font-bold text-[#27fc8e]">cero residuos</span>, <span className="font-bold text-[#27fc8e]">hiper-local</span> y <span className="font-bold text-[#27fc8e]">justa</span> para todos los involucrados en la cadena.
          </p>
        </div>
        {/* Vision Split Section */}
        <div className="w-full bg-white py-16 md:py-24 border-y border-[#e7f3ec]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-auto md:h-125">
              <Image
                src="/hero-vis.png"
                alt="Fresh vegetables in a basket"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-6">
              <h3 className="font-bold uppercase tracking-wider text-sm text-[#27fc8e]">Nuestra Visión</h3>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Un sistema alimentario transparente</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Imaginamos un mundo donde sabes exactamente de dónde viene tu comida. No más etiquetas confusas ni viajes de miles de kilómetros.
              </p>
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex items-center gap-3">
                  <Image src="/CheckCircle.svg" alt="check icon" width={24} height={24} />
                  <span className="font-medium">Precios justos para quien cultiva</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src="/CheckCircle.svg" alt="check icon" width={24} height={24} />
                  <span className="font-medium">Frescura garantizada (cosechado ayer)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src="/CheckCircle.svg" alt="check icon" width={24} height={24} />
                  <span className="font-medium">Impacto ambiental reducido</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Values Grid Section */}
        <div className="w-full max-w-7xl px-6 py-16 md:py-24 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-150">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Nuestros Valores</h2>
              <p className="text-gray-600 text-lg">Los pilares que sostienen cada entrega y cada relación en nuestra plataforma.</p>
            </div>
            <button className="hidden md:flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-base font-bold transition-colors">
              <span className="truncate bg-[#27fc8e] rounded-4xl px-4 py-2">Conoce a nuestros productores</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="flex relative flex-col w-72 gap-4 p-4 rounded-2xl bg-[#e6f9e9]/50 border border-green-300/50 hover:shadow-lg hover:scale-115 transition-all ease-in-out duration-400">
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                <span className="flex items-center justify-center bg-green-300/30 rounded-full w-10 h-10">
                  <img src="/Favorite.svg" alt="Heart Icon" className="w-6 h-6" />
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold leading-tight">Apoyo Local</h3>
                <p className="text-gray-600 text-base">
                  Comercio justo para los agricultores, asegurando que reciban el valor que merecen por su duro trabajo y dedicación a la tierra.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex relative flex-col w-72 gap-4 p-4 rounded-2xl bg-[#e6f9e9]/50 border border-green-300/50 hover:shadow-lg hover:scale-115 transition-all ease-in-out duration-400">
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                <span className="flex items-center justify-center bg-green-300/30 rounded-full w-10 h-10">
                  <img src="/leaf.svg" alt="Leaf Icon" className="w-8 h-8" />
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold leading-tight">Sostenibilidad</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Reducción drástica de la huella de carbono mediante cadenas de suministro cortas, eficientes y empaques mínimos.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="flex relative flex-col w-72 gap-4 p-4 rounded-2xl bg-[#e6f9e9]/50 border border-green-300/50 hover:shadow-lg hover:scale-115 transition-all ease-in-out duration-400">
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                <span className="flex items-center justify-center bg-green-300/30 rounded-full w-10 h-10">
                  <img src="/Community.svg" alt="Community Icon" className="w-6 h-6" />
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold leading-tight">Comunidad</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Conoce exactamente quién cultivó tu comida. Fomentamos relaciones reales y fortalecemos la economía de tu zona.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 md:hidden flex justify-center">
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-text-dark text-base font-bold transition-colors">
              <span className="truncate">Conoce a nuestros productores</span>
            </button>
          </div>
        </div>
        {/* Quote Section */}
        <div className="w-full bg-green-950 py-20 px-6">
          <div className="max-w-200 mx-auto text-center flex flex-col gap-8">
            <span className="text-5xl opacity-50 items-center justify-around flex"><Image src="/Quotes.svg" alt="Quote Icon" width={40} height={40} /></span>
            <h3 className="text-2xl text-green-50 md:text-4xl font-display font-medium italic">
              "No vendemos solo alimentos, entregamos salud, confianza y un pedazo de nuestra tierra en cada caja. LocalTaste ha transformado cómo nos conectamos con nuestros vecinos."
            </h3>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="w-15 h-15 rounded-full overflow-hidden">
                <Image
                  src="/user4.png"
                  alt="User Photo"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-green-50">María González</p>
                <p className="text-sm text-[#27fc8e]/60">Productora Orgánica, Finca El Roble</p>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="w-full max-w-7xl px-6 py-20 bg-gray-50">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-20 text-center border bg-[#27fc8e]/20 border-[#27fc8e]/30 shadow-lg">
            {/* Background decoration */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-[#27fc8e]/30"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-[#27fc8e]/30"></div>
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-175 mx-auto p-8">
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Únete al movimiento de comida real</h2>
              <p className="text-gray-600text-lg mb-4">
                Empieza hoy a disfrutar de productos frescos mientras apoyas a tu comunidad. Tu primera cesta te está esperando.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button className="px-4 py-2 bg-[#2BEE7C] font-bold text-bs rounded-full hover:text-[#1fa356] hover:bg-green-50 active:scale-95 cursor-pointer transition-all duration-500">
                  Explorar Mercado
                </button>
                <button className="px-4 py-2 hover:bg-[#2BEE7C] font-bold  text-base text-[#1fa356] bg-green-100 hover:text-black rounded-full active:scale-95 cursor-pointer transition-all duration-500">
                  Soy Productor
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}