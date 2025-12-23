


export default function HowItWorks () {
  return (
    <section className="w-full px-4 md:px-40 py-16 flex justify-center bg-white">
      <div className="flex flex-col max-w-7xl w-full gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Cómo funciona LocalTaste</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Tres simples pasos para comer mejor y apoyar a tu comunidad.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex relative flex-col w-84 gap-4 p-6 rounded-2xl bg-[#e6f9e9]/50 border border-green-300/50 hover:shadow-lg hover:scale-115 transition-all ease-in-out duration-400">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center">
              <span className="flex items-center justify-center bg-green-300/30 rounded-full w-10 h-10">
                <img src="/SolidStore.svg" alt="Store Icon" className="w-6 h-6" />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-green-900">Elige a tus Productores</h3>
              <p className="text-[#4c9a6c] text-sm leading-relaxed">Navega por perfiles de granjas locales cercanas a ti y selecciona tus favoritos.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex relative flex-col w-84 gap-4 p-6 rounded-2xl bg-[#e6f9e9]/50 border border-green-300/50 hover:shadow-lg hover:scale-115 transition-all ease-in-out duration-400">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center">
              <span className="flex items-center justify-center bg-green-300/30 rounded-full w-10 h-10">
                <img src="/SolidStore.svg" alt="Store Icon" className="w-6 h-6" />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-green-900">Personaliza tu Cesta</h3>
              <p className="text-[#4c9a6c] text-sm leading-relaxed">Mezcla y combina productos o elige una cesta sorpresa de temporada cada semana.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex relative flex-col w-84 gap-4 p-6 rounded-2xl bg-[#e6f9e9]/50 border border-green-300/50 hover:shadow-lg hover:scale-115 transition-all ease-in-out duration-400">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center">
              <span className="flex items-center justify-center bg-green-300/30 rounded-full w-10 h-10">
                <img src="/SolidStore.svg" alt="Store Icon" className="w-6 h-6" />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-green-900">Recibe en tu Puerta</h3>
              <p className="text-[#4c9a6c] text-sm leading-relaxed">Entregas semanales flexibles y ecológicas directamente desde la granja a tu hogar.</p>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}