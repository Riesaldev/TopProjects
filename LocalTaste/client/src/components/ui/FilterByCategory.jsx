


export default function FilterByProducer () {
  return (
    <>
      {/* Categories Filter */}
      <div className="p-5 rounded-2xl border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold">Categorías</h3>
          <button className="text-xs font-medium hover:underline">Limpiar</button>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all" type="checkbox" />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </span>
            </div>
            <span className="text-sm text-gray-600 transition-colors">Frutas y Verduras</span>
            <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full">24</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input className="h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all" type="checkbox" />
              <span className="absolute opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </span>
            </div>
            <span className="text-sm text-gray-600 transition-colors">Lácteos y Huevos</span>
            <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full">12</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all" type="checkbox" />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </span>
            </div>
            <span className="text-sm text-gray-600 transition-colors">Panadería Artesanal</span>
            <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full">8</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all" type="checkbox" />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </span>
            </div>
            <span className="text-sm text-gray-600 transition-colors">Carnes y Embutidos</span>
            <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full">5</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all" type="checkbox" />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </span>
            </div>
            <span className="text-sm text-gray-600 transition-colors">Miel y Mermeladas</span>
            <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full">18</span>
          </label>
        </div>
      </div>
    </>
  );
}