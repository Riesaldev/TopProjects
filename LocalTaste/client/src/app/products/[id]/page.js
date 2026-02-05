"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import productsData from '@/data/products.json';
import producersData from '@/data/producers.json';
import Header from "@/components/layout/Header";
import MiniFooter from "@/components/layout/MiniFooter";

/**
 * @fileoverview Página de detalle de producto con información completa, galería, productor destacado y productos relacionados
 */

/**
 * Página de detalle de producto - Información completa y llamada a la acción
 * Características:
 * - Muestra información detallada del producto: descripción, beneficios, origen, categoría, precio, stock, etc.
 * - Galería de imágenes con vista principal y miniaturas
 * - Destaca al productor con enlace a su perfil
 * - Muestra productos relacionados para completar la compra
 * Hooks utilizados:
 * - useState: Gestiona estado local de cantidad, suscripción e imagen seleccionada
 * - use: Unwrap de params para obtener el ID del producto
 * @returns {JSX.Element} Página de detalle de producto
 * @example
 * // URL: /products/123
 * <ProductDetailPage params={{ id: '123' }} />
 * Nota: El producto se obtiene de productsData usando el ID, y el productor se busca por producerId o nombre. Si no se encuentra el producto, se muestra un mensaje de error. La página incluye breadcrumbs, galería de imágenes, descripción detallada, información del productor, sección de productos relacionados y una tarjeta de acción para comprar o añadir al carrito.
 */

/* TODO:
- Agregar manejo de errores para producto no encontrado
- Mejorar la sección de productos relacionados con mejor lógica de recomendación
- Añadir funcionalidad real a los botones de añadir al carrito y comprar ahora
- Optimizar carga de imágenes con lazy loading
- Agregar más detalles del producto como fecha de cosecha, método de cultivo, etc.
- Implementar sistema de reseñas y valoraciones para el producto
- Añadir sección de preguntas frecuentes sobre el producto
- Mejorar la presentación de beneficios y características con íconos o listas más visuales
- Agregar un carrusel para la galería de imágenes en dispositivos móviles
- Implementar un sistema de suscripción real para entregas recurrentes
- Añadir más información sobre el productor, como su historia, prácticas agrícolas, etc.
- Mejorar la sección de productos relacionados con filtros por categoría, productor o popularidad
- Agregar un sistema de "me gusta" o favoritos para los productos
- Implementar un sistema de chat o contacto directo con el productor desde la página del producto
- Agregar un sistema de recomendaciones personalizadas basado en el historial de navegación o compras del usuario
- Mejorar la accesibilidad de la página con etiquetas ARIA, mejor contraste, etc.
- Agregar pruebas unitarias y de integración para la página de detalle del producto
*/

export default function ProductDetailPage ( { params } ) {
  // Unwrap params usando React.use()
  const { id } = use( params );

  const [ quantity, setQuantity ] = useState( 1 );
  const [ isSubscribed, setIsSubscribed ] = useState( false );
  const [ selectedImage, setSelectedImage ] = useState( 0 );

  // Obtener el producto por ID
  const product = productsData.find( p => p.id === parseInt( id ) );

  // Obtener el productor asociado
  const producer = product?.producerId
    ? producersData.find( p => p.id === product.producerId )
    : producersData.find( p => p.name === product?.productor );

  // Si no existe el producto, mostrar mensaje
  if ( !product )
  {
    return (
      <main className="grow">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/products" className="text-green-600 hover:underline">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  // Datos con valores por defecto
  const {
    name = 'Producto',
    fullDescription = product.description || 'Descripción no disponible',
    benefits = [],
    origin = 'Origen no especificado',
    location = 'Ubicación no especificada',
    category = product.type || 'Sin categoría',
    stars = 0,
    reviews = 0,
    price: productPrice = 0,
    unit: productUnit = 'kg',
    before = null,
    ofert = false,
    stock = true,
    harvestDate = 'Reciente',
    deliveryTime = '24-48h',
    badges = [],
    gallery = [],
    image
  } = product;

  // Imágenes de la galería (usar imagen principal si no hay galería)
  const images = gallery.length > 0 ? gallery : [ image, image, image, image ];

  // Productos relacionados - prioriza mismo tipo, luego otros productos
  const relatedProducts = productsData
    .filter( p => p.id !== product.id && p.name ) // Excluir el actual y productos sin nombre
    .sort( ( a, b ) => {
      // Priorizar productos del mismo tipo
      if ( a.type === product.type && b.type !== product.type ) return -1;
      if ( a.type !== product.type && b.type === product.type ) return 1;
      return 0;
    } )
    .slice( 0, 4 );

  const handleQuantityChange = ( delta ) => {
    setQuantity( prev => Math.max( 1, prev + delta ) );
  };

  return (
    <>
      <Header />
      <main className="grow">
        <div className="px-4 md:px-10 lg:px-40 py-5">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link href="/" className="hover:underline">Inicio</Link>
              <span className="text-base">›</span>
              <Link href="/products" className="hover:underline">Productos</Link>
              <span className="text-base">›</span>
              <Link href={`/products?category=${ product.type }`} className="hover:underline">{product.type}</Link>
              <span className="text-base">›</span>
              <span className="font-medium">{name}</span>
            </nav>

            {/* Product Detail Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
              {/* Left Column: Gallery */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Main Image */}
                <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                  {badges.length > 0 && (
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {badges.map( ( badge, idx ) => (
                        <span key={idx} className="bg-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                          {badge === 'Orgánico' && <span className="text-sm text-green-600">eco</span>}
                          {badge}
                        </span>
                      ) )}
                    </div>
                  )}
                  {images[ selectedImage ] && (
                    <img
                      src={images[ selectedImage ]}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {images.slice( 0, 4 ).map( ( img, idx ) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage( idx )}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${ selectedImage === idx
                        ? 'border-green-600 ring-2 ring-green-200'
                        : 'border-transparent hover:border-green-600'
                        } bg-gray-100`}
                    >
                      {img && (
                        <Image
                          src={img}
                          alt={`${ name } - vista ${ idx + 1 }`}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}

                        />
                      )}
                    </button>
                  ) )}
                </div>

                {/* Product Description Details */}
                <div className="mt-8 flex flex-col gap-6">
                  <div className="border-b border-gray-200 pb-2">
                    <h3 className="text-xl font-bold mb-4">Sobre el producto</h3>
                    <p className="leading-relaxed">{fullDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.length > 0 && (
                      <div>
                        <h4 className="font-bold flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined">nutrition</span> Beneficios
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {benefits.map( ( benefit, idx ) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-green-600"></span>
                              {benefit}
                            </li>
                          ) )}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined">agriculture</span> Origen
                      </h4>
                      <p className="text-sm mb-2">{origin}</p>
                      <div className="flex items-center gap-2 text-xs text-green-600 font-medium bg-green-50 w-fit px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-sm">location_on</span> {location}
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
                    <span className="text-xs font-bold tracking-wider uppercase text-green-600">{category}</span>
                    {reviews > 0 && (
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                        <span className="material-symbols-outlined fill-current text-lg">star</span>
                        {stars} ({reviews} reseñas)
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{name}</h1>

                  {producer && (
                    <div className="flex items-center gap-3">
                      {producer.image && (
                        <div className="w-8 h-8 rounded-full bg-cover bg-center border border-gray-200"
                          style={{ backgroundImage: `url(${ producer.image })` }}></div>
                      )}
                      <p className="text-sm">
                        Cultivado por{' '}
                        <Link href={`/producers/${ producer.id }`} className="font-semibold text-green-600 hover:underline transition-colors">
                          {producer.name}
                        </Link>
                        {producer.verified && (
                          <span className="material-symbols-outlined text-sm text-blue-500 align-middle ml-0.5" title="Productor Verificado">
                            verified
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sticky Action Card */}
                <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  {/* Price */}
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-4xl font-bold">{formatPrice( productPrice )}</span>
                    <span className="text-lg text-gray-500 font-medium mb-1">/ {productUnit}</span>
                    <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wide ${ stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {stock ? 'En Stock' : 'Agotado'}
                    </span>
                  </div>

                  {ofert && before && (
                    <div className="mb-4 text-sm">
                      <span className="text-gray-500 line-through">{formatPrice( before )}</span>
                      <span className="ml-2 text-green-600 font-bold">
                        ¡Ahorra {formatPrice( before - productPrice )}!
                      </span>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Cantidad</label>
                    <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 w-fit p-1">
                      <button
                        onClick={() => handleQuantityChange( -1 )}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <input
                        className="w-16 bg-transparent border-none text-center font-bold focus:ring-0 p-0"
                        type="text"
                        value={`${ quantity } ${ productUnit }`}
                        readOnly
                      />
                      <button
                        onClick={() => handleQuantityChange( 1 )}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Subscription Toggle */}
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                      AHORRA 10%
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="relative flex items-center">
                        <input
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white checked:bg-green-600 checked:border-green-600 transition-all"
                          type="checkbox"
                          checked={isSubscribed}
                          onChange={( e ) => setIsSubscribed( e.target.checked )}
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                          <span className="material-symbols-outlined text-base">check</span>
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
                    <button
                      disabled={!stock}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined">shopping_basket</span>
                      Añadir al Carrito
                    </button>
                    <button
                      disabled={!stock}
                      className="w-full bg-white border-2 border-gray-200 hover:border-green-600 font-bold text-lg py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Comprar Ahora
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center text-center gap-1">
                      <span className="material-symbols-outlined text-green-600 text-2xl">spa</span>
                      <span className="text-xs font-medium text-gray-600">{harvestDate}</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                      <span className="material-symbols-outlined text-green-600 text-2xl">local_shipping</span>
                      <span className="text-xs font-medium text-gray-600">Entrega en {deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Producer Highlight Section */}
            {producer && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 mt-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                {producer.image && (
                  <div
                    className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full border-4 border-white shadow-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${ producer.image })` }}
                  ></div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h3 className="text-xl font-bold">{producer.name}</h3>
                    {producer.verified && (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded uppercase">
                        Verificado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 max-w-2xl">{producer.description}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Link
                      href={`/producers/${ producer.id }`}
                      className="text-sm font-bold text-green-600 hover:text-green-700 underline decoration-2 underline-offset-4"
                    >
                      Ver perfil del productor
                    </Link>
                    <button className="text-sm font-bold text-gray-700 hover:text-green-600 flex items-center gap-1">
                    </button>
                  </div>
                </div>
                <div className="hidden md:block w-px h-32 bg-gray-200"></div>
                <div className="flex md:flex-col gap-8 md:gap-2 min-w-fit">
                  <div>
                    <span className="block text-2xl font-bold">{Math.round( producer.stars * 20 )}%</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Calificación</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">{producer.distance} km</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Distancia</span>
                  </div>
                </div>
              </div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Completa tu canasta</h3>
                  <Link href="/products" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                    Ver todo <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {relatedProducts.map( ( relatedProduct ) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/${ relatedProduct.id }`}
                      className="group flex flex-col gap-3"
                    >
                      <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={( e ) => {
                              e.preventDefault();
                              // Toggle like
                            }}
                            className="bg-white/80 p-1.5 rounded-full hover:bg-green-600 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">favorite</span>
                          </button>
                        </div>
                        {relatedProduct.image && (
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold leading-tight mb-1 group-hover:text-green-600 transition-colors">
                          {relatedProduct.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{relatedProduct.productor}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{formatPrice( relatedProduct.price )} / {relatedProduct.unit}</span>
                          <button
                            onClick={( e ) => {
                              e.preventDefault();
                              // Add to cart
                            }}
                            className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                          </button>
                        </div>
                      </div>
                    </Link>
                  ) )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}