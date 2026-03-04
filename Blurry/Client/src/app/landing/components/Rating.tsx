import React from "react";

export default function Rating() {
  const reviews = [
    { name: "Lucía M.", age: 24, review: "Blurry cambió mi forma de conocer gente. El anonimato me dio mucha más seguridad al inicio.", rating: 5 },
    { name: "Carlos G.", age: 29, review: "Los juegos en videollamada son la clave. Rompen el hielo súper rápido y es divertido.", rating: 5 },
    { name: "Marta P.", age: 22, review: "Es genial que el algoritmo se fije en tus intereses y no solo en la foto. Conectas de verdad.", rating: 4 }
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Lo que dicen nuestros usuarios</h2>
      <div className="flex flex-col sm:flex-row gap-6 mb-8 w-full justify-center">
        {reviews.map((rev, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800">{rev.name}, {rev.age}</span>
              <span className="text-yellow-400 text-lg">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
            </div>
            <p className="text-gray-600 italic">"{rev.review}"</p>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 bg-indigo-50 px-6 py-4 rounded-full">
        <span className="text-yellow-400 text-4xl">★★★★★</span>
        <div>
          <p className="text-lg font-bold text-gray-800 mb-0">Valoración media: 4.8/5</p>
          <p className="text-sm text-gray-500">Basado en más de 12.000 opiniones reales</p>
        </div>
      </div>
    </div>
  );
} 