"use client";

import React from "react";

const mockHistory = [
  { id: "1", concept: "Compra de tokens", amount: 100, date: "2024-07-10" },
  { id: "2", concept: "Regalo enviado", amount: -20, date: "2024-07-12" },
];

export default function TokenHistoryPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Tokens</h1>
      <table className="min-w-[350px] border rounded shadow bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Concepto</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {mockHistory.map((h) => (
            <tr key={h.id} className="text-center border-t">
              <td className="p-2">{h.concept}</td>
              <td className="p-2">{h.amount}</td>
              <td className="p-2">{h.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 