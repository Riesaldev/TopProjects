import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HistoryPage () {
  return (
    <>
      <Header />
      {/* Main Content */}
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-300 px-4 py-10 md:py-20">
          <div className="@container">
            <div className="flex min-h-130 flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-3xl items-center justify-center p-8 text-center relative overflow-hidden group shadow-2xl"
              data-alt="Beautiful aerial view of organic crop fields at sunrise"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFgZZDmah0EmNnAXq3xWc_GSeRByP2JasgaZNHk577ENuCRXv0NYuLAW5Wq0g4QzDLjcTCExD7GPE68wqiwWLcPKSk14J760X_ab4Y5H8_EOUkL_2H_2fLP66CpDPrWIw7nhhBPRJ3YgiO59RSM_iyei8KiQ6XDFAKHfoQ7NmOIBi76Vu_jJrL1EwKNvrIyyclOCciVz1IbjTSzpqtOevBHCVWmpKbxwJTOsMeNNo7umK1RIDx4gvEW2e-SKaMklIHC2K5UaWouMYk")'
              }}>
              <div className="flex flex-col gap-4 max-w-2xl relative z-10">
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                  Sembrando el Futuro de la Alimentación Local
                </h1>
                <p className="text-lg md:text-xl font-normal leading-relaxed">
                  Nuestra historia no empezó en una oficina, sino en un mercado local un domingo por la mañana, observando el esfuerzo de manos trabajadoras que merecían una mejor conexión con su comunidad.
                </p>
              </div>
              <div className="absolute bottom-8 animate-bounce">
                <span className="text-4xl">expand_more</span>
              </div>
            </div>
          </div>
        </section>
        {/* Intro Text */}
        <section className="max-w-3xl px-6 text-center py-12">
          <h2 className="font-bold text-sm uppercase tracking-widest mb-4">Nuestro Origen</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">Cerrando la brecha entre el campo y tu mesa</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            LocalTaste nació de una observación simple pero poderosa: la frescura del campo se perdía en interminables cadenas de suministro. Queríamos devolver el protagonismo a quienes trabajan la tierra, creando un puente tecnológico que respete los tiempos de la naturaleza.
          </p>
        </section>
        {/* Image Grid */}
        <section className="w-full max-w-275 px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-150 md:h-80">
            <div className="md:col-span-2 rounded-2xl bg-cover bg-center shadow-lg transition-transform hover:scale-[1.02]"
              data-alt="A young farmer holding a basket of fresh vegetables"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrCIf4FZXnCg_HMguT228bHGw4PH0ZIuDHMKzLiHsfWRy9l9G0tlhuu1HcBZREytFB97mjjeysd6elQcwibiUk3pyyyL99rj22OEKT7sNf1_t8e9R8uUuyl2WPbPbsudIeFGpXk67ubccOzKLCn6wKg78x5kcjrN_8jIkwBzxXEiOxZjog39Hw36tOQAqO17SPyPk5yWIW0jumFTKm9BOX-uMwUJYjeBOvmq-zlbYtPS5d3dzJoWYU-UvddcitK7lVpRk-YPUFVXnf")'
              }}>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-2xl bg-cover bg-center shadow-lg transition-transform hover:scale-[1.02]"
                data-alt="Hands sorting fresh ripe tomatoes in a crate" style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCHU_JezrNqdZTiDuC2yKliS7mbOLtwB-1HYUu6FwunUjNdu82NV1D97F5voLLYy7lCf_NLBCTsuOsQLMI9GluEG0eWeFtt-_4WSEtZuax9PL7Nob-xvxCw5qwENUtp5sVnMAbFvBntGSFh8A4p25OIQi6YUWctiFNHVCpmY_AGJIiyi6p7QgSVK8D9RBQ5tRYvYa7VfxxbrH7GM2-mAyuGwRQQH9-pG-dml7M0qe9hqe1KR3GRYYGrFBf1M3vEfbFuWyZTmOFER6n");'
                }}>
              </div>
              <div className="rounded-2xl bg-cover bg-center shadow-lg transition-transform hover:scale-[1.02]" data-alt="Modern mobile phone showing a marketplace app with fruits" style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPwwfK5zf2EwYcypGgajmfSKH7q4z-a3xsaR8PPxBbVqYL-NbR1-ZP_1uff-LzEd3UfxClaAscjbt8ZS38WxGhzDS3AI6jUj97cXs9uY6IX9e2tbWT6HyiNRQjQaY-wa9NoTdJsM4pL9sxR44FJX7wUyE3t4bCxQa46Wcarifw78t2-X2RAMfbrlr6YN22ICR-hAuCc4XDOQwsCcWOV18UptDbFCCzFVpIfyQ4kp75ZMeEbwBwUWmPNlQQG7Xjf2kCR875uhoWcktY");'
              }}>
              </div>
            </div>
          </div>
        </section>
        {/* Timeline Section */}
        <section className="w-full max-w-275 px-6 py-24 relative">
          <div className="timeline-line opacity-20 hidden md:block"></div>
          <div className="space-y-24">
            {/* Milestone 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-1/2 md:text-right">
                <span className="text-5xl font-black opacity-40 mb-2 block">2021</span>
                <h4 className="text-2xl font-bold mb-3">La Chispa Inicial</h4>
                <p className="text-gray-600">Todo comenzó con un viaje por las regiones agrícolas. Descubrimos que los productores recibían una fracción mínima del precio final. Decidimos que la tecnología podía cambiar eso.</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12  rounded-full z-10 shadow-lg  group-hover:scale-125 transition-transform">
                <span className="text-[#0d1b13]">lightbulb</span>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl" data-alt="Founders brainstorming in a small rustic office">
                  <img alt="Brainstorming" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnJuvr8Y-avQCcPeUi3KSDX5Owa2IRG6Z0GY1L9W1DPOOOKEIZZIJ_obRLkeyj6jUDReBaWDeRkdP2NGB_HQzY-7kTOTzXMBBBnQoDL13yn_ukASlvPC4AGodYxJTzlPKB-iDZVnPV1M9KS3MEuOuFVv1aliG4aX2RJIiz6_aMaxaF98IASiAAfn66wLL8y7lIJ3D83lKyOiQYFwsLwn_AU_eOcmb5smBeHzFmCARJLt9WlYVVktNtJl-dl-nj4yHqhvQ3FJqQLBAB" />
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
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12  rounded-full z-10 shadow-lg  group-hover:scale-125 transition-transform">
                <span className="text-[#0d1b13]">rocket_launch</span>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl" data-alt="Small group of farmers celebrating together">
                  <img alt="First farmers group" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt03TyIQ9NckuGmdw3j26LR3pGbU5n4hzW6647x7iuGQeGBjHaj33uys7fBAXcAa5u1mBJSgeyPn5kK_wOoq6GUS1-mcknlSVxBlVFcBWAuwdaLVI-IiX71C7b5OO-rQaqnJ7gifEbqxzGWHA8xd3gGbEvlCLyhUwrgww58GtK2EIx5fBi8DKN0wJRz4R9Klz_HWpxBHV4ocbd1mHj72x4E0nz97gpnQa5sRQ42s9z_fgEl7RyOD6SNMdkoqkwg9FWvUiSr7GZAEU_" />
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
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12  rounded-full z-10 shadow-lg  group-hover:scale-125 transition-transform">
                <span className="text-[#0d1b13]">group</span>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video  rounded-2xl overflow-hidden shadow-xl" data-alt="Warehouse with eco-friendly packaging being prepared">
                  <img alt="Sustainable packaging" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbaTmC6Qt84VjVCQvUWs-m2oB-X91KCwwHpRDdFF_yZKgKKfNZNXI_-k4ntVNYxaBhPqrLuuFHLXO8pwC1zApJH6L8S7vaMrH-VNVvxbWIIc7ncbr5L0ry_vPwdYaeC8mBUwQIi-Z7u_cnYbs99PoNNtesAXWtfsGJQ2YnnSDMwCP_miuPQIuvhLjZDHR-3mGEyemeSnSTY-41OtYCoU8VCeQ3rabS8M1CgvAWtJe7i2sZIQMwyoFgqS38K1Hy7S6CkVY1P8WDvlZC" />
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