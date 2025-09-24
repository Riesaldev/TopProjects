export interface Token {
  id: string;
  name: string;
  x: number;
  y: number;
  image: string;
  size: number;
  color: string;
  playerId: string;
}

export interface ChatMessage {
  id: string;
  type: 'message' | 'dice' | 'system';
  content: string;
  author: string;
  timestamp: Date;
  diceResult?: DiceResult;
}

export interface DiceResult {
  formula: string;
  rolls: Array<{
    die: string;
    results: number[];
  }>;
  total: number;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  isGM: boolean;
  isOnline: boolean;
}

export interface Room {
  id: string;
  name: string;
  gmId: string;
  players: Player[];
  mapImage?: string;
  tokens: Token[];
}

export interface Point {
  x: number;
  y: number;
}

export interface AreaEffect {
  id: string;
  type: 'circle' | 'cone';
  origin: Point;
  radius: number;
  angle?: number;
  direction?: number;
  color: string;
  opacity?: number;
}

// Información mínima del usuario autenticado almacenada en localStorage
export interface StoredUser {
  id: string | number;
  username: string;
  email: string;
  avatar: string | null;
}
