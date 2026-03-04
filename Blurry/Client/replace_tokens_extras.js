import fs from 'fs';
const historyFile = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/tokens/history/page.tsx';
const giftsFile = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/tokens/gifts/page.tsx';

const newHistoryContent = `"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next/link";
import { Hexagon, Activity, ArrowDownRight, ArrowUpRight, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const mockHistory = [
  { id: "1", concept: "Carga de Energía (Starter Core)", amount: 100, date: "2026-03-01 14:30", type: 'in' },    
  { id: "2", concept: "Transferencia (Regalo a CyberNinja)", amount: -20, date: "2026-03-02 18:45", type: 'out' }, 
  { id: "3", concept: "Recompensa de Misión Diaria", amount: 50, date: "2026-03-04 09:15", type: 'in' },     
];

export default function TokenHistoryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  return (
    <main className="min-h-screen py-12 px-4 bg-zinc-950 text-slate-200 relative overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-4xl space-y-8 z-10">
        
        {/* Header */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group rounded-3xl border border-zinc-800/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
               <Activity className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                FLUJO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">ENERGÍA (TKN)</span>
              </h1>
              <p className="text-zinc-400 text-sm font-medium mt-1">Registro de transacciones e historial monetario del Nexus.</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <div className="w-12 h-12 border-4 border-zinc-800 border-t-primary-500 rounded-full animate-spin shadow-neon" />
               <p className="mt-4 text-primary-400 font-bold tracking-widest text-xs uppercase">Decodificando Registros...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockHistory.map((h, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={h.id} 
                  className="flex items-center justify-between p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={\`p-3 rounded-xl border \${h.type === 'in' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}\`}>
                       {h.type === 'in' ? <ArrowDownRight className="w-5 h-5 text-emerald-400" /> : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base">{h.concept}</h4>
                      <p className="text-xs text-zinc-500 flex items-center gap-1 font-medium mt-1">
                        <Clock className="w-3 h-3" /> {h.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className={\`flex items-center gap-1.5 font-black text-lg md:text-xl tracking-tighter \${h.type === 'in' ? 'text-emerald-400' : 'text-red-500'}\`}>
                    {h.type === 'in' ? '+' : ''}{h.amount} <Zap className="w-4 h-4 opacity-70" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
`;

const newGiftsContent = `"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, Navigation, Clock, CheckCircle2, Truck, PackageSearch, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    setTimeout(() => {
      setGifts([
        { id: "1", name: "Filtro Neon Core", recipient: "CyberNinja", status: "En camino", location: "Nodo 4: Data Center EU", date: "Hoy, 14:30", progress: 65 },
        { id: "2", name: "Potenciador de Perfil", recipient: "GlitchMaster", status: "Entregado", location: "Inventario Activo", date: "Ayer, 09:15", progress: 100 },
        { id: "3", name: "Entrada Torneo VR", recipient: "ZeroCool", status: "Preparando", location: "Pasarela Cuántica", date: "Hace 5 min", progress: 20 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'Entregado': return { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", icon: <CheckCircle2 className="w-5 h-5" /> };
      case 'En camino': return { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: <Truck className="w-5 h-5" /> };
      default: return { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", icon: <PackageSearch className="w-5 h-5" /> };
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-zinc-950 text-slate-200 relative overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-4xl space-y-8 z-10">
        
        {/* Header */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group rounded-3xl border border-zinc-800/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center justify-center">
               <Gift className="w-8 h-8 text-primary-500 animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                RASTREADOR DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">TRANSFERENCIAS</span>
              </h1>
              <p className="text-zinc-400 text-sm font-medium mt-1">Monitorea el envío de activos virtuales en el Nexus.</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <div className="w-12 h-12 border-4 border-zinc-800 border-t-primary-500 rounded-full animate-spin shadow-neon" />
               <p className="mt-4 text-primary-400 font-bold tracking-widest text-xs uppercase">Rastreando paquetes criptográficos...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {gifts.map((g, i) => {
                const s = getStatusInfo(g.status);
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={g.id} 
                    className="flex flex-col md:flex-row gap-6 p-5 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl hover:bg-zinc-800 transition-colors relative overflow-hidden"
                  >
                    <div className={\`absolute left-0 top-0 bottom-0 w-1 \${s.bg.split(' ')[0]} opacity-80\`}></div>
                    
                    <div className="flex-1 pl-2">
                       <div className="flex items-center gap-3 mb-2">
                          <span className={\`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider border \${s.bg} \${s.color}\`}>
                            {s.icon} {g.status}
                          </span>
                          <span className="text-zinc-500 text-xs font-bold">{g.date}</span>
                       </div>
                       <h4 className="font-black text-xl text-white tracking-tight leading-tight">{g.name}</h4>
                       <p className="text-sm text-zinc-400 mt-1">Destinatario: <span className="font-bold text-white">{g.recipient}</span></p>
                    </div>

                    <div className="flex-1 bg-black/40 rounded-xl p-4 border border-zinc-800 flex flex-col justify-center">
                       <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary-500" /> Origen</span>
                          <span className="flex items-center gap-1 text-primary-400"><Navigation className="w-3 h-3" /> {g.location}</span>
                       </div>
                       
                       <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2 overflow-hidden shadow-inner">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: \`\${g.progress}%\` }}
                           transition={{ duration: 1, delay: 0.5 }}
                           className={\`h-1.5 rounded-full \${g.progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-primary-500 shadow-[0_0_10px_#a855f7]'}\`} 
                         />
                       </div>
                       <div className="text-right text-[10px] font-mono text-zinc-500">PROGRESO: {g.progress}%</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
`;

if(fs.existsSync(historyFile)) fs.writeFileSync(historyFile, newHistoryContent);
if(fs.existsSync(giftsFile)) fs.writeFileSync(giftsFile, newGiftsContent);
