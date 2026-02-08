"use client";

import React from "react";
import Button from "@/components/Button";
import { User, Product, TokenTransaction } from "@/types";

const usuarioActual = "Carlos Pérez"; // Simulación de usuario logueado

export default function TokenStorePage() {
  const [productos, setProductos] = React.useState<Product[]>([]);
  const [tokens, setTokens] = React.useState<number>(0);
  const [historial, setHistorial] = React.useState<TokenTransaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [mensaje, setMensaje] = React.useState<string | null>(null);

  // Fetch productos, saldo y compras
  React.useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(setProductos);
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        const user = data.find((u: User) => u.nombre === usuarioActual);
        setTokens(user?.tokens || 0);
      });
    fetch("/api/tokens")
      .then(res => res.json())
      .then(data => {
        setHistorial(data.filter((t: TokenTransaction) => t.usuario === usuarioActual));
        setLoading(false);
      });
  }, []);

  // Comprar producto
  const comprar = async (producto: Product) => {
    if (tokens < producto.price) {
      setMensaje("No tienes suficientes tokens.");
      return;
    }
    // Simulación: actualiza tokens.json y saldo (en real, POST a la API)
    setTokens(t => t - producto.price);
    setHistorial(h => [
      {
        id: Date.now().toString(),
        usuario: usuarioActual,
        tipo: "Compra",
        producto: producto.name,
        cantidad: 1,
        fecha: new Date().toISOString().slice(0, 10)
      },
      ...h
    ]);
    setMensaje(`¡Has comprado ${producto.name}!`);
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Tienda de Tokens</h1>
      <div className="mb-6 w-full max-w-md bg-white rounded shadow p-4 flex flex-col items-center">
        <span className="text-lg font-semibold mb-2">Saldo de tokens</span>
        <span className="text-3xl font-bold text-primary-600 mb-2">{tokens}</span>
      </div>
      {mensaje && <div className="mb-4 text-green-600 font-semibold">{mensaje}</div>}
      <ul className="w-full max-w-md divide-y divide-gray-200 bg-white rounded shadow mb-8">
        {productos.map((p) => (
          <li key={p.id} className="p-4 flex justify-between items-center">
            <span>{p.name}</span>
            <span className="font-bold text-primary-600">{p.price} tokens</span>
            <Button onClick={() => comprar(p)}>Comprar</Button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Historial de compras</h2>
        {loading ? <p>Cargando...</p> : (
          <ul className="divide-y divide-gray-200">
            {historial.map((h) => (
              <li key={h.id} className="py-2 flex justify-between text-sm">
                <span>{h.fecha} - {h.producto}</span>
                <span className="text-primary-600">-{h.cantidad} token(s)</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
} 