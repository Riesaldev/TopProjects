"use client";

import React from "react";
import Button from "@/components/Button";
import { User, Product, TokenTransaction } from "@/types";
import { Coins, Sparkles, Clock, ShoppingBag, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const usuarioActual = "Carlos Pérez"; // Simulación de usuario logueado

export default function TokenStorePage() {
  const [productos, setProductos] = React.useState<Product[]>([]);
  const [tokens, setTokens] = React.useState<number>(0);
  const [historial, setHistorial] = React.useState<TokenTransaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [mensaje, setMensaje] = React.useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // Fetch productos, saldo y compras
  React.useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(setProductos)
      .catch(() => setProductos([
        { id: "p1", name: "100 Tokens", price: 100, description: "Paquete básico", category: "tokens" },
        { id: "p2", name: "500 Tokens", price: 450, description: "Paquete popular", category: "tokens" },
        { id: "p3", name: "1000 Tokens + Bonus", price: 800, description: "Mejor valor", category: "tokens" }
      ]));
      
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        const user = data.find((u: User) => u.nombre === usuarioActual);
        setTokens(user?.tokens || 1250); // Default to show UI
      })
      .catch(() => setTokens(1250));

    fetch("/api/tokens")
      .then(res => res.json())
      .then(data => {
        setHistorial(data.filter((t: TokenTransaction) => t.usuario === usuarioActual));
        setLoading(false);
      })
      .catch(() => {
        setHistorial([
          { id: "t1", usuario: usuarioActual, tipo: "Compra", producto: "Boost 24h", cantidad: 200, fecha: "2024-05-12" }
        ]);
        setLoading(false);
      });
  }, []);

  // Comprar producto
  const comprar = async (producto: Product) => {
    if (tokens < producto.price) {
      setMensaje({ text: "No tienes suficientes tokens. ¡Recarga ahora!", type: 'error' });
      setTimeout(() => setMensaje(null), 3000);
      return;
    }
    // Simulación
    setTokens(t => t - producto.price);
    setHistorial(h => [
      {
        id: Date.now().toString(),
        usuario: usuarioActual,
        tipo: "Compra",
        producto: producto.name,
        cantidad: producto.price,
        fecha: new Date().toISOString().slice(0, 10)
      },
      ...h
    ]);
    setMensaje({ text: `¡Has comprado ${producto.name} con éxito!`, type: 'success' });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 flex flex-col items-center selection:bg-primary-500/30">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500 mb-2 flex items-center justify-center md:justify-start gap-3">
              <ShoppingBag size={36} className="text-primary-500" />
              Tienda Blurry
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Potencia tu perfil, envía regalos y destaca entre la multitud.</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 shadow-lg border border-yellow-500/30 relative overflow-hidden group animate-float">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-yellow-400/40 transition-all"></div>
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Tu Saldo</span>
              <div className="flex items-center gap-3">
                <Coins size={32} className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                <span className="text-4xl font-black text-gradient-gold drop-shadow-sm">{tokens.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {mensaje && (
          <div className={`mb-8 p-4 rounded-xl font-bold flex items-center justify-center gap-2 animate-pop shadow-lg text-white ${mensaje.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-orange-600'}`}>
            {mensaje.type === 'success' ? <ShieldCheck size={24} /> : <Zap size={24} />}
            {mensaje.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-extrabold flex items-center gap-2 text-gray-900 dark:text-white">
                <Sparkles className="text-primary-500" /> 
                Artículos Premium
              </h2>
              <Link href="/tokens/gifts" className="text-primary-600 dark:text-primary-400 font-bold hover:underline underline-offset-4 text-sm flex items-center gap-1">
                Ver mis regalos enviados &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productos.map((p, index) => (
                <div key={p.id} className="glass-panel p-6 rounded-2xl hover-lift border-2 border-transparent hover:border-primary-500/50 flex flex-col relative overflow-hidden group">
                  {index === 2 && (
                    <div className="absolute top-4 -right-8 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-black px-10 py-1 rotate-45 shadow-lg">
                      MEJOR VALOR
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 badge-glow">
                    <Coins size={28} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{p.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow">{p.description || "Consigue más visibilidad"}</p>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">Precio</span>
                      <span className="text-2xl font-black text-amber-500 flex items-center gap-1">
                        {p.price} <Coins size={16} />
                      </span>
                    </div>
                    <Button 
                      variant="gamified" 
                      size="sm" 
                      onClick={() => comprar(p)}
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-2xl font-extrabold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
              <Clock className="text-secondary-500" /> 
              Historial
            </h2>
            <div className="glass-panel rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                  <div className="w-8 h-8 border-4 border-t-primary-500 border-primary-200 rounded-full animate-spin mb-4"></div>
                  <p className="font-bold">Cargando registros...</p>
                </div>
              ) : historial.length === 0 ? (
                <div className="text-center py-8 text-gray-500 font-medium">
                  <Coins size={40} className="mx-auto mb-3 opacity-20" />
                  Aún no has hecho compras.
                </div>
              ) : (
                <ul className="space-y-4">
                  {historial.map((h, i) => (
                    <li key={h.id || i} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{h.producto}</span>
                        <span className="text-xs text-gray-500">{h.fecha}</span>
                      </div>
                      <span className="font-black text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                        -{h.cantidad} <Coins size={12}/>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 