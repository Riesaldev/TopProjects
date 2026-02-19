/**
 * GameProvider.tsx — Componente proveedor del estado del juego VTT.
 *
 * Separado de GameContext.ts para que Vite Fast Refresh
 * clasifique correctamente este módulo como "solo componentes".
 *
 * Gestiona:
 *  - Tokens en el mapa
 *  - Chat / log de partida
 *  - Orden de iniciativa
 *  - Estado del mapa (imagen, grid, zoom/pan)
 *  - Herramienta activa
 *  - Overlays de medición / AOE
 *  - Jugadores online (via socket – TODO)
 */

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { GameContext, type GameContextValue } from './GameContext';
import type {
  AoeState,
  ChatMessage,
  DiceResult,
  InitiativeEntry,
  MapState,
  MeasurementState,
  PlayerInfo,
  Token,
  ToolType,
} from '@/types/game';
import { useSocket } from '@/hooks/useSocket';

// ─── Estado inicial ───────────────────────────────────────────────────────────

const INITIAL_MAP: MapState = {
  imageUrl: null,
  imageOpacity: 0.8,
  showGrid: true,
  gridOpacity: 0.6,
  hexSize: 40,
  zoom: 1,
  panX: 0,
  panY: 0,
};

const PLAYER_COLORS = [
  '#3713ec', '#10b981', '#ef4444', '#f59e0b',
  '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDiceFormula(formula: string): { rolls: number[]; modifier: number; total: number } {
  const match = formula.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) return { rolls: [0], modifier: 0, total: 0 };
  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;
  const rolls = Array.from({ length: count }, () => Math.ceil(Math.random() * sides));
  const total = rolls.reduce((a, b) => a + b, 0) + modifier;
  return { rolls, modifier, total };
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface GameProviderProps {
  campaignId: number;
  campaignName: string;
  children: ReactNode;
}

export function GameProvider({ campaignId, campaignName, children }: GameProviderProps) {
  const { isConnected } = useSocket(campaignId);

  const [tokens, setTokens] = useState<Token[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'sys-1',
      userId: 0,
      username: 'Sistema',
      color: '#a19db9',
      content: '¡Bienvenido a la sesión! Escribe /roll 1d20 para tirar dados.',
      type: 'system',
      timestamp: Date.now(),
    },
  ]);
  const [initiativeOrder, setInitiativeOrder] = useState<InitiativeEntry[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [mapState, setMapState] = useState<MapState>(INITIAL_MAP);
  const [activeTool, setActiveTool] = useState<ToolType>('select');
  const [measurementState, setMeasurementState] = useState<MeasurementState | null>(null);
  const [aoeState, setAoeState] = useState<AoeState>(null);
  const [players] = useState<PlayerInfo[]>([]);
  // TODO: poblar players via socket 'player:join' / 'player:leave'

  // ─── Tokens ────────────────────────────────────────────────────────────────

  const addToken = useCallback((t: Token) => {
    setTokens((prev) => [...prev, t]);
  }, []);

  const updateToken = useCallback((id: string, patch: Partial<Token>) => {
    setTokens((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const removeToken = useCallback((id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveToken = useCallback((id: string, x: number, y: number) => {
    setTokens((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
    // TODO: socket.emit('token:move', { campaignId, id, x, y });
  }, []);

  // ─── Chat ──────────────────────────────────────────────────────────────────

  const rollDice = useCallback((formula: string, label?: string) => {
    const { rolls, modifier, total } = parseDiceFormula(formula);
    const result: DiceResult = { formula, rolls, modifier, total, label };
    const msg: ChatMessage = {
      id: makeId(),
      userId: 1,
      username: 'Yo',
      color: PLAYER_COLORS[0],
      content: `Tira ${formula}${label ? ` (${label})` : ''}`,
      type: 'dice',
      diceResult: result,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback((content: string, whisperTo?: string) => {
    if (content.startsWith('/roll ')) {
      rollDice(content.slice(6).trim());
      return;
    }
    const whisperMatch = content.match(/^\/w\s+@(\S+)\s+(.+)$/);
    if (whisperMatch) {
      const msg: ChatMessage = {
        id: makeId(),
        userId: 1,
        username: 'Yo',
        color: PLAYER_COLORS[0],
        content: whisperMatch[2],
        type: 'chat',
        timestamp: Date.now(),
        isWhisper: true,
        targetUsername: whisperMatch[1],
      };
      setMessages((prev) => [...prev, msg]);
      return;
    }
    const msg: ChatMessage = {
      id: makeId(),
      userId: 1,
      username: 'Yo',
      color: PLAYER_COLORS[0],
      content,
      type: 'chat',
      timestamp: Date.now(),
      isWhisper: !!whisperTo,
      targetUsername: whisperTo,
    };
    setMessages((prev) => [...prev, msg]);
    // TODO: socket.emit('chat:message', msg);
  }, [rollDice]);

  // ─── Iniciativa ────────────────────────────────────────────────────────────

  const nextTurn = useCallback(() => {
    setCurrentTurnIndex((prev) => {
      const next = prev + 1;
      if (next >= initiativeOrder.length) {
        setRound((r) => r + 1);
        return 0;
      }
      return next;
    });
  }, [initiativeOrder.length]);

  // ─── Mapa ──────────────────────────────────────────────────────────────────

  const updateMapState = useCallback((patch: Partial<MapState>) => {
    setMapState((prev) => ({ ...prev, ...patch }));
  }, []);

  const loadMapImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setMapState((prev) => ({ ...prev, imageUrl: url }));
  }, []);

  // ─── Value ─────────────────────────────────────────────────────────────────

  const value = useMemo<GameContextValue>(() => ({
    campaignId,
    campaignName,
    isConnected,
    tokens,
    addToken,
    updateToken,
    removeToken,
    moveToken,
    messages,
    sendMessage,
    rollDice,
    initiativeOrder,
    setInitiativeOrder,
    nextTurn,
    currentTurnIndex,
    round,
    mapState,
    updateMapState,
    activeTool,
    setActiveTool,
    measurementState,
    setMeasurementState,
    aoeState,
    setAoeState,
    players,
    loadMapImage,
  }), [
    campaignId, campaignName, isConnected,
    tokens, addToken, updateToken, removeToken, moveToken,
    messages, sendMessage, rollDice,
    initiativeOrder, nextTurn, currentTurnIndex, round,
    mapState, updateMapState,
    activeTool,
    measurementState,
    aoeState,
    players, loadMapImage,
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
