"use client";

import { useState } from 'react';
import Image from 'next/image';
import HeartFilled from '../../../../public/heart.svg';
import HeartEmpty from '../../../../public/hearte.svg';
import Star from '../../../../public/Star.svg';

export default function ProductCard ( { product } ) {
  // Validación y valores por defecto para datos de la base de datos
  if ( !product )
  {
    return null;
  }

  const {
    id,
    name: rawName,
    like: rawLike,
    popupInfo,
    productor: rawProductor,
    type: rawType,
    description: rawDescription,
    stars: rawStars,
    divisa: rawDivisa,
    price: rawPrice,
    unit: rawUnit,
    image,
    ofert: rawOfert,
    before: rawBefore,
  } = product;

  // Aplicar valores por defecto para campos vacíos o null
  const name = rawName?.trim() || 'Producto sin nombre';
  const like = rawLike ?? false;
  const productor = rawProductor?.trim() || 'Desconocido';
  const type = rawType?.trim() || 'Sin categoría';
  const description = rawDescription?.trim() || 'Sin descripción disponible.';
  const stars = rawStars || 0;
  const divisa = rawDivisa?.trim() || '€';
  const price = rawPrice || 0;
  const unit = rawUnit?.trim() || 'kg';
  const ofert = rawOfert ?? false;
  const before = rawBefore || 0;

  /*// Si el producto no tiene nombre, no lo mostramos
  if ( !name || name === 'Producto sin nombre' )
  {
    return null;
  }
  */
  const [ isLiked, setIsLiked ] = useState( like );

  const handleProductClick = () => {
    console.log( `Producto seleccionado: ${ name } (ID: ${ id })` );
  };

  const handleLikeToggle = ( e ) => {
    e.stopPropagation();
    setIsLiked( !isLiked );
    console.log( `Like toggled: ${ name } (ID: ${ id })` );
  };

  const handleAddToCart = ( e ) => {
    e.stopPropagation();
    if ( id )
    {
      console.log( 'Añadir al carrito:', { id, name, price } );
    }
  };

  const formatPrice = ( priceValue ) => {
    return Number( priceValue || 0 ).toFixed( 2 );
  };

  return (
    <div
      className="w-auto h-auto bg-white rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
      title={`${ name } - ${ type }`}
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      onKeyDown={( e ) => {
        if ( e.key === 'Enter' || e.key === ' ' )
        {
          e.preventDefault();
          handleProductClick();
        }
      }}
    >
      {/* Imagen del producto */}
      <div className="relative w-full h-40 rounded-t-3xl mb-2 overflow-hidden">
        {/* Botón de favoritos */}
        <button
          className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out shadow-sm z-10"
          onClick={handleLikeToggle}
          aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
          type="button"
        >
          <Image
            src={isLiked ? HeartFilled : HeartEmpty}
            alt={isLiked ? "Favorito" : "Agregar a favoritos"}
            width={24}
            height={24}
          />
        </button>

        {/* Imagen principal */}
        <Image
          src={image || '/hero.avif'}
          alt={`Imagen de ${ name }`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={( e ) => {
            e.target.src = '/hero.avif';
          }}
        />

        {/* Información popup */}
        {popupInfo && (
          <span className="bg-[#2BEE7C] px-3 py-1 rounded-2xl text-xs font-bold absolute bottom-2 left-2 shadow-md text-green-950">
            {popupInfo}
          </span>
        )}
      </div>

      {/* Contenido del producto */}
      <div className="px-4 flex flex-col pb-4 space-y-3">
        {/* Nombre y calificación */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-bold text-lg leading-tight line-clamp-1 flex-1" title={name}>
            {name}
          </h2>
          {stars > 0 && (
            <p className="text-xs text-gray-500 font-medium flex items-center">
              <Image
                src={Star}
                alt="Estrella"
                width={16}
                height={16}
                className="inline-block mr-1 shrink-0"
              />
              <span className="font-bold text-base">{stars}</span>
            </p>
          )}
        </div>

        {/* Productor */}
        <p className="text-xs text-[#2BEE7C] font-semibold truncate flex items-center">
          <Image
            src="/solidStore.svg"
            alt="Tienda"
            width={12}
            height={12}
            className="inline-block mr-1 shrink-0"
          />
          {productor}
        </p>

        {/* Descripción */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Precio, oferta y botón */}
        <div className="flex justify-between items-end border-t-2 border-green-100 pt-3 mt-2">
          <div className="flex flex-col">
            {ofert && before > price && (
              <span className="text-xs text-gray-400 font-medium line-through">
                {divisa}{formatPrice( before )}
              </span>
            )}
            <p className="text-gray-700 font-medium text-sm">
              <span className="text-black text-lg font-bold">
                {divisa}{formatPrice( price )}
              </span>
              <span className="text-gray-500"> / {unit}</span>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-full bg-gray-200 hover:bg-[#2BEE7C] hover:text-white px-3 py-2 text-xl font-bold transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label={`Añadir ${ name } al carrito`}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}