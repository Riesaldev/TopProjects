"use client";

import React from "react";

const mockTokenTransactions = [
  { id: "1", user: "Carlos Pérez", type: "Compra", amount: 100, date: "2024-07-10" },
  { id: "2", user: "Ana Torres", type: "Sanción compensada", amount: -50, date: "2024-07-12" },
];

export default function AdminTokensPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tokens</h1>
      <table className="min-w-[350px] border rounded shadow bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Usuario</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {mockTokenTransactions.map((t) => (
            <tr key={t.id} className="text-center border-t">
              <td className="p-2">{t.user}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.amount}</td>
              <td className="p-2">{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 