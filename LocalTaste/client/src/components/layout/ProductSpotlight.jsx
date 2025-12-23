import ProductCard from "../ui/ProductCard";


export default function ProductSpotlight () {
  return (
    <section className="w-full px-4 md:px-40 py-16 flex justify-center bg-gray-100">
      <div className="flex flex-col max-w-275 w-full gap-8">
        <div className="flex justify-between items-end px-2">
          <div>
            <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight">Productos Frescos de Temporada</h2>
            <p className="text-gray-500 mt-2 text-sm">Cosechados ayer, entregados hoy.</p>
          </div>
          <a className="text-[#2BEE7C] font-bold text-sm hover:underline flex items-center gap-1" href="#">
            Ver todo
            <img src="/arrow.svg" alt="Arrow Right" className="w-4 h-4" />
          </a>
        </div>
        <div className="">
          {/* carousel de productos */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
}