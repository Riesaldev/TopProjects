"use client";

import { useState } from 'react';
import Image from 'next/image';
import HeartFilled from '../../../../public/heart.svg';
import HeartEmpty from '../../../../public/hearte.svg';
import Star from '../../../../public/Star.svg';

export default function ProducerCard ( { producer } ) {
  if ( !producer )
  {
    return null;
  }

  const {
    id,
    name: rawName,
    like: rawLike,
    type: rawType,
    description: rawDescription,
    stars: rawStars,
    image,
    distance: rawDistance
  } = producer;

  const name = rawName?.trim() || 'Productor sin nombre';
  const like = rawLike ?? false;
  const type = rawType?.trim() || 'Sin categoría';
  const description = rawDescription?.trim() || 'Sin descripción disponible.';
  const stars = rawStars || 0;
  const distance = rawDistance || 'N/A';

  const [ isLiked, setIsLiked ] = useState( like );

  const handleProducerClick = () => {
    console.log( `Productor seleccionado: ${ name } (ID: ${ id })` );
  };

  const handleLikeToggle = ( e ) => {
    e.stopPropagation();
    setIsLiked( !isLiked );
    console.log( `Like toggled: ${ name } (ID: ${ id })` );
  };

  return (
    <div
      className="w-auto h-auto bg-white rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
      title={`${ name } - ${ type }`}
      onClick={handleProducerClick}
      role="button"
      tabIndex={0}
      onKeyDown={( e ) => {
        if ( e.key === 'Enter' || e.key === ' ' )
        {
          e.preventDefault();
          handleProducerClick();
        }
      }}
    >
      <div className="relative w-full h-40 rounded-t-3xl mb-2 overflow-hidden">
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-2xl flex items-center shadow-md z-10">
          <Image
            src={Star}
            alt="Estrellas"
            width={16}
            height={16}
            className="inline-block mr-1"
          />
          <span className="text-sm font-semibold text-green-950">{stars.toFixed( 1 )}</span>
        </div>

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

        <span className="bg-[#2BEE7C] px-3 py-1 rounded-2xl text-xs font-bold absolute bottom-2 left-2 shadow-md text-green-950">
          A {distance} Km
        </span>
      </div>

      <div className="px-4 flex flex-col pb-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-bold text-lg leading-tight line-clamp-1 flex-1" title={name}>
            {name}
          </h2>
        </div>

        <p className="text-xs text-[#2BEE7C] font-semibold truncate flex items-center uppercase">
          {type}
        </p>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex justify-end">
          <button
            onClick={( e ) => {
              e.stopPropagation();
              console.log( 'Ver perfil:', { id, name } );
            }}
            className="rounded-full bg-gray-200 hover:bg-[#2BEE7C] hover:text-white px-3 py-2 text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            aria-label={`Ver perfil de ${ name }`}
            type="button"
          >
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  );
}