import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HistoryPage () {
  return (
    <>
      <Header />
      {/* Main Content */}
      <main className="flex h-full grow flex-col items-center bg-gray-100">
        {/* Hero Section */}
        <section className="w-full max-w-8xl p-4 lg:p-8">
          <div className="relative flex min-h-140 flex-col gap-8 overflow-hidden rounded-2xl items-center justify-center text-center px-6 py-20 md:py-32 lg:py-40 shadow-lg">
            <Image
              src="/hero-his.png"
              alt="Aerial view of crop fields at sunrise"
              width={1200}
              height={800}
              className="absolute inset-0 h-full w-full object-cover rounded-2xl brightness-60 z-0"
            />
            <div className="flex flex-col gap-4 max-w-2xl relative z-10">
              <h1 className="text-4xl md:text-6xl text-green-50 font-black leading-tight tracking-[-0.033em]">
                Sembrando el Futuro de la Alimentación Local
              </h1>
              <p className="text-lg md:text-xl text-green-50 font-normal leading-relaxed">
                Nuestra historia no empezó en una oficina, sino en un mercado local un domingo por la mañana, observando el esfuerzo de manos trabajadoras que merecían una mejor conexión con su comunidad.
              </p>
            </div>
            <div className="absolute bottom-8 animate-bounce z-10">
              <span className="text-4xl">
                <Image
                  src="/arrowB.svg"
                  alt="Down Arrow"
                  width={32}
                  height={32}
                  className="-rotate-90"
                />
              </span>
            </div>
          </div>
        </section>
        {/* Intro Text */}
        <section className="w-full max-w-full px-6 text-center py-12 bg-gray-100">
          <h2 className="font-bold text-sm text-[#27fc8e] uppercase tracking-wider mb-4">Nuestro Origen</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">Cerrando la brecha entre el campo y tu mesa</h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-150 mx-auto">
            LocalTaste nació de una observación simple pero poderosa: la frescura del campo se perdía en interminables cadenas de suministro. Queríamos devolver el protagonismo a quienes trabajan la tierra, creando un puente tecnológico que respete los tiempos de la naturaleza.
          </p>
        </section>
        {/* Image Grid */}
        <section className="w-full max-w-275 px-6 py-12 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <Image
                src="/grid1.png"
                alt="A young farmer holding a basket of fresh vegetables"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-80 md:h-96">
              <div className="rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                <Image
                  src="/grid2.png"
                  alt="Hands sorting fresh ripe tomatoes in a crate"
                  width={300}
                  height={190}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                <Image
                  src="/grid3.png"
                  alt="Modern mobile phone showing a marketplace app with fruits"
                  width={300}
                  height={190}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Timeline Section */}
        <section className="w-full max-w-275 px-6 py-24 bg-gray-100">
          <div className="relative space-y-24">
            {/* Línea vertical central */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2 hidden md:block"></div>

            {/* Milestone 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-1/2 md:text-right">
                <span className="text-5xl font-black opacity-40 mb-2 block">2021</span>
                <h4 className="text-2xl font-bold mb-3">La Chispa Inicial</h4>
                <p className="text-gray-600">Todo comenzó con un viaje por las regiones agrícolas. Descubrimos que los productores recibían una fracción mínima del precio final. Decidimos que la tecnología podía cambiar eso.</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-[#27fc8e] rounded-full z-10 shadow-lg group-hover:scale-125 transition-transform">
                <Image src="/lightbulb.svg" alt="Lightbulb Icon" width={24} height={24} />
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <Image alt="Brainstorming" width={600} height={400} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="/milestone1.png" />
                </div>
              </div>
            </div>
            {/* Milestone 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-12 group">
              <div className="w-full md:w-1/2 md:text-left">
                <span className="text-5xl font-black opacity-40 mb-2 block">2022</span>
                <h4 className="text-2xl font-bold mb-3">La Primera Cosecha</h4>
                <p className="text-gray-600">Lanzamos nuestra versión beta con solo 5 productores locales. El apoyo de la comunidad fue inmediato y abrumador, validando nuestra visión de un mercado más justo.</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-[#27fc8e] rounded-full z-10 shadow-lg group-hover:scale-125 transition-transform">
                <Image src="/rocket.svg" alt="Rocket Icon" width={24} height={24} />
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <Image alt="First farmers group" width={600} height={400} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="/milestone2.png" />
                </div>
              </div>
            </div>
            {/* Milestone 3 */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-1/2 md:text-right">
                <span className="text-primary text-5xl font-black opacity-40 mb-2 block">2023</span>
                <h4 className="text-2xl font-bold mb-3">Creciendo Juntos</h4>
                <p className="text-gray-600 dark:text-gray-400">Superamos los 100 productores activos y expandimos nuestro alcance a 15 ciudades. Empezamos a medir no solo ventas, sino impacto ambiental y social.</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-[#27fc8e] rounded-full z-10 shadow-lg group-hover:scale-125 transition-transform">
                <span className="text-[#0d1b13]">group</span>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video  rounded-2xl overflow-hidden shadow-xl" data-alt="Warehouse with eco-friendly packaging being prepared">
                  <img alt="Sustainable packaging" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="/milestone3.png" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Quote/Founder Section */}
        <section className="w-full py-24 flex justify-center">
          <div className="max-w-4xl px-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-8 border-4" data-alt="Profile photo of the founder, a smiling woman in casual attire">
              <img alt="Founder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxJmEIOkN3gyNbHr7f7QQmJBWY9x7CARnamCvP1fuMfRqiI5vtW7nas3YMPdD2zjXoBOZX2l2jtMM6RURJTn9RvUsxSmQ7sNd21hkmwiZWvwxgTUxBtIdQRWMWcb6N9DobN5pXx_cIgaUpJatIyBzdcpqPcolecs0_kX87Vmy7Wi2B3Ohk6uQ6IFRM4TAVWrHz1yWbTYF8T1HWV-f7CU3707JIyc57Yll9o7TGo8LmY3yV_bAq42JqH5ia2g_0JesKR-W_A_jqMOvz" />
            </div>
            <span className="text-5xl mb-4">format_quote</span>
            <p className="text-2xl md:text-3xl font-medium italic text-[#0d1b13]  leading-relaxed mb-8">
              "LocalTaste no es solo una plataforma de ventas; es un movimiento que busca reconciliar a la ciudad con la tierra, asegurando que el agricultor sea valorado como el héroe que realmente es."
            </p>
            <div>
              <h5 className="font-bold text-xl">Elena Martínez</h5>
              <p className="font-medium">Fundadora &amp; CEO</p>
            </div>
          </div>
        </section>
        {/* Impact Stats */}
        <section className="w-full max-w-275 px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black  mb-2">+250</p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Productores Locales</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black  mb-2">15k</p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Familias Alimentadas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black  mb-2">30%</p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Menos Desperdicio</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black  mb-2">+20</p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Comunidades Rurales</p>
            </div>
          </div>
        </section>
        {/* CTA Final */}
        <section className="w-full max-w-275 px-4 py-20">
          <div className=" rounded-4xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64  blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Sé parte de los próximos capítulos</h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto">
                Cada compra que realizas apoya directamente a un productor y fortalece la economía de nuestras regiones. ¿Empezamos hoy?
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className=" font-bold py-4 px-10 rounded-xl hover:scale-105 transition-transform">Explorar el Mercado</button>
                <button className="bg-white/10 hover:bg-white/20 font-bold py-4 px-10 rounded-xl transition-colors backdrop-blur-sm">Conocer Productores</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}