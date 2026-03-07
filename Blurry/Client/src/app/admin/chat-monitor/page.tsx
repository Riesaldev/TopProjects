"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import ViewState from "@/components/ViewState";
import { Search, AlertCircle, ShieldBan, ShieldAlert } from "lucide-react";

interface ChatMessage {
  id: number;
  user_id: number;
  contact_id: number;
  sender_id: number;
  sender_name?: string;
  content: string;
  timestamp: string;
}

export default function ChatMonitorPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const executeSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/chats/search/all?q=${encodeURIComponent(keyword)}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error al buscar en los chats");
      const data = await res.json();
      setResults(data || []);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (userId: number) => {
    if (!confirm(`¿Estás seguro de que quieres suspender al usuario ID ${userId}?`)) return;
    
    try {
      const res = await fetch(`/api/users/${userId}/suspend`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason: "Comportamiento inapropiado en chat", days: 7 })
      });
      if (!res.ok) throw new Error("Error al suspender usuario");
      alert("Usuario suspendido exitosamente por 7 días.");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="glass-panel rounded-3xl border border-zinc-800/60 p-6 flex flex-col md:flex-row gap-6 justify-between items-center bg-zinc-900/40">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <ShieldAlert className="text-rose-500 w-8 h-8" /> Moderación de Chats
            </h1>
            <p className="text-zinc-400 text-sm mt-2">Busca palabras clave y monitorea interacciones para detectar comportamientos tóxicos.</p>
          </div>
          
          <form onSubmit={executeSearch} className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar (ej. grosería...)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition-all text-sm w-full md:w-64"
            />
            <Button type="submit" variant="primary" disabled={loading} className="!bg-rose-600 hover:!bg-rose-500 !border-none flex items-center gap-2">
              <Search className="w-4 h-4" /> Buscar
            </Button>
          </form>
        </header>

        {loading ? (
          <ViewState variant="loading" title="Analizando Base de Datos" description="Buscando coincidencias en los mensajes de chat..." className="w-full max-w-md mx-auto" />
        ) : error ? (
          <ViewState variant="error" title="Error de conexión" description={error} className="w-full max-w-md mx-auto" />
        ) : results.length === 0 && keyword && !loading ? (
          <ViewState variant="empty" title="Sin resultados" description={`No se encontraron mensajes que coincidan con "${keyword}"`} className="w-full max-w-md mx-auto" />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest px-2 mb-2">
              {results.length} coincidencias encontradas
            </h2>
            {results.map((msg) => (
              <div key={msg.id} className="glass-panel p-5 rounded-2xl border border-zinc-800/70 bg-zinc-900/30 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:bg-zinc-900/50 transition-colors">
                <div className="space-y-1 w-full flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2 py-1 bg-zinc-800 rounded text-zinc-300">
                      ID Conversación: {msg.user_id} - {msg.contact_id}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="font-mono text-sm bg-black/40 p-3 rounded-xl border border-zinc-800 mt-2 break-all text-rose-100">
                    <span className="font-bold text-rose-500 uppercase text-xs mr-2">Msg:</span> 
                    {msg.content}
                  </p>
                </div>
                
                <div className="flex shrink-0 gap-2 w-full md:w-auto">
                  <Button variant="danger" className="w-full justify-center" onClick={() => handleBan(msg.sender_id)}>
                    <ShieldBan className="w-4 h-4 mr-2" /> Ban {msg.sender_name || `ID ${msg.sender_id}`}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-20 opacity-50 px-4 text-center">
             <AlertCircle className="w-16 h-16 text-zinc-600 mb-4" />
             <h3 className="text-lg font-bold text-zinc-400">Ingresa un término para empezar</h3>
             <p className="text-sm text-zinc-500 mt-2 max-w-sm">El motor buscará en los historiales de todos los chats para detectar comportamientos tóxicos.</p>
           </div>
        )}
      </div>
    </main>
  );
}