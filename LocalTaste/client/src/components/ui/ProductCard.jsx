


export default function ProductCard () {
  return (
    <div className="w-44 h-72 bg-white rounded-3xl shadow-md">
      <div className="w-full h-1/2 bg-[url('/hero.avif')] bg-center bg-cover rounded-t-2xl mb-2">
        <span className="bg-white px-2 py-1 rounded-md text-xs font-semibold absolute mt-2 ml-2 shadow-md">
          tipo
        </span>
      </div>
      <div className="px-4 justify-around flex flex-col h-1/2 pb-4">
        <p className="text-xs text-gray-400 mb-2">Ubicacion</p>
        <h1 className="font-semibold text-lg">Producto Fresco</h1>
        <div className="flex justify-between items-center mt-4">
          <p className="text-[#2BEE7C] font-black text-sm">€Precio</p>
          <button className=" rounded-full bg-gray-200 px-2 py-0.5 cursor-pointer">+</button>
        </div>
      </div>
    </div>
  )
}