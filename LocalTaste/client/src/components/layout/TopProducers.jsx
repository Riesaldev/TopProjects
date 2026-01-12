"use client";
import { useState, useEffect } from 'react';
import ProducerCard from "../ui/producerCard";
import producers from '@/data/producer.json';

// Configuración de la transición
const TRANSITION_DURATION = 1500; // Duración en milisegundos
const DISPLAY_DURATION = 8000; // Tiempo que se muestra cada productor


export default function TopProducers () {

  // Estado para el índice del productor actual y la transición
  const [ currentIndex, setCurrentIndex ] = useState( 0 );
  const [ isTransitioning, setIsTransitioning ] = useState( false );

  // Efecto para manejar la transición automática
  useEffect( () => {
    const interval = setInterval( () => {
      setIsTransitioning( true );

      // Cambiar al siguiente productor después de la duración de la transición
      setTimeout( () => {
        setCurrentIndex( ( prev ) => ( prev + 1 ) % producers.length );
        setIsTransitioning( false );
      }, TRANSITION_DURATION );
    }, DISPLAY_DURATION );

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval( interval );
  }, [] );

  // Índice del siguiente productor
  const nextProducerIndex = ( currentIndex + 1 ) % producers.length;

  return (
    <section className="w-full px-4 md:px-40 py-16 bg-[#2bee7c]/20 flex justify-center">
      <div className="relative w-full flex justify-center min-h-137">
        <div
          key={`current-${ currentIndex }`}
          className={`transition-opacity ease-in-out ${ isTransitioning ? 'opacity-0' : 'opacity-100' }`}
          style={{ transitionDuration: `${ TRANSITION_DURATION }ms` }}
        >
          <ProducerCard producer={producers[ currentIndex ]} />
        </div>
        <div
          key={`next-${ nextProducerIndex }`}
          className={`absolute top-0 left-0 right-0 transition-opacity ease-in-out ${ isTransitioning ? 'opacity-100' : 'opacity-0' } flex justify-center pointer-events-none`}
          style={{ transitionDuration: `${ TRANSITION_DURATION }ms` }}
        >
          <ProducerCard producer={producers[ nextProducerIndex ]} />
        </div>
      </div>
    </section>
  );
}