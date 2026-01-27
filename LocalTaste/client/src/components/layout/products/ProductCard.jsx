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
    like = false,
    popupInfo = null,
    productor = 'Desconocido',
    type = 'Sin categoría',
    description = 'Sin descripción disponible.',
    stars = 0,
    divisa = '€',
    price = 0,
    unit = 'kg',
    image = '/hero.avif',
    ofert = false,
    before = 0,
  } = product;

  const onClick = () => {
    console.log( `Producto seleccionado: ${ name } (ID: ${ id })` );
    // Aquí puedes agregar lógica adicional, como navegar a la página del producto
  }

  const handleAddToCart = () => {
    if ( id )
    {
      console.log( 'Añadir al carrito:', { id, name, price } );
      // Aquí conectar con la lógica de carrito/API
    }
  };

  return (
    <div className="w-auto h-auto bg-white rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
      title={`${ id },${ type }`}
      onClick={onClick}>
      <div className="relative w-full h-40 rounded-t-2xl mb-2 overflow-hidden">
        <span className='absolute top-2 right-2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform shadow-sm z-10'>
          {like ? '❤️' : '🤍'}
        </span>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="208px"
          onError={( e ) => {
            e.target.src = '/hero.avif';
          }} />
        <span className="bg-white px-2 py-2 rounded-2xl text-xs font-semibold absolute bottom-2 left-2 shadow-md">
          {popupInfo}
        </span>
      </div>
      <div className="px-4 justify-around flex flex-col pb-4 space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg truncate overflow-auto" title={name}>{name}</h1>
          <p className="text-xs text-gray-400">⭐ {stars}</p>
        </div>
        <p className="text-xs text-[#2BEE7C] font-semibold truncate">{productor}</p>
        <p className="text-xs text-green-600 line-clamp-2">{description}</p>

        {/* precio, oferta y boton */}
        <div className="flex justify-between items-end border-t pt-3 mt-2">
          <div className="flex flex-col">
            {ofert && (
              <span className="text-xs text-gray-400 line-through">
                {divisa}{Number( before ).toFixed( 2 )}
              </span>
            )}
            <p className="text-green-700 font-semibold text-sm">{divisa}{Number( price ).toFixed( 2 )} / {unit}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-gray-200 px-3 py-1 cursor-pointer text-2xl flex justify-around items-center hover:bg-gray-300 transition-colors"
            aria-label="Añadir al carrito"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}