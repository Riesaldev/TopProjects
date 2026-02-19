/**
 * Tipos del dominio del juego (VTT, tokens, chat, dados, mapa).
 */

// ─── Herramientas del mapa ────────────────────────────────────────────────────

export type ToolType = 'select' | 'measure' | 'aoe-blast' | 'aoe-cone' | 'fog' | 'draw';

// ─── Coordenadas ──────────────────────────────────────────────────────────────

export interface HexCoord {
  q: number;
  r: number;
}

export interface PixelCoord {
  x: number;
  y: number;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

export interface Token {
  id: string;
  name: string;
  image?: string;
  /** Color del borde / facción */
  color: string;
  /** Posición en píxeles sobre el canvas sin zoom */
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  ac?: number;
  isEnemy: boolean;
  conditions: string[];
}

// ─── Dados ────────────────────────────────────────────────────────────────────

export interface DiceResult {
  /** Fórmula: "2d6+3", "1d20" */
  formula: string;
  /** Resultados individuales de cada dado */
  rolls: number[];
  modifier: number;
  total: number;
  /** Etiqueta opcional: "Attack", "Perception" */
  label?: string;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export type ChatMessageType = 'chat' | 'dice' | 'system';

export interface ChatMessage {
  id: string;
  userId: number;
  username: string;
  avatar?: string;
  color: string;
  content: string;
  type: ChatMessageType;
  diceResult?: DiceResult;
  timestamp: number;
  /** Susurro privado */
  isWhisper?: boolean;
  targetUsername?: string;
}

// ─── Iniciativa ───────────────────────────────────────────────────────────────

export interface InitiativeEntry {
  id: string;
  name: string;
  image?: string;
  initiative: number;
  hp: number;
  maxHp: number;
  isPlayer: boolean;
  tokenId?: string;
}

// ─── Estado del mapa ──────────────────────────────────────────────────────────

export interface MapState {
  imageUrl: string | null;
  imageOpacity: number;
  showGrid: boolean;
  gridOpacity: number;
  /** Radio en px de cada hexágono (flat-top) */
  hexSize: number;
  zoom: number;
  panX: number;
  panY: number;
}

// ─── Herramientas de medición / AOE ───────────────────────────────────────────

export interface MeasurementState {
  startHex: HexCoord | null;
  endHex: HexCoord | null;
  startPx: PixelCoord | null;
  endPx: PixelCoord | null;
  distanceFt: number;
}

export interface AoeBlastState {
  centerPx: PixelCoord | null;
  radiusFt: number;
}

export interface AoeConeState {
  originPx: PixelCoord | null;
  directionAngle: number; // radianes
  lengthFt: number;
}

export type AoeState =
  | { type: 'blast'; data: AoeBlastState }
  | { type: 'cone'; data: AoeConeState }
  | null;

// ─── Jugadores online ─────────────────────────────────────────────────────────

export interface PlayerInfo {
  userId: number;
  username: string;
  avatar?: string;
  color: string;
  isOnline: boolean;
  isGM: boolean;
}
