import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Player } from '../types';
import { getPaletteColor } from '@/constants/palette';

interface PlayersContextValue {
  players: Player[];
  login: (name: string, opts?: { isGM?: boolean }) => Player | null;
  logout: (id: string) => void;
  setOnline: (id: string, isOnline: boolean) => void;
  clearAll: () => void;
}

const PlayersContext = createContext<PlayersContextValue | undefined>(undefined);

const STORAGE_KEY = 'rf_players_v1';

function loadStored(): Player[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: Player[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStored(players: Player[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  } catch {
    // ignore
  }
}

export const PlayersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(() => loadStored());

  // Al montar, marcar todos como offline inicialmente (o mantener). Decidimos mantener estado guardado.
  useEffect(() => {
    saveStored(players);
  }, [players]);

  const login = useCallback<PlayersContextValue['login']>((name, opts) => {
    name = name.trim();
    if (!name) return null;
    // Duplicado por nombre (case-insensitive) => simplemente marcar online
    const existing = players.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      setPlayers(ps => ps.map(p => p.id === existing.id ? { ...p, isOnline: true } : p));
      return { ...existing, isOnline: true };
    }
    const id = (crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2));
    const newPlayer: Player = {
      id,
      name,
      color: getPaletteColor(players.length),
      isGM: !!opts?.isGM,
      isOnline: true,
    };
    setPlayers(ps => [...ps, newPlayer]);
    return newPlayer;
  }, [players]);

  const logout = useCallback<PlayersContextValue['logout']>((id) => {
    setPlayers(ps => ps.map(p => p.id === id ? { ...p, isOnline: false } : p));
  }, []);

  const setOnline = useCallback<PlayersContextValue['setOnline']>((id, isOnline) => {
    setPlayers(ps => ps.map(p => p.id === id ? { ...p, isOnline } : p));
  }, []);

  const clearAll = useCallback(() => {
    setPlayers([]);
  }, []);

  const value = useMemo<PlayersContextValue>(() => ({ players, login, logout, setOnline, clearAll }), [players, login, logout, setOnline, clearAll]);

  return <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>;
};

export function usePlayers() {
  const ctx = useContext(PlayersContext);
  if (!ctx) throw new Error('usePlayers debe usarse dentro de PlayersProvider');
  return ctx;
}

export default PlayersContext;
