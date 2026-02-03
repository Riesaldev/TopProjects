

export default function ProducersPage () {
  return (
    <>
      {/* Sidebar / Filtros */}
      <aside className="w-full lg:w-64 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e7f3ec]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Filtros</h3>
            <button className="text-xs font-bold uppercase tracking-wider">Limpiar</button>
          </div>
          {/* Tipo de Producción */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Producción</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input defaultChecked className="h-5 w-5 rounded border-[#cfe7d9] dark:border-[#1a3324] bg-transparent text-primary focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox" />
                <span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Ecológica</span>
              </label>
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input className="h-5 w-5 rounded border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox" />
                <span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Artesanal</span>
              </label>
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input className="h-5 w-5 rounded border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox" />
                <span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Tradicional</span>
              </label>
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input className="h-5 w-5 rounded border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox" />
                <span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Biodinámica</span>
              </label>
            </div>
          </div>
          {/* Distancia Slider */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Cercanía</span>
            </div>
            <div className="relative flex w-full flex-col items-start gap-3 py-2">
              <p className="text-[#0d1b13] text-xs">Distancia máxima: <span className="font-bold">50 km</span></p>
              <div className="flex h-2 w-full pt-1">
                <div className="flex h-1.5 w-full rounded-full bg-[#cfe7d9] relative">
                  <div className="absolute left-0 top-0 h-full w-3/4 rounded-full"></div>
                  <div className="absolute left-[75%] -top-1.5 size-4 rounded-full shadow-md border-2 border-white cursor-pointer"></div>
                </div>
              </div>
              <div className="flex justify-between w-full text-[10px] text-[#4c9a6c]">
                <span>0 km</span>
                <span>100 km</span>
              </div>
            </div>
          </div>
          {/* Valoración Radio */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Valoración</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] hover:bg-[#e7f3ec] cursor-pointer transition-colors">
                <input defaultChecked className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--radio-dot-svg]" name="rating" type="radio" />
                <span className="text-[#0d1b13] text-sm font-medium">4+ Estrellas</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] hover:bg-[#e7f3ec] cursor-pointer transition-colors">
                <input className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--radio-dot-svg]" name="rating" type="radio" />
                <span className="text-[#0d1b13] text-sm font-medium">3+ Estrellas</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] hover:bg-[#e7f3ec] cursor-pointer transition-colors">
                <input className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--radio-dot-svg]" name="rating" type="radio" />
                <span className="text-[#0d1b13] text-sm font-medium">Todas</span>
              </label>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}