"use client";

import { Purchase } from "@/types";
import { useEffect, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';



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
  const [purchases, setPurchases] =useState<Purchase[]>([]);
  const [loading, setLoading] =useState(true);
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];

  useEffect(() => {
    fetch(`/api/purchases?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setPurchases(data);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto
  }, [notifications]);

  const handleDownload = () => {
    const csv = toCSV(purchases);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historial_compras.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historial de compras</h1>
      {loading ? <div>Cargando...</div> : (
        <div className="w-full max-w-2xl">
          {purchases.length === 0 ? (
            <div className="text-gray-500">No tienes compras registradas.</div>
          ) : (
            <>
              <button onClick={handleDownload} className="mb-4 bg-primary-600 text-white px-4 py-2 rounded font-semibold">Descargar CSV</button>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Producto</th>
                      <th className="p-2 border">Cantidad</th>
                      <th className="p-2 border">Total</th>
                      <th className="p-2 border">Fecha</th>
                      <th className="p-2 border">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p) => (
                      <tr key={p.id} className="text-center">
                        <td className="p-2 border">{p.productName}</td>
                        <td className="p-2 border">{p.quantity}</td>
                        <td className="p-2 border">€{p.total.toFixed(2)}</td>
                        <td className="p-2 border">{p.date ? new Date(p.date).toLocaleString() : 'Fecha no disponible'}</td>
                        <td className="p-2 border capitalize">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
} 