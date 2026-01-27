


export default function FilterByProducer () {
  return (
    <>
      {/* Main Search Bar */}
      <div className="mb-6">
        <div className="flex w-full items-center rounded-2xl border p-2 shadow-sm focus-within:ring-2 focus-within:border-transparent transition-all">
          <div className="flex items-center justify-center pl-4 pr-2">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input className="w-full bg-transparent border-none focus:ring-0 text-base h-10" placeholder="Buscar manzanas, miel, queso artesanal..." />
          <button className="font-bold py-2 px-6 rounded-xl transition-colors hidden sm:block">
            Buscar
          </button>
        </div>
      </div>
      {/* Chips / Quick Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold shadow-sm ring-1">
          Todos
        </button>
        <button className="shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all">
          🌱 Orgánico
        </button>
        <button className="shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all">
          🧀 Sin Lactosa
        </button>
        <button className="shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all">
          🥖 Sin Gluten
        </button>
        <button className="shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all">
          🥑 Vegano
        </button>
        <button className="shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all">
          ⭐ Mejor Valorados
        </button>
      </div>
    </>
  );
}