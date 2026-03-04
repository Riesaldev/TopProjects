"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface GiftTrack {
  id: string;
  name: string;
  recipient: string;
  status: "Preparando" | "En camino" | "Entregado";
  location: string;
  date: string;
  progress: number;
}

export default function TokenGiftsPage() {
  const [gifts, setGifts] = useState<GiftTrack[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulación de conexión a un endpoint real (GET /tokens/gifts/:id)
  useEffect(() => {
    // Aquí iría: fetch('/api/tokens/gifts').then(...)
    setTimeout(() => {
      setGifts([
        { id: "1", name: "Ramo de Rosas Virtual", recipient: "Ana (Match #124)", status: "En camino", location: "Servidor STUN/TURN EU-West", date: "Hoy, 14:30", progress: 65 },
        { id: "2", name: "Caja de Bombones IA", recipient: "Carlos", status: "Entregado", location: "Bandeja de entrada de Carlos", date: "Ayer, 09:15", progress: 100 },
        { id: "3", name: "Entrada Cine Premium", recipient: "Lucía", status: "Preparando", location: "Pasarela de Pago", date: "Hace 5 min", progress: 20 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Mis Regalos</h1>
            <p className="text-gray-600 mt-2">Haz seguimiento en tiempo real de los elementos que has enviado usando tus tokens.</p>
          </div>
          <Link href="/tokens/store" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition">
            Ir a la tienda
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-indigo-600 font-bold animate-pulse text-xl">Cargando estado de la red...</div>
        ) : (
          <div className="flex flex-col gap-6">
            {gifts.map((gift) => (
              <div key={gift.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{gift.name}</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">Para: <span className="text-indigo-600">{gift.recipient}</span></p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    gift.status === "Entregado" ? "bg-green-100 text-green-700" :
                    gift.status === "En camino" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {gift.status}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className={`h-2.5 rounded-full ${gift.status === 'Entregado' ? 'bg-green-500' : 'bg-indigo-600'}`} 
                    style={{ width: `${gift.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between flex-col sm:flex-row gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span>Ubicación actual: <span className="font-semibold text-gray-800">{gift.location}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕒</span>
                    <span>Actualizado: <span className="font-semibold text-gray-800">{gift.date}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 