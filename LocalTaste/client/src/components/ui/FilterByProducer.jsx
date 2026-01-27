


export default function FilterByProducer () {
  return (
    <>
      {/* Filter by Producer (Reusing TextField style) */}
      <div className="p-5 rounded-2xl border border-green-200 bg-green-50 brightness-105">
        <label className="block mb-3">
          <span className="text-base font-bold">Buscar Productor</span>
        </label>
        <div className="relative text-green-950">
          <input className="w-full h-12 bg-green-100  rounded-4xl border px-4 text-sm focus:ring-2 focus:border-transparent outline-none transition-all" placeholder="Ej. Granja El Sol..." type="text" />
          <div className="absolute right-3 top-3">
            <span className="material-symbols-outlined text-xl">
              <svg className="h-5 w-5 text-green-800 brightness-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  )
};