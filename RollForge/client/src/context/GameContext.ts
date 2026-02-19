/**
 * GameContext.ts — Definición del contexto y tipos del juego.
 * Este archivo no exporta ningún componente React, solo el createContext
 * y los tipos, para que Vite Fast Refresh funcione correctamente.
 */

import { createContext } from 'react';
import type {
  AoeState,
  ChatMessage,
  InitiativeEntry,
  MapState,
  MeasurementState,
  PlayerInfo,
  Token,
  ToolType,
} from '@/types/game';

// ─── Tipo del contexto ────────────────────────────────────────────────────────

export interface GameContextValue {
  campaignId: number | null;
  campaignName: string;
  isConnected: boolean;

  tokens: Token[];
  addToken: (t: Token) => void;
  updateToken: (id: string, patch: Partial<Token>) => void;
  removeToken: (id: string) => void;
  moveToken: (id: string, x: number, y: number) => void;

  messages: ChatMessage[];
  sendMessage: (content: string, whisperTo?: string) => void;
  rollDice: (formula: string, label?: string) => void;

  initiativeOrder: InitiativeEntry[];
  setInitiativeOrder: (order: InitiativeEntry[]) => void;
  nextTurn: () => void;
  currentTurnIndex: number;
  round: number;

  mapState: MapState;
  updateMapState: (patch: Partial<MapState>) => void;

  activeTool: ToolType;
  setActiveTool: (t: ToolType) => void;

  measurementState: MeasurementState | null;
  setMeasurementState: (s: MeasurementState | null) => void;
  aoeState: AoeState;
  setAoeState: (s: AoeState) => void;

  players: PlayerInfo[];
  loadMapImage: (file: File) => void;
}

// ─── Objeto contexto ─────────────────────────────────────────────────────────

export const GameContext = createContext<GameContextValue | null>(null);
