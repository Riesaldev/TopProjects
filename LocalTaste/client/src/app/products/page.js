import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function ProductsPage () {
  return (
    <>
      <Header />
      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-black tracking-tighter mb-2">
            Explora Productos Locales
          </h2>
          <p className="text-lg max-w-2xl">
            Encuentra alimentos frescos y apoya a los productores de tu comunidad. Desde la granja directamente a tu mesa.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* Filter by Producer (Reusing TextField style) */}
            <div className="p-5 rounded-2xl border">
              <label className="block mb-3">
                <span className="text-base font-bold">Buscar Productor</span>
              </label>
              <div className="relative">
                <input className="w-full h-12 rounded-xl border px-4 text-sm focus:ring-2 focus:border-transparent outline-none transition-all" placeholder="Ej. Granja El Sol..." type="text" />
                <div className="absolute right-3 top-3">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
              </div>
            </div>
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
          </aside>
          {/* Main Content Area */}
          <section className="flex-1 min-w-0">
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
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group relative flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Manzanas rojas frescas apiladas en una cesta de madera bajo luz natural" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Fresh red apples in a basket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwVBxTdlyYXSJfYrNyaUCI7N_VKZD6A93cXfO71rpEPiLGpJiuXdO5Ur5OcjIP1XbR9oTmOnPmB3CP1Y79dztpaZaysgCTWej5tfq16B6zkrmggTHdflPfFX1RWyR7Y1DI-8-qkKaI5BfUYMX-q6gte84kckaSTnROCRNljPa73pxp1Cj17m-3VH0rwiTOFNpo-CVeB230PprFX93lUnPyXkW4ao1bI6w-z-3X_KdnZa5fi0XRFsxZwhY2uRYUbl-tOgLNyCFYmINj" />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm">
                    <span class="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <div className="absolute bottom-3 left-3 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-xs font-bold">Cosecha de Hoy</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">Manzanas Royal Gala</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-sm icon-filled">star</span>
                      <span className="text-xs font-bold">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2 hover:underline cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    Huerto San José
                  </p>
                  <p className="text-sm line-clamp-2 mb-4">
                    Dulces, crujientes y cultivadas sin pesticidas. Perfectas para meriendas escolares.
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-xs line-through">$3.00</span>
                      <span className="text-lg font-bold">$2.50 <span className="text-xs font-normal">/ kg</span></span>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/*Card 2 */}
              <div className="group relative flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Queso artesanal redondo sobre tabla de madera con hierbas" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Artisanal cheese wheel on wood" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv6RnFVy9sj30IOaCIJo0ZXod40WWb98HtRQrKUUcZ_d2eBh8De53wp_-TaJ2fHvXfs_PnETwjUVZLMwneIlHMLQdQEj1wJZTKUBeteM9NNLFMgOz5qICdNa8TPJ8mzJbK-Sdq9WOPAPSrh4PloOS4sj4du16BFprnaLJmGeEdFadAleSRc-ImlHu4AfM1igyQHCN3dsF6Ld54-eDhLjR-HBsteAcEaM3ksk39WT4CjlamXHsC3ffz_rQqQoR3knBhG8FhjfhVVr8r" />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">Queso de Cabra Fresco</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-sm icon-filled">star</span>
                      <span className="text-xs font-bold">5.0</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2 hover:underline cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    Lácteos La Sierra
                  </p>
                  <p className="text-sm line-clamp-2 mb-4">
                    Elaborado esta mañana con leche de cabras de pastoreo libre. Sabor suave y cremoso.
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">$8.00 <span className="text-xs font-normal">/ ud</span></span>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="group relative flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Galletas artesanales con chispas de chocolate en una bandeja de hornear" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Freshly baked cookies" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkClYs2De31IdJO_83ytde1cm174uq9fQMAjlr0d1LpUT9IYrzk1qZu_ukPl05MzDyP4Xho1I638CF7KbUtm05hdBd8r_B0FfTtwIgJw4_OEU1K3BTUTPCgUIsOEt8Z5fpjb4ZI__-X3igH98f4zlj8gsowtry2QlS0-aSoTveU7Y77HLlp0ZgS6oCZ6YRxImKOxXBF3tgtVIvuLbvNxSk2zDappPZ1V1ogHh_nlRQHCwM6S6St7u2kBiy6BSfkN4xE5XZ319glLvQ" />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">Galletas de Avena</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-sm icon-filled">star</span>
                      <span className="text-xs font-bold">4.5</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2 hover:underline cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    Panadería El Trigo
                  </p>
                  <p className="text-sm line-clamp-2 mb-4">
                    Sin conservantes, hechas con miel local y avena orgánica. Paquete de 12 unidades.
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">$4.50 <span className="text-xs font-normal">/ pqte</span></span>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/*Card 4 */}
              <div className="group relative flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Tarro de miel dorada con un cucharón de miel de madera al lado" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Golden honey jar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8PCeB8TT31_MZRt7pf1p2fnn9Ax-T3wRyp4y1AND1mZsNsw5FilK1Ood_sbORmTubSkAoGccSxdOS7YL7pYnYXpX9tmz3RJ0913IWKXvRuB3H0c34h-zLuLo6PrcGyLfbQWGVwF3wz-ftT21FUaWTiE5dm1YNC8Cey0RyYl_a1_9RqxFsDPQsclzONlIVX-oLepEKLBrLbZAffd9OVsGD7K9sUDhYZRebuDUdPvTmjmV8HH6ae6CjD1epOdeo3PNSnGOLYRkTPoah" />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <div className="absolute bottom-3 left-3 border backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-xs font-bold">Pocos en stock</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">Miel de Flores Silvestres</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-sm icon-filled">star</span>
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2 hover:underline cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    Apícola Del Valle
                  </p>
                  <p className="text-sm line-clamp-2 mb-4">
                    Miel cruda y sin filtrar, cosechada de colmenas locales. 500g.
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">$9.50 <span className="text-xs font-normal">/ frasco</span></span>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/*Card 5 */}
              <div className="group relative flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Ramo de espinacas frescas verdes sobre una mesa" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Fresh green spinach bunch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtakF4S6EK5sgcEG-pv7EBiCJeTb97n5MOZsj51-wKPwFni8lvRo0Fh8k4ujiFHlFFImmN1BDSjpN8oYwGmGKyrsG0gwG6v8EMK8ii7g5gpOD9FeL8H2YwYlMJXCw8EjMNqfj89aFXnDV9z5S4VgD6ZpdeNoU71dJl_QwxY9y18EV9B-MSE9hocEDOPmYCxMSnNfqhPIYfOvOJCLvG4LHkevkPxNJleeX59D0tBbtLNWcbjo50_WlaioocmnVSgXZdk3xlv9qdGtGe" />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">Espinaca Orgánica</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-sm icon-filled">star</span>
                      <span className="text-xs font-bold">4.7</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2 hover:underline cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    Granja Verde
                  </p>
                  <p className="text-sm line-clamp-2 mb-4">
                    Hojas tiernas y lavadas, listas para ensalada. 100% orgánicas certificadas.
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-xs line-through">$2.00</span>
                      <span className="text-lg font-bold">$1.80 <span className="text-xs font-normal">/ mazo</span></span>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/*Card 6 */}
              <div className="group relative flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Cesta de huevos marrones frescos de granja sobre paja" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Basket of fresh farm eggs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdSL8X1dBjJB22OAybGvNIZgoDM1HuwycRgX_vAIywx2jo4I8A8LluuFQmUDA0EVy9mbw8ukerOZWYGCVqhH5kF2nN_nkSCT3iZfwgbrIMcEhKY5Zt1SMO3PwaQ1DSVcYbQc_G3kAvfjlkXpLXp76jrDwwL8OBNZc2zU5eApB3rGKIcLDPnMTXEwZ3svNVJK0iTHOfPKjkhbUeuih0DZ-o8Q6fPY3xGj1A0UWtcwOtcWLnAGiMhy7O5aDWYZL-oTe1-J7rzoXEZCcs" />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">Huevos de Campo</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-sm icon-filled">star</span>
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2 hover:underline cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    Granja El Amanecer
                  </p>
                  <p className="text-sm line-clamp-2 mb-4">
                    Huevos de gallinas libres, alimentadas con granos naturales. Docena.
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">$4.20 <span className="text-xs font-normal">/ doz</span></span>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl font-bold">1</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">2</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">3</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">...</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}