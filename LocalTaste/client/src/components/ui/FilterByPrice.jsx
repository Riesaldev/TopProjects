


export default function FilterByProducer () {
  return (
    <>
      {/*Price Filter */}
      <div className="p-5 rounded-2xl border">
        <h3 className="text-base font-bold mb-4">Rango de Precio</h3>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs">$</span>
            <input className="w-full h-9 pl-6 pr-2 rounded-lg border text-sm focus:ring-1 outline-none" type="number" />
          </div>
          <span>-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs">$</span>
            <input className="w-full h-9 pl-6 pr-2 rounded-lg border text-sm focus:ring-1 outline-none" type="number" value="50" />
          </div>
        </div>
        <input className="w-full mt-4 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" type="range" />
      </div>
    </>
  );
}