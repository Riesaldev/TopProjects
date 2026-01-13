


export default function Newsletter () {
  return (
    <section className="w-full px-4 md:px-10 py-16 text-white bg-green-950">
      <div className="max-w-240 mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="text-3xl font-bold">Únete al movimiento de comida real</h2>
          <p className="text-gray-300">Recibe noticias de temporada, recetas exclusivas y ofertas de productores locales directamente en tu correo.</p>
        </div>
        <div className="flex-1 w-full max-w-md">
          <form className="flex flex-col sm:flex-row gap-3">
            <input className="flex-1 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Tu correo electrónico" type="email" />
            <button className="px-4 py-2 text-[#234e35] bg-[#2BEE7C] font-bold text-sm rounded-2xl hover:text-[#9fecbf] hover:bg-[#2BEE7C]/10 cursor-pointer transition-all duration-500" type="button">
              Suscribirme
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">Respetamos tu privacidad. Date de baja cuando quieras.</p>
        </div>
      </div>
    </section>
  );
}