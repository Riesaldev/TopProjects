
import Header from "@/components/layout/Header";
import MiniFooter from "@/components/layout/MiniFooter";
import FilterByProducer from "@/components/ui/FilterByProducer";
import FilterByCategory from "@/components/ui/FilterByCategory";
import FilterByPrice from "@/components/ui/FilterByPrice";
import FilterByProduct from "@/components/ui/FilterByProduct";
import InfoAndSorting from "@/components/ui/InfoAndSorting";
import Pagination from "@/components/ui/Pagination";

import ProductCard from "@/components/layout/products/ProductCard";
import products from "@/data/products.json";

export default function ProductsPage () {
  return (
    <>
      <Header />
      {/* Page Content */}
      <main className="max-w-8xl mx-auto bg-green-50 px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
        {/* Page Heading */}
        <div className="mb-2  p-6 text-left">
          <h2 className="text-4xl font-black mb-2 text-green-950">
            Explora Productos Locales
          </h2>
          <p className="text-lg max-w-2xl text-green-600">
            Encuentra alimentos frescos y apoya a los productores de tu comunidad.<br /> Desde la granja directamente a tu mesa.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <FilterByProducer />
            <FilterByCategory />
            <FilterByPrice />
          </aside>
          {/* Main Content Area */}
          <section className="flex-1 min-w-0">
            <FilterByProduct />
            <InfoAndSorting />
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 row-auto  justify-around mb-8 gap-3">
              {products.map( product => (
                <ProductCard key={product.id} product={product} />
              ) )}
            </div>
            <Pagination />
          </section>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}