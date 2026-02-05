
import ProductCard from "../ui/SpotlightCard";
import products from '../../data/productsMain.json';


export default function ProductSpotlight () {
  return (
    <section className="w-full px-4 md:px-40 py-16 flex justify-center bg-gray-100">
      <div className="flex flex-col max-w-275 w-full gap-8">
        <div className="flex justify-between items-end px-2">
          <div>
            <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight">Productos Frescos de Temporada</h2>
            <p className="text-gray-500 mt-2 text-lg">Cosechados ayer, entregados hoy.</p>
          </div>
          <a className="text-[#2BEE7C] font-bold text-lg leading-tight hover:underline flex items-center gap-1" href="#">
            Ver todo
            <img src="/Arrow.svg" alt="Arrow Right" className="w-4 h-4" />
          </a>
        </div>
        <div>
          {/* carousel de productos */}
          <div className="flex overflow-x-auto pb-4 px-8 justify-around gap-3">
            {products.map( product => (
              <ProductCard key={product.id} product={product} alt={product.name} />
            ) )}
          </div>
        </div>
      </div>
    </section>
  );
}