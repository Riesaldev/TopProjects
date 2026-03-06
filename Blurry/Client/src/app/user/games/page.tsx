'use client';

import { Game } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameCard from "@/components/GameCard";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Clock, Search, Activity, Flame, ArrowUpRight } from "lucide-react";
import ViewState from "@/components/ViewState";

type GameHistory = {
  id: number | string;
  game: string;
  date: string;
  score: number;
  opponent?: string;
  result?: "win" | "loss";
};

const GAMES_FILTER_STORAGE_KEY = "games.categoryFilter";
const GAMES_QUERY_STORAGE_KEY = "games.searchQuery";
const GAMES_TAB_STORAGE_KEY = "games.activeTab";

export default function GamesPage() {
  const router = useRouter();
  const realtimeContext = useRealtime();
  const gameInvite = realtimeContext?.gameInvite;
  const [activeTab, setActiveTab] = useState<"lobby" | "history">("lobby");
  const [games, setGames] = useState<Game[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "game" | "test">("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    // Si manejamos invitaciones a videojuegos a través de realtime global
    if (gameInvite) {
      // alert(`${gameInvite.from} te ha invitado a jugar: ${gameInvite.gameType}`);
    }
  }, [gameInvite]);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/games");
        const data = await res.json().catch(() => []);
        setGames(Array.isArray(data) ? data : []);
        setHistory([]);
      } catch {
        setGames([]);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  useEffect(() => {
    try {
      const savedTab = localStorage.getItem(GAMES_TAB_STORAGE_KEY);
      const savedFilter = localStorage.getItem(GAMES_FILTER_STORAGE_KEY);
      const savedQuery = localStorage.getItem(GAMES_QUERY_STORAGE_KEY);

      if (savedTab === "lobby" || savedTab === "history") {
        setActiveTab(savedTab);
      }

      if (savedFilter === "all" || savedFilter === "game" || savedFilter === "test") {
        setCategoryFilter(savedFilter);
      }

      if (typeof savedQuery === "string") {
        setQuery(savedQuery);
      }
    } catch {
      // localStorage can fail in restricted browser contexts.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(GAMES_TAB_STORAGE_KEY, activeTab);
      localStorage.setItem(GAMES_FILTER_STORAGE_KEY, categoryFilter);
      localStorage.setItem(GAMES_QUERY_STORAGE_KEY, query);
    } catch {
      // localStorage can fail in restricted browser contexts.
    }
  }, [activeTab, categoryFilter, query]);

  const handleGameSelect = (id: string | number) => {
    const game = games.find(g => String(g.id) === String(id));
    const query = new URLSearchParams({ gameId: String(id), gameName: game?.name || "Juego" });
    router.push(`/user/video-call?${query.toString()}`);
  };

  const filteredGames = games.filter((game) => {
    const currentCategory = game.category === "test" ? "test" : "game";
    const byCategory = categoryFilter === "all" || currentCategory === categoryFilter;
    const needle = query.trim().toLowerCase();
    const byQuery =
      !needle ||
      String(game.name || "").toLowerCase().includes(needle) ||
      String(game.description || "").toLowerCase().includes(needle);
    return byCategory && byQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in relative z-10 p-4 pb-20">
      
      {/* Header Section */}
      <div className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
        
        <div>
          <h1 className="text-4xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
            <Gamepad2 className="w-10 h-10 text-primary-500 animate-pulse-slow" /> 
            ARCADE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">NEXUS</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl font-medium">Selecciona un juego, encuentra un rival y suma puntos para liderar la clasificación global.</p>
        </div>

        <div className="flex gap-4">
          <div className="glass-card px-5 py-3 flex items-center gap-4 min-w-[140px]">
            <div className="bg-green-500/20 p-2 rounded-xl border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Online</p>
              <p className="text-white font-black text-xl">1,204</p>
            </div>
          </div>
          
          <div className="glass-card px-5 py-3 flex items-center gap-4 min-w-[140px]">
            <div className="bg-orange-500/20 p-2 rounded-xl border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Racha</p>
              <p className="text-white font-black text-xl">x3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-800/80 pb-px">
        <button
          onClick={() => setActiveTab("lobby")}
          className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all relative ${activeTab === 'lobby' ? 'text-primary-400' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Lobby Principal
          {activeTab === 'lobby' && (
             <motion.div layoutId="gamesTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 shadow-[0_-2px_10px_rgba(168,85,247,0.5)]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all relative ${activeTab === 'history' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Historial de Partidas
          {activeTab === 'history' && (
             <motion.div layoutId="gamesTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_-2px_10px_rgba(255,255,255,0.5)]" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "lobby" ? (
            <motion.div
              key="lobby"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Gamepad2 className="w-5 h-5 text-zinc-400" /> Juegos y Tests Destacados
                </h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Buscar juego..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full sm:w-64 bg-black/20 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${categoryFilter === "all" ? "border-primary-400/60 text-primary-300 bg-primary-500/10" : "border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                >
                  Todo
                </button>
                <button
                  onClick={() => setCategoryFilter("game")}
                  className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${categoryFilter === "game" ? "border-violet-400/60 text-violet-300 bg-violet-500/10" : "border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                >
                  Juegos
                </button>
                <button
                  onClick={() => setCategoryFilter("test")}
                  className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${categoryFilter === "test" ? "border-cyan-400/60 text-cyan-300 bg-cyan-500/10" : "border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                >
                  Tests
                </button>
              </div>

              {loading ? (
                <ViewState variant="loading" title="Cargando juegos" description="Preparando lobby y catalogo." />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard key={game.id} game={game} onSelect={handleGameSelect} />
                  ))}
                </div>
              )}

              {!loading && filteredGames.length === 0 ? (
                <ViewState variant="empty" title="Sin resultados" description="No hay juegos para ese filtro." className="min-h-[150px]" />
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-primary-400" /> Últimos Encuentros
              </h2>
              <div className="space-y-4">
                {history.map((match, i) => (
                  <div key={i} className="group flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg ${
                        match.result === 'win' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-md tracking-wide">{match.game}</h4>
                        <p className="text-zinc-500 text-xs font-medium mt-1">
                          vs <span className="text-primary-400 font-bold">{match.opponent || "Rival Anónimo"}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-right">
                       <div>
                         <span className={`block font-black text-lg font-mono ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                           {match.score > 0 ? '+' : ''}{match.score} XP
                         </span>
                         <span className="text-zinc-500 text-xs font-medium block mt-1">{match.date}</span>
                       </div>
                       <div className="hidden sm:flex w-10 h-10 rounded-full bg-zinc-800 items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                         <ArrowUpRight className="w-5 h-5" />
                       </div>
                    </div>
                  </div>
                ))}
                
                {history.length === 0 && !loading && (
                  <ViewState variant="empty" title="Sin partidas registradas" description="Juega una partida para ver tu historial." className="min-h-[160px]" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 