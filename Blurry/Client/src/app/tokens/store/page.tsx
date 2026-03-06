"use client";

import { useNotifications } from "@/components/NotificationsContext";
import { TokenPackage } from "@/types";
import { useEffect, useState } from 'react';
import { ShoppingCart, Hexagon, Sparkles, CreditCard, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

type ProductApiItem = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
};

type JwtPayload = {
  sub?: number;
};

function parseTokensFromText(text: string): number {
  const match = text.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function normalizePackages(items: ProductApiItem[]): TokenPackage[] {
  const sorted = [...items].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
  const maxPrice = sorted.length ? Number(sorted[sorted.length - 1].price ?? 0) : 0;

  return sorted.map((item) => {
    const description = item.description || "";
    const name = item.name || `Paquete ${item.id ?? ""}`;
    const parsedTokens = parseTokensFromText(`${name} ${description}`);
    const price = Number(item.price ?? 0);

    return {
      id: Number(item.id ?? 0),
      name,
      tokens: parsedTokens,
      price,
      isPopular: price === maxPrice,
      bonus: parsedTokens >= 500 ? "Bonus incluido" : undefined,
    };
  });
}

function getUserIdFromToken(token: string | null): number | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
    return typeof payload.sub === "number" ? payload.sub : null;
  } catch {
    return null;
  }
}

export default function TokenStorePage() {
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const { showToast, showOperationFeedback } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status} cargando productos`);
        }
        return res.json();
      })
      .then((data: unknown) => {
        const rows = Array.isArray(data) ? (data as ProductApiItem[]) : [];
        setPackages(normalizePackages(rows));
        setError(null);
      })
      .catch(() => {
        setPackages([]);
        setError("No se pudo cargar la tienda en este momento.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePurchase = async (pkg: TokenPackage) => {
    setBuying(pkg.id);
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const userId = getUserIdFromToken(token);

    if (!userId) {
      showToast("No se pudo identificar al usuario autenticado.", "error");
      setBuying(null);
      return;
    }

    try {
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          user_id: userId,
          product_name: pkg.name,
          price: Number(pkg.price),
          quantity: 1,
          total: Number(pkg.price),
          status: "completed",
        }),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status} registrando compra`);
      }

      showOperationFeedback("Compra de tokens", "success", `${pkg.tokens} TKN acreditados en tu billetera.`);
    } catch {
      showOperationFeedback("Compra de tokens", "error", "No se pudo completar la transaccion.");
    } finally {
      setBuying(null);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-zinc-950 text-slate-200 relative overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-5xl space-y-12 z-10">
        
        {/* Header */}
        <div className="glass-panel p-8 text-center relative overflow-hidden group rounded-3xl border border-zinc-800/60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
          
          <Hexagon className="w-16 h-16 text-primary-400 mx-auto mb-4 animate-spin-slow" />
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            MERCADO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">ENERGÍA</span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto">Adquiere TKN para desbloquear filtros premium, videollamadas prolongadas y mejoras cosméticas en el Nexus.</p>
        </div>

        {/* Store Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-12 h-12 border-4 border-zinc-800 border-t-primary-500 rounded-full animate-spin shadow-neon" />
             <p className="mt-4 text-primary-400 font-bold tracking-widest text-xs uppercase">Estableciendo conexión comercial...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="py-16 text-center text-zinc-400">
            <p className="font-semibold text-zinc-200">No hay paquetes disponibles</p>
            <p className="text-sm mt-2">{error || "Intenta de nuevo en unos minutos."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={pkg.id} 
                className={`relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${pkg.isPopular ? 'border-primary-500/50 bg-primary-900/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-105 z-10' : 'border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800/60'}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-neon flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> MÁS VENDIDO
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className={`w-8 h-8 ${pkg.isPopular ? 'text-primary-400' : 'text-zinc-500'}`} />
                    <span className="text-4xl font-black text-white">{pkg.tokens}</span>
                    <span className="text-sm font-bold text-zinc-500 uppercase">TKN</span>
                  </div>
                  {pkg.bonus ? (
                    <span className="inline-block px-3 py-1 bg-accent-500/20 text-accent-400 text-xs font-bold rounded-lg border border-accent-500/30">
                      + {pkg.bonus}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 opacity-0 text-xs">spacer</span>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-black text-white">$${pkg.price}</span>
                    <span className="text-zinc-500 text-sm ml-1">USD</span>
                  </div>
                  
                  <button 
                    disabled={buying === pkg.id}
                    onClick={() => handlePurchase(pkg)}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm transition-all ${pkg.isPopular ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-neon' : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'} disabled:opacity-50`}
                  >
                    {buying === pkg.id ? (
                      "PROCESANDO..."
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" /> ADQUIRIR
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
