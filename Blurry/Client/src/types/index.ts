// Tipos principales de la aplicación

export interface User {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
  bio?: string;
  interests?: string;
  ubicacion?: string;
  codigoPostal?: string;
  tokens?: number;
  ratingPromedio?: number;
  genero?: string;
  edad?: number;
  actividad?: string;
  estado?: string;
  rol?: string;
}

export interface Toast {
  id: number;
  msg: string;
  type: "info" | "success" | "error";
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  tokenReward: number;
  secret?: boolean;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  date: string;
}

export interface Mission {
  id: number;
  type: string;
  description: string;
  goal: number;
  action: string;
  reward: { tokens: number };
  secret: boolean;
}

export interface UserMission {
  userId: number;
  missionId: number;
  progress: number;
  completed: boolean;
  assignedAt: string;
  completedAt: string | null;
}

export interface Message {
  id: number | string;
  sender: string;
  content: string;
  timestamp: string;
  senderId?: number;
}

export interface Contact {
  id: number;
  nombre: string;
  avatar?: string;
  genero?: string;
  edad?: number;
  actividad?: string;
  codigoPostal?: string;
}

export interface AgendaEvent {
  id: number;
  userId: number;
  title: string;
  description?: string;
  datetime: string;
  note?: string;
  contactId?: number;
  completed?: boolean;
}

export interface Purchase {
  id: number;
  productName: string;
  price: number;
  date: string;
  total: number;
  userId?: number;
  quantity?: number;
  status?: string;
}

export interface Game {
  id: number | string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface Note {
  id: number;
  content: string;
  date: string;
  contactId?: number;
  userId?: number;
}

export interface Notification {
  id: number;
  text: string;
  type?: "sistema" | "recompensa" | "actividad" | "alerta";
  read?: boolean;
  timestamp: string;
  userId?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Streak {
  userId: number;
  currentStreak: number;
  maxStreak: number;
  lastActivity?: string;
}

export interface Report {
  id: string;
  usuario: string;
  motivo: string;
  fecha: string;
  estado: string;
}

export interface Sanction {
  id: string;
  usuario: string;
  sancion: string;
  fecha: string;
  estado: string;
}

export interface Service {
  id: string;
  nombre: string;
  estado: string;
}

export interface Match {
  id: string;
  usuarios: string[];
  fecha: string;
}

export interface TokenTransaction {
  id: string;
  usuario: string;
  cantidad: number;
  transaccion: string;
  fecha: string;
  estado: string;
}

export interface Report {
  id: string;
  usuario_reportado: string;
  usuario_reportador: string;
  motivo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  categoria: string;
}

export interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: string;
  date: string;
}

export interface ChatMessage {
  id: number;
  userId: number;
  contactId: number;
  senderId: number;
  content: string;
  timestamp: string;
}

export interface SupportChatMessage {
  id: number;
  message: string;
  sender: "user" | "support";
  timestamp: string;
}
