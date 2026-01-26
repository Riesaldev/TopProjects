


export default function Hero () {
  return (
    <section className="w-full px-4 md:px-10 py-6 md:py-10 flex justify-center bg-gray-100">
      <div className="w-11/12 bg-[url('/Hero2.avif')] bg-cover bg-center rounded-xl">
        <div className="rounded-xl overflow-hidden relative min-h-140 flex flex-col items-center md:p-16 text-center bg-green-950/40" data-alt="Fresh vegetables and fruits at a vibrant farmers market" >
          <div className="flex flex-col gap-4 max-w-3xl my-6 animate-fade-in-up  p-6 rounded-lg">
            <h1 className="text-green-500 pb-6 text-4xl md:text-6xl font-black drop-shadow-sm">
              Del campo a tu mesa,<br /> sin intermediarios
            </h1>
            <h2 className="text-green-100 text-2xl font-sans font-bold  drop-shadow-sm max-w-2xl mx-auto">
              Apoya a los productores locales y disfruta de alimentos frescos y de temporada. Personaliza tu cesta semanal o compra a la carta.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center w-full mt-4">
            <a href="/products" className="px-4 py-2 bg-[#2BEE7C] font-bold text-sm rounded-full hover:bg-primary hover:text-[#1fa356] hover:bg-green-50 cursor-pointer transition-all duration-500">
              Explorar Mercado
            </a>
            <a href="/#" className="px-4 py-2 hover:bg-[#2BEE7C] font-bold  text-sm text-[#1fa356] bg-green-50 hover:text-black rounded-full hover:bg-primary hover:text-primary cursor-pointer transition-all duration-500">
              Suscribirse y Ahorrar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
