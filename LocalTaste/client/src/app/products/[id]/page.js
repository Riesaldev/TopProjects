export default function ProductDetailPage ( { params } ) {
  const { id } = params;

  return (
    <>
      <main className="grow">
        <div className="px-4 md:px-10 lg:px-40 py-5">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <a className="hover:underline" href="#">Inicio</a>
              <span className="text-base">chevron_right</span>
              <a className="hover:underline" href="#">Vegetales</a>
              <span className="text-base">chevron_right</span>
              <a className="hover:underline" href="#">Tomates</a>
              <span className="text-base">chevron_right</span>
              <span className="font-medium">Tomates Cherry Orgánicos</span>
            </nav>

            {/* Product Detail Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
              {/* Left Column: Gallery */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full shadow-sm bg-white">Orgánico</span>
                    <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span className="text-sm text-green-600">eco</span> Local
                    </span>
                  </div>
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Close up of fresh red cherry tomatoes on a vine with water droplets" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6jQZ-ZWeAXgKL3XRy_MBkKStEqP_8H68KrYVXOIWCy5MqUAGSAoq6EX6P8Y9T3qskny4WMX5DSiLyEnmy1mCIRQzAmCBZnOSOtAD1ZY_jxH5QigQM9JeayJTq0_m18Jm-pHsD7w36_PhJrtgYusGaPx3ZxOZp9ENDyzlPzUWPXvmB1HOV3g8Ew7uCasXOcFrKMCHDnc6cpoYKpgVkX7Png4aKM9q51PaEenu6YApUBZKPMw-e1JAwabpc9YlS2t8O0JMbw792dDFc')" }}></div>
                </div>

                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  <button className="aspect-square rounded-xl overflow-hidden border-2 border-green-600 ring-2 ring-green-200 p-0.5 bg-white">
                    <div className="w-full h-full rounded-lg bg-cover bg-center" data-alt="Fresh cherry tomatoes in a wooden bowl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRMjhG-oERDUypRtWLJQu-b9oQbbZ43e_at4YsDPWX8tiU57TFcS_BtKM2wQu3ToNViIpZsfo5EYA2CAm6wwVRmPPbbiucSDIy5LHRmIqQCOvRbWs43Y0gNcSl3tE3gHqBK4v_qEAqyiAOVUp-3PtJDLmVBYld43CuEFYKEINSFkRK5ZDrW6ybcXPbrJDzoU2vMu-BskAKGn4G79nxjsWV2rGGUKukpksAgiYCgJ5F_TtYJKJm1MAREnk_srtftCghdToy4ntDyHsO')" }}></div>
                  </button>
                  <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-green-600 transition-colors bg-gray-100">
                    <div className="w-full h-full bg-cover bg-center opacity-80 hover:opacity-100 transition-opacity" data-alt="Farmer holding a handful of cherry tomatoes" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8pvFn_kf_DcN1xrTnkn6ueGbVrpsTBQembH3pNCrw63Zh7wyGZblRhjp1LhNxdide-8HruTn6kH3VMwz1ie80-DTTXSFM8Fz5_aE3n4FkIA41hs_GhlmjWbg_JDWdymk7n-ZqENDmJ_wRH0ua4yNAsmkClcYdnOtfVA3fzFC8wHhgI4Ow7xwkzgjY26e47GvPvQjuRFogWJ0yIbwfl9IqktM5p_ieMvedvdS1gpzzeGzOSXbcJyONhwcXVkTW_qufTZZ2KvL96uSG')" }}></div>
                  </button>
                  <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-green-600 transition-colors bg-gray-100">
                    <div className="w-full h-full bg-cover bg-center opacity-80 hover:opacity-100 transition-opacity" data-alt="Cherry tomatoes growing on the vine in a greenhouse" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYWTlQdXVNO1xEUNLbQB7A3OwoUOGO1CxVVIH4Yos8Y7B9odjOyncVqyFQvzEQPFKeB_PfB-GT5nmpSZalidJn0uLuljy-_-TttRtqYuvwxVavL3EjSILczW2iVxUwlieDVU5Nx9XfAMTmDEo6bfCWWqHjFzU-haMkBqaLDcC-yfT1nntDHIwD-sCFrDFTd7i2htnflMZ18bNlk015XSWy9A75BaE9pVxZ1BS7BW5SE1fFo9cLLtGmV76quwpeoueFnn9z8Fn16x0u')" }}></div>
                  </button>
                  <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-green-600 transition-colors bg-gray-100 flex items-center justify-center text-green-600">
                    <span className="text-3xl">play_circle</span>
                  </button>
                </div>

                {/* Product Description Details */}
                <div className="mt-8 flex flex-col gap-6">
                  <div className="border-b border-gray-200 pb-2">
                    <h3 className="text-xl font-bold mb-4">Sobre el producto</h3>
                    <p className="leading-relaxed">
                      Nuestros tomates cherry orgánicos son cultivados bajo el sol de los Andes, regados con agua de manantial. Son famosos por su dulzura explosiva y su piel fina. Ideales para ensaladas frescas, salsas rápidas o simplemente como un snack saludable. Cosechados en el punto exacto de maduración para garantizar el máximo sabor y nutrientes.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-3">
                        <span className="text-lg">nutrition</span> Beneficios
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-green-600"></span>Alto contenido en Vitamina C y K</li>
                        <li className="flex items-start gap-2"><span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-green-600"></span>Rico en licopeno (antioxidante)</li>
                        <li className="flex items-start gap-2"><span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-green-600"></span>Bajo en calorías</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-3">
                        <span className="text-lg">agriculture</span> Origen
                      </h4>
                      <p className="text-sm mb-2">Cultivado en suelo volcánico enriquecido con compost natural.</p>
                      <div className="flex items-center gap-2 text-xs text-green-600 font-medium bg-green-50 w-fit px-2 py-1 rounded">
                        <span className="text-sm">location_on</span> Valle Sagrado, Cusco
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Info & Actions */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-green-600">Vegetales Frescos</span>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                      <span className="text-lg">star</span>
                      4.9 (128 reseñas)
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Tomates Cherry Orgánicos - Cosecha del Día</h1>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cover bg-center border border-gray-200" data-alt="Portrait of the farmer smiling" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKCFEhsSGUBOK5goIF3ylKy_cdwV1O8FR3k__wLG76w0mpciVZtKKzcl1ybajTsuhn0RCQvO0M3RBItNbdvqW-cXWLQ7Alb3WG1Mh1SmQqYvs-gYmucjuu9S-A_UEb1Mp6kNkb1W_kmyzjr97YgJw1-zVm12ZX3uVlwKagYvyTygZxg5MfxuBN2rTKulLVK6GpKRA3kBtidWnmTfBEOnsHBn9zPyCtUbaNJInHqDsQPYvEQz2ch4Gk37_h4xAAbYWjLsB0qmTyCjH_')" }}></div>
                    <p className="text-sm">
                      Cultivado por <a className="font-semibold text-green-600 hover:underline transition-colors" href="#">Granja Los Andes</a>
                      <span className="text-sm text-blue-500 align-middle ml-0.5" title="Productor Verificado">verified</span>
                    </p>
                  </div>
                </div>

                {/* Sticky Action Card */}
                <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  {/* Price */}
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-4xl font-bold">$4.50</span>
                    <span className="text-lg text-gray-500 font-medium mb-1">/ kg</span>
                    <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wide">En Stock</span>
                  </div>

                  {/* Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Cantidad</label>
                    <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 w-fit p-1">
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors">
                        <span className="text-lg">remove</span>
                      </button>
                      <input className="w-16 bg-transparent border-none text-center font-bold focus:ring-0 p-0" type="text" defaultValue="1 kg" />
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors">
                        <span className="text-lg">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Subscription Toggle */}
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">AHORRA 10%</div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="relative flex items-center">
                        <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white checked:bg-green-600 checked:border-green-600 transition-all" type="checkbox" />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                          <span className="text-base">check</span>
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="block font-bold text-sm">Suscribirse a entrega semanal</span>
                        <span className="block text-xs mt-0.5">Recibe frescura cada semana y ahorra. Cancela cuando quieras.</span>
                      </div>
                    </label>
                  </div>

                  {/* Main Buttons */}
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                      <span className="text-lg">shopping_basket</span>
                      Añadir al Carrito
                    </button>
                    <button className="w-full bg-white border-2 border-gray-200 hover:border-green-600 font-bold text-lg py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                      Comprar Ahora
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center text-center gap-1">
                      <span className="text-green-600 text-2xl">spa</span>
                      <span className="text-xs font-medium text-gray-600">Cosechado Ayer</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                      <span className="text-green-600 text-2xl">local_shipping</span>
                      <span className="text-xs font-medium text-gray-600">Entrega en 24h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Producer Highlight Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 mt-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full border-4 border-white shadow-lg bg-cover bg-center" data-alt="Close up of a farmer smiling in a field" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI22k2OgBxqmMOs5Vxp8Y_XSjaGnKGsjiDlyJtp-sV3ywJus1AyY5lD_7I5Bf1diItzrYawnSTvT5N70_qQSOxQUmUJMlqrrvIv0xCuSTqQozxnuiLtGbUYV2rq4U6Fr82aZytohnOSvz0AW8__u9AwY6tfCfrLW6243uNvGdmr1q_6j6nshylCQsOOZWVLfxUYiX3jsV5_32R_Ehpj1-yJEZFlpJiAqAheN4y2LmHBvwloWkI7Ee9YVDAyz-_L9GJgLazwDKHb-pZ')" }}></div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-xl font-bold">Granja Los Andes</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded uppercase">Top Seller</span>
                </div>
                <p className="text-gray-600 mb-4 max-w-2xl">
                  Somos una familia dedicada a la agricultura regenerativa desde hace 3 generaciones. Creemos en cultivar alimentos que nutran el cuerpo y respeten la tierra. Todos nuestros productos son 100% libres de pesticidas sintéticos.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button className="text-sm font-bold text-green-600 hover:text-green-700 underline decoration-2 underline-offset-4">Ver perfil del productor</button>
                  <button className="text-sm font-bold text-gray-700 hover:text-green-600 flex items-center gap-1">
                    <span className="text-lg">chat_bubble</span> Contactar
                  </button>
                </div>
              </div>
              <div className="hidden md:block w-px h-32 bg-gray-200"></div>
              <div className="flex md:flex-col gap-8 md:gap-2 min-w-fit">
                <div>
                  <span className="block text-2xl font-bold">98%</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Calificación</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold">450+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Ventas</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Completa tu canasta</h3>
                <a className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1" href="#">
                  Ver todo <span className="text-lg">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Product Card 1 */}
                <div className="group flex flex-col gap-3">
                  <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <button className="bg-white/80 p-1.5 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">favorite</span>
                      </button>
                    </div>
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Fresh organic green spinach leaves" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrK7W9Ci_Rrs9qB0gE77m4Uf5wSByVXKBuXS7qTlzICQvPGE2xvYNeBVFXN-3ApP0N5GHmMMO4ycD3J7oIPh0uMXbX8G9xqYaaSLE3ZGZorEF3K4nXKzhQKA8Osd5mS9WeXlD6KkiaWPbOiqT79xCUNbP6n8QhoHWWF-AKXpp5uBZKh2mVT8un7o7uQawvEHoBgOqKD_7Tynt7R3QQy9-ubXB2qGuQSkrcbFP0g-ZETO17d-AjOJ2Utj6wIWLZMhRh5bNeR6HnCR1Q')" }}></div>
                  </div>
                  <div>
                    <h4 className="font-bold leading-tight mb-1 group-hover:text-green-600 transition-colors">Espinaca Baby</h4>
                    <p className="text-xs text-gray-500 mb-2">Granja El Sol</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">$2.20 / atado</span>
                      <button className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 2 */}
                <div className="group flex flex-col gap-3">
                  <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <button className="bg-white/80 p-1.5 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">favorite</span>
                      </button>
                    </div>
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Organic carrots with green tops on wooden surface" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUtBuUNWEXlpnpzfwgRpo-Quiv0delvGV9GfCxM5BjRYC1kP0XbNyGJppF3dnXY02onGLGOhjZJil1Fy_QAV0i7pH7G8Pv29D3IQ8Bb8JbFJm3AJuiax-nTyzKlYE3io9CWJdJYBjBq_SVbfsWWrndYFdQQZciwiIX-BCr-V0SlLVZhQuIxs7rynVT7rWhG7KeGuIddJZMqykDVrmHe3yZ5JnpUkpdqJcXOmDJ70gxBfClDFQ88lY4QCNcptokm5IU-mhHo78ydkPh')" }}></div>
                  </div>
                  <div>
                    <h4 className="font-bold leading-tight mb-1 group-hover:text-green-600 transition-colors">Zanahorias Dulces</h4>
                    <p className="text-xs text-gray-500 mb-2">Huerto Familiar</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">$1.80 / kg</span>
                      <button className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 3 */}
                <div className="group flex flex-col gap-3">
                  <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <button className="bg-white/80 p-1.5 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">favorite</span>
                      </button>
                    </div>
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Fresh avocados cut in half showing the stone" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8J2yqt28CHtIUwiGOIeUW5HDX_hPJMaNHH-S-2B1ayn9BwqFxgZPdBqB0LqZc10Guv4UjOz34eFOtM72xylfGssOrPe14Fp7UR21Te43kYABbiVmYQoUXC7GAe-uE9W3H0vv4TkLukERN8yZwqkXy5Kp_1GqHDpZuETLvlclGoPpiTmXfo74cTlKME7ci08vBk0dhhILclDeL5y4rjgQq5ESIb5VM3Ppp2XCnYbBbRjDE1nrxGkcSdpG0i4g2FQfcLgbSZb4xaNhH')" }}></div>
                  </div>
                  <div>
                    <h4 className="font-bold leading-tight mb-1 group-hover:text-green-600 transition-colors">Palta Hass</h4>
                    <p className="text-xs text-gray-500 mb-2">Granja Los Andes</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">$3.50 / kg</span>
                      <button className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 4 */}
                <div className="group flex flex-col gap-3">
                  <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <button className="bg-white/80 p-1.5 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">favorite</span>
                      </button>
                    </div>
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Basket of fresh brown eggs on hay" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA08ke9U4kzgdOhR58iSKvRkwTqBsskGo5b6TikLm-nilyH3CvSn6J-6g8GVoOFkfjDZDgF81JNBOIRuL4UGAIAbxUj6mhYjrQVy0mK9Gto3qHqKCloRqiNMRhGya8vVHqTL6VAlqNXwYmOvCiiKSZdKvgv-7Ejh1ixuZQxlOFVf6vpH881TShDpNONaqv6-nYl2YISATLssHzewlU5f1anrOe4ytcxido_Gm9l6yD4TCRwtf7_h3jd2m7QUZoy_LmxS57_xFmYGXmj')" }}></div>
                  </div>
                  <div>
                    <h4 className="font-bold leading-tight mb-1 group-hover:text-green-600 transition-colors">Huevos de Campo</h4>
                    <p className="text-xs text-gray-500 mb-2">Avícola Feliz</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">$5.00 / docena</span>
                      <button className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                        <span className="text-lg">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}