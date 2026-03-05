"use client";

import React, { useEffect, useState } from "react";
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

type TokenTx = {
  id?: number;
  amount?: number;
  reason?: string;
  created_at?: string;
};

function parseRecipient(reason: string): string {
  const match = reason.match(/(?:to|a)\s+([\w\-@.]+)/i);
  return match?.[1] || "Destinatario desconocido";
}

function parseGiftName(reason: string): string {
  const colonIndex = reason.indexOf(":");
  if (colonIndex !== -1 && colonIndex + 1 < reason.length) {
    return reason.slice(colonIndex + 1).trim();
  }
  return "Transferencia de TKN";
}

function deriveStatus(createdAt?: string): Pick<GiftTrack, "status" | "progress" | "location" | "date"> {
  const created = createdAt ? new Date(createdAt) : new Date();
  const ageMs = Date.now() - created.getTime();
  const ageMinutes = Math.max(0, Math.floor(ageMs / 60000));

  if (ageMinutes < 15) {
    return {
      status: "Preparando",
      progress: 20,
      location: "Pasarela Cuantica",
      date: "Hace unos minutos",
    };
  }

  if (ageMinutes < 120) {
    return {
      status: "En camino",
      progress: 65,
      location: "Nodo de Enrutamiento",
      date: created.toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
    };
  }

  return {
    status: "Entregado",
    progress: 100,
    location: "Inventario Activo",
    date: created.toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
  };
}

function normalizeGifts(rows: TokenTx[]): GiftTrack[] {
  return rows
    .filter((tx) => {
      const reason = String(tx.reason || "").toLowerCase();
      const amount = Number(tx.amount ?? 0);
      return amount < 0 || reason.includes("gift") || reason.includes("regalo") || reason.includes("transfer");
    })
    .map((tx, index) => {
      const reason = String(tx.reason || "Transferencia de TKN");
      const status = deriveStatus(tx.created_at);
      const amount = Number(tx.amount ?? 0);
      const fallbackId = `${tx.created_at ?? "sin-fecha"}-${Math.abs(amount)}-${index}`;
      return {
        id: String(tx.id ?? fallbackId),
        name: parseGiftName(reason),
        recipient: parseRecipient(reason),
        ...status,
      };
    })
    .sort((a, b) => b.id.localeCompare(a.id));
}

export default function TokenGiftsPage() {
  const [gifts, setGifts] = useState<GiftTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;

    fetch("/api/tokens", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status} cargando transferencias`);
        }
        return res.json();
      })
      .then((data: unknown) => {
        const rows = Array.isArray(data) ? (data as TokenTx[]) : [];
        setGifts(normalizeGifts(rows));
      })
      .catch(() => {
        setGifts([]);
      })
      .finally(() => {
        setLoading(false);
      });
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
              {gifts.length === 0 && (
                <div className="text-center py-10 border border-zinc-800 rounded-2xl bg-black/20">
                  <p className="text-zinc-300 font-semibold">No hay transferencias recientes.</p>
                  <p className="text-zinc-500 text-sm mt-2">Cuando envies regalos o tokens, apareceran aqui.</p>
                </div>
              )}
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
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bg.split(' ')[0]} opacity-80`}></div>
                    
                    <div className="flex-1 pl-2">
                       <div className="flex items-center gap-3 mb-2">
                          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider border ${s.bg} ${s.color}`}>
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
                           animate={{ width: `${g.progress}%` }}
                           transition={{ duration: 1, delay: 0.5 }}
                           className={`h-1.5 rounded-full ${g.progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-primary-500 shadow-[0_0_10px_#a855f7]'}`} 
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
