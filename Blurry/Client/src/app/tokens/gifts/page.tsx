"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, Navigation, Clock, CheckCircle2, Truck, PackageSearch, Coins } from "lucide-react";

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
    setTimeout(() => {
      setGifts([
        { id: "1", name: "Ramo de Rosas Virtual", recipient: "Ana (Match #124)", status: "En camino", location: "Servidor STUN/TURN EU-West", date: "Hoy, 14:30", progress: 65 },
        { id: "2", name: "Caja de Bombones IA", recipient: "Carlos", status: "Entregado", location: "Bandeja de entrada de Carlos", date: "Ayer, 09:15", progress: 100 },
        { id: "3", name: "Entrada Cine Premium", recipient: "Lucía", status: "Preparando", location: "Pasarela de Pago", date: "Hace 5 min", progress: 20 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Entregado': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'En camino': return <Truck size={16} className="text-blue-600" />;
      default: return <PackageSearch size={16} className="text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Entregado': return "bg-green-100/80 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50";
      case 'En camino': return "bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50";
      default: return "bg-orange-100/80 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50";
    }
  };

  const getProgressColor = (status: string) => {
    switch(status) {
      case 'Entregado': return "bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]";
      case 'En camino': return "bg-gradient-to-r from-blue-400 to-indigo-500 progress-bar-animated";
      default: return "bg-gradient-to-r from-orange-400 to-amber-500 progress-bar-animated";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-2 tracking-tight">
              <Gift size={40} className="text-primary-500" />
              Gestión de Regalos
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Haz seguimiento en tiempo real de los detalles que envías.</p>
          </div>
          <Link href="/tokens/store" className="group flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-xl shadow-sm hover:shadow-lg hover:border-primary-500/50 transition-all hover:-translate-y-1">
            <Coins size={20} className="text-yellow-500 group-hover:animate-bounce" />
            <span>Volver a la Tienda</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary-500 font-bold">
            <div className="w-12 h-12 border-4 border-t-primary-500 border-primary-100 dark:border-primary-900 rounded-full animate-spin mb-4"></div>
            <p className="animate-pulse text-lg">Cargando estado de la red logística...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {gifts.map((gift, index) => (
              <div 
                key={gift.id} 
                className="glass-card rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6 md:p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center shadow-inner">
                      <Gift size={28} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight">{gift.name}</h2>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Para: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 font-black ml-1">{gift.recipient}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-black shadow-sm ${getStatusColor(gift.status)}`}>
                    {getStatusIcon(gift.status)}
                    {gift.status}
                  </span>
                </div>

                <div className="relative w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(gift.status)}`}
                    style={{ width: `${gift.progress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 px-4 py-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Navigation size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Ubicación Actual</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{gift.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 px-4 py-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Última Actualización</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{gift.date}</p>
                    </div>
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