"use client";
import Image from 'next/image';

export default function ProductCard ( { product } ) {
  // Validación y valores por defecto para datos de la base de datos
  if ( !product )
  {
    return null;
  }

  const {
    id,
    name = 'Producto sin nombre',
    price = 0,
    type = 'Sin categoría',
    ubication = 'Sin ubicación',
    image = '/hero.avif',
  } = product;

  const handleAddToCart = () => {
    if ( id )
    {
      console.log( 'Añadir al carrito:', { id, name, price } );
      // Aquí conectarás con la lógica de carrito/API
    }
  };

  return (
    <div className="w-52 h-72 bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-1/2 rounded-t-2xl mb-2 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="208px"
          onError={( e ) => {
            e.target.src = '/hero.avif'; // Imagen fallback
          }}
        />
        <span className="bg-white px-2 py-1 rounded-md text-xs font-semibold absolute top-2 left-2 shadow-md">
          {type}
        </span>
      </div>
      <div className="px-4 justify-around flex flex-col h-1/2 pb-4">
        <p className="text-xs text-gray-400 mb-2 truncate">{ubication}</p>
        <h1 className="font-semibold text-lg truncate" title={name}>{name}</h1>
        <div className="flex justify-between items-center mt-4">
          <p className="text-[#2BEE7C] font-black text-sm">€{Number( price ).toFixed( 2 )}</p>
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-gray-200 px-2 py-0.5 cursor-pointer hover:bg-gray-300 transition-colors"
            aria-label={`Añadir ${ name } al carrito`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}