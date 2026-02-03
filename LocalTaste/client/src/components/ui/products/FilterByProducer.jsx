"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FilterByProducer({ onProducerSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Debouncing: espera 300ms después de que el usuario deje de escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onProducerSearchChange) {
        onProducerSearchChange(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onProducerSearchChange]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Filter by Producer (Reusing TextField style) */}
      <div className="p-5 rounded-2xl border border-green-300 text-green-950 bg-green-50 brightness-105">
        <label className="block mb-3">
          <span className="text-base font-bold">Buscar Productor</span>
        </label>
        <div className="relative text-green-950">
          <input
            className="w-full h-12 bg-green-100 rounded-4xl border text-green-700 text-lg font-semibold placeholder:font-normal placeholder:text-green-700 border-green-300 px-4 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Ej. Granja El Sol..."
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute right-2 top-2 bg-green-800 rounded-full h-8 w-8 flex items-center justify-center">
            <span className="text-xl p-2 rounded-full">
              <Image src="/lupa.svg" alt="search icon" width={20} height={20} className='' />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}