"use client";

import React from "react";

const mockGifts = [
  { id: "1", name: "Ramo de flores", status: "En camino", location: "Centro de distribución" },
  { id: "2", name: "Caja de bombones", status: "Entregado", location: "Domicilio de Ana" },
];

export default function TokenGiftsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Seguimiento de Regalos</h1>
      <ul className="w-full max-w-md divide-y divide-gray-200 bg-white rounded shadow">
        {mockGifts.map((gift) => (
          <li key={gift.id} className="p-4 flex flex-col">
            <span className="font-semibold">{gift.name}</span>
            <span className="text-sm">Estado: {gift.status}</span>
            <span className="text-xs text-gray-400">Ubicación: {gift.location}</span>
          </li>
        ))}
      </ul>
    </main>
  );
} 