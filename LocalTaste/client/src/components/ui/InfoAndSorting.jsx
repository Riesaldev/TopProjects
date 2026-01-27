


export default function InfoAndSorting () {
  return (
    <>
      {/* Results Info & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-sm font-medium">Mostrando <span className="font-bold">12</span> de <span className="font-bold">48</span> productos</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Ordenar por:</span>
          <select className="border-none text-sm font-bold rounded-lg focus:ring-0 cursor-pointer py-1 pl-2 pr-8">
            <option>Relevancia</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Recién Cosechado</option>
          </select>
        </div>
      </div>
    </>
  );
}