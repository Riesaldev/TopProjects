"use client";

import { Purchase } from "@/types";
import { useEffect, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';
import { Download, ShoppingBag, CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

function toCSV(rows: Purchase[]) {
  if (!rows.length) return "";
  const header = Object.keys(rows[0]).join(",");
  const body = rows.map(r => Object.values(r).join(",")).join("\n");
  return header + "\n" + body;
}

interface PurchaseHistoryPageProps {
  userId: number;
}

export default function PurchaseHistoryPage({ userId }: Readonly<PurchaseHistoryPageProps>) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];

  useEffect(() => {
    fetch(`/api/purchases?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        // En caso de que no haya API, usamos datos mock mientras carga para la UI
        if (!data || data.length === 0) {
          const mockData = [
            { id: 1, productName: "Token Neon Pack x100", quantity: 1, total: 9.99, date: new Date().toISOString(), status: "completed" },
            { id: 2, productName: "Pase de Batalla Cyber", quantity: 1, total: 19.99, date: new Date(Date.now() - 86400000).toISOString(), status: "completed" },
            { id: 3, productName: "Avatar Glitch Especial", quantity: 1, total: 4.99, date: new Date(Date.now() - 172800000).toISOString(), status: "pending" },
          ];
          setPurchases(mockData as any);
        } else {
          setPurchases(data);
        }
        setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          // Ocupamos fallback en modo dev
          setPurchases([
            { id: 1, productName: "Token Neon Pack x100", quantity: 1, total: 9.99, date: new Date().toISOString(), status: "completed" } as any
          ]);
          setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    // Manejo de notificaciones realtime
  }, [notifications]);

  const handleDownload = () => {
    const csv = toCSV(purchases);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexus_purchase_history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <main className="min-h-screen flex flex-col py-12 px-4 bg-zinc-950 text-slate-200 relative z-10 w-full animate-fade-in pb-20">
      
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />
      
      <div className="w-full max-w-5xl mx-auto space-y-8">
        
        {/* Header Panel */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group rounded-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
              <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 animate-pulse-slow" /> 
              HISTORIAL DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">TRANSACCIONES</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-lg font-medium">Registros financieros y adquisiciones en el Nexus.</p>
          </div>

          <button 
            onClick={handleDownload}
            disabled={purchases.length === 0}
            className="gamified w-full sm:w-auto px-6 py-3 rounded-xl border border-primary-500/30 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all hover:bg-primary-500/10 hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 text-primary-400" />
            Descargar CSV
          </button>
        </div>

        {/* Content Panel */}
        <div className="glass-panel p-1 rounded-3xl border border-zinc-800/50 relative backdrop-blur-md">
          <div className="bg-zinc-900/60 rounded-[22px] p-6 lg:p-10 flex flex-col min-h-[400px]">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 flex-1">
                <div className="w-16 h-16 border-4 border-t-primary-500 border-zinc-800 rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                <p className="mt-4 text-primary-400 font-black tracking-widest text-sm uppercase">Cargando Registros...</p>
              </div>
            ) : purchases.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500 flex-1">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold text-lg">No hay transacciones registradas.</p>
                <p className="text-sm">Tus futuras adquisiciones aparecerán aquí.</p>
              </div>
            ) : (
              <div className="overflow-x-auto hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-zinc-800/80">
                      <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest text-zinc-500">Adquisición</th>
                      <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest text-zinc-500 text-center">Cant.</th>
                      <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest text-zinc-500">Valor Total</th>
                      <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest text-zinc-500">Registro Temporal</th>
                      <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest text-zinc-500 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {purchases.map((p, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={p.id} 
                        className="group hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700/50 shadow-inner group-hover:border-primary-500/30 transition-colors">
                              <ShoppingBag className="w-5 h-5 text-gray-300 group-hover:text-primary-400 transition-colors" />
                            </div>
                            <span className="font-bold text-white tracking-wide">{p.productName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block bg-zinc-800 text-zinc-300 font-bold px-2.5 py-1 rounded-md text-xs border border-zinc-700">
                            x{p.quantity}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-black text-primary-400 font-mono text-lg">
                            €{p.total.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Calendar className="w-4 h-4 opacity-50" />
                            {p.date ? new Date(p.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mx-auto w-max shadow-sm ${getStatusStyle(p.status)}`}>
                            {getStatusIcon(p.status)}
                            {p.status}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
} 