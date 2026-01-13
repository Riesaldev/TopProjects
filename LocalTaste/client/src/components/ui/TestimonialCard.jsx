"use client";
import Image from "next/image";


export function TestimonialCard ( { user } ) {
  // Validación y valores por defecto para datos de la base de datos
  if ( !user )
  {
    return null;
  }

  const {
    name = 'Usuario Anónimo',
    location = 'Desconocida',
    photo = '/default-user.png',
    testimonial = 'No hay testimonio disponible.',
    rating = 5,
  } = user;

  const fullStars = Math.floor( rating );
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative flex flex-col h-full">
      <span className="absolute top-6 right-6 text-gray-200 dark:text-gray-600 text-4xl"><img src="/Quotes.svg" alt="quotes" width={20} height={20} /></span>
      <div className="flex gap-1 mb-4">
        {Array.from( { length: fullStars } ).map( ( _, index ) => (
          <span key={index} className="fill-current">
            <img src="/Star.svg" alt="star" width={22} height={22} />
          </span>
        ) )}
        {hasHalfStar && (
          <span className="fill-current">
            <img src="/StarHalf.svg" alt="half star" width={22} height={22} />
          </span>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10">"{testimonial}"</p>
      <div className="Pie flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <Image className="w-full h-full object-cover" width={200} height={200} alt={`Portrait of ${ name }`} src={photo} />
        </div>
        <div>
          <h4 className="font-bold text-sm">{name}</h4>
          <span className="text-xs text-gray-400">{location}</span>
        </div>
      </div>
    </div>
  );
}