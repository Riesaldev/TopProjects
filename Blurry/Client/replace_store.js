import fs from 'fs';
const file = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/tokens/store/page.tsx';

const newContent = `"use client";

import { useNotifications } from "@/components/NotificationsContext";
import { TokenPackage } from "@/types";
import { useEffect, useState } from 'react';
import { ShoppingCart, Hexagon, Sparkles, CreditCard, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function TokenStorePage() {
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const { showToast } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPackages([
        { id: 1, name: "Starter Core", tokens: 100, price: 9.99, isPopular: false },
        { id: 2, name: "Nexus Pack", tokens: 500, price: 39.99, isPopular: true, bonus: "50 Bonus" },
        { id: 3, name: "Quantum Vault", tokens: 1000, price: 69.99, isPopular: false, bonus: "200 Bonus" }
      ] as any);
      setLoading(false);
    }, 600);
  }, []);

  const handlePurchase = (pkg: any) => {
    setBuying(pkg.id);
    setTimeout(() => {
      showToast(\`Transacción aprobada: \${pkg.tokens} TKN añadidos a tu billetera.\`, "success");
      setBuying(null);
    }, 1500);
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={pkg.id} 
                className={\`relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 \${pkg.isPopular ? 'border-primary-500/50 bg-primary-900/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-105 z-10' : 'border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800/60'}\`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-neon flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> MÁS VENDIDO
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className={\`w-8 h-8 \${pkg.isPopular ? 'text-primary-400' : 'text-zinc-500'}\`} />
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
                    <span className="text-3xl font-black text-white">$\${pkg.price}</span>
                    <span className="text-zinc-500 text-sm ml-1">USD</span>
                  </div>
                  
                  <button 
                    disabled={buying === pkg.id}
                    onClick={() => handlePurchase(pkg)}
                    className={\`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm transition-all \${pkg.isPopular ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-neon' : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'} disabled:opacity-50\`}
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
`;

fs.writeFileSync(file, newContent);
