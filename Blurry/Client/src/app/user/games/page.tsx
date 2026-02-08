'use client';

import { Game } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';



type GameHistory = {
  id: number | string;
  game: string;
  date: string;
  score: number;
};

export default function GamesPage() {
  const realtimeContext = useRealtime();
  const gameInvite = realtimeContext?.gameInvite;

  useEffect(() => {
    if (gameInvite) {
      // Mostrar modal de invitación a juego o lógica personalizada
      alert(`${gameInvite.from} te ha invitado a jugar: ${gameInvite.gameType}`);
    }
  }, [gameInvite]);

  const [games, setGames] =useState<Game[]>([]);
  const [loading, setLoading] =useState(true);
  const [history, setHistory] = useState<GameHistory[]>([]);
  // Si se requiere contactId, debe recibirse por prop o contexto

  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      });
    // Obtener historial real si existe endpoint
    fetch("/api/games/history")
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);


  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Juegos</h1>
      {loading ? <div>Cargando...</div> : (
        <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8">
          {/* Lista de juegos */}
          <section className="md:w-2/3 w-full">
            <h2 className="font-semibold mb-2">Juegos disponibles</h2>
            <ul className="flex flex-col gap-4">
              {games.map(g => (
                <li key={g.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center gap-2">
                  <div className="flex-1">
                    <span className="font-semibold">{g.name}</span>
                    <span className="text-xs text-gray-500">{g.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {/* Historial de partidas  */}
          <aside className="md:w-1/3 w-full">
            <h2 className="font-semibold mb-2">Historial de partidas</h2>
            <ul className="flex flex-col gap-2">
              {history.map(h => (
                <li key={h.id} className="bg-gray-100 rounded p-2 flex flex-col">
                  <span className="font-semibold">{h.game}</span>
                  <span className="text-xs text-gray-500">{h.date}</span>
                  <span className="text-xs">Puntuación: {h.score}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
      <div>
        <h2>Juegos en tiempo real</h2>
        {/* Si se requiere lógica de invitación, usar el contactId real */}
        {/* Aquí iría la lógica y UI de los juegos */}
      </div>
    </main>
  );
} 