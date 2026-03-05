"use client";

import React, { useState, useEffect } from "react";
import { Hexagon, Activity, ArrowDownRight, ArrowUpRight, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

type TokenHistoryItem = {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: "in" | "out";
};

type TokenApiItem = {
  id?: number;
  amount?: number;
  reason?: string;
  created_at?: string;
};

function normalizeTokenHistory(items: TokenApiItem[]): TokenHistoryItem[] {
  return items
    .map((item, index) => {
      const amount = Number(item.amount ?? 0);
      const createdAt = item.created_at ? new Date(item.created_at) : null;
      const fallbackId = `${item.created_at ?? "sin-fecha"}-${amount}-${index}`;

      return {
        id: String(item.id ?? fallbackId),
        concept: item.reason || "Movimiento de energia",
        amount,
        date: createdAt
          ? createdAt.toLocaleString([], { dateStyle: "short", timeStyle: "short" })
          : "Sin fecha",
        type: amount >= 0 ? "in" : "out",
      } as TokenHistoryItem;
    })
    .sort((a, b) => {
      const left = new Date(a.date).getTime();
      const right = new Date(b.date).getTime();
      return Number.isNaN(left) || Number.isNaN(right) ? 0 : right - left;
    });
}

export default function TokenHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<TokenHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;

    fetch("/api/tokens", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status} cargando historial de tokens`);
        }
        return res.json();
      })
      .then((data: unknown) => {
        const rows = Array.isArray(data) ? (data as TokenApiItem[]) : [];
        setHistory(normalizeTokenHistory(rows));
        setError(null);
      })
      .catch(() => {
        setHistory([]);
        setError("No se pudo cargar el historial de energia.");
      })
      .finally(() => {
        setLoading(false);
      });
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
          ) : history.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-zinc-300 font-semibold">{error ? "Error de conexion" : "Sin movimientos aun"}</p>
              <p className="text-zinc-500 text-sm mt-2">{error || "Tus transacciones de energia apareceran aqui."}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((h, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={h.id} 
                  className="flex items-center justify-between p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl border ${h.type === 'in' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                       {h.type === 'in' ? <ArrowDownRight className="w-5 h-5 text-emerald-400" /> : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base">{h.concept}</h4>
                      <p className="text-xs text-zinc-500 flex items-center gap-1 font-medium mt-1">
                        <Clock className="w-3 h-3" /> {h.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 font-black text-lg md:text-xl tracking-tighter ${h.type === 'in' ? 'text-emerald-400' : 'text-red-500'}`}>
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
