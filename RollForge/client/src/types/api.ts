/**
 * Tipos para las respuestas de la API REST.
 * Todas las llamadas al server devuelven esta estructura.
 */

// ─── Generic API response ───────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── User / Auth ─────────────────────────────────────────────────────────────

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthTokenPayload {
  userId: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;   // puede ser email o username
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RecoverPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface LoginResponse {
  token: string;
  user: ApiUser;
}

// ─── Campaigns ───────────────────────────────────────────────────────────────

export interface ApiCampaign {
  id: number;
  name: string;
  description: string | null;
  system: string;
  cover_image: string | null;
  gm_id: number;
  gm_username: string;
  player_count: number;
  players: ApiCampaignPlayer[];
  created_at: string;
  updated_at: string;
}

export interface ApiCampaignPlayer {
  user_id: number;
  username: string;
  avatar: string | null;
  status: 'online' | 'offline';
}

export interface CreateCampaignRequest {
  name: string;
  description?: string;
  system: string;
  cover_image?: string | null;
}

export interface UpdateCampaignRequest extends Partial<CreateCampaignRequest> {}

// ─── Characters ───────────────────────────────────────────────────────────────

export interface ApiCharacter {
  id: number;
  name: string;
  image_url: string | null;
  user_id: number;
  campaign_id: number | null;
  system: string;
  class: string;
  race: string;
  level: number;
  hp: number;
  max_hp: number;
  ac: number;
  main_stat: string;
  main_stat_value: number;
  background_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCharacterRequest {
  name: string;
  system: string;
  class: string;
  race: string;
  level?: number;
  hp?: number;
  max_hp?: number;
  ac?: number;
  main_stat?: string;
  main_stat_value?: number;
  campaign_id?: number | null;
  image_url?: string | null;
}

export interface UpdateCharacterRequest extends Partial<CreateCharacterRequest> {}

// ─── Tokens ──────────────────────────────────────────────────────────────────

export interface ApiToken {
  id: number;
  name: string;
  image_url: string | null;
  character_id: number | null;
  campaign_id: number;
  user_id: number;
  pos_x: number | null;
  pos_y: number | null;
}

export interface CreateTokenRequest {
  name: string;
  campaign_id: number;
  image_url?: string | null;
  character_id?: number | null;
}

// ─── Resources ───────────────────────────────────────────────────────────────

export type ResourceType = 'image' | 'audio' | 'pdf' | 'other';

export interface ApiResource {
  id: number;
  name: string;
  type: ResourceType;
  url: string;
  size_bytes: number | null;
  campaign_id: number;
  uploaded_by: number;
  uploader_username: string;
  created_at: string;
}

// ─── Sessions ────────────────────────────────────────────────────────────────

export interface ApiSession {
  id: number;
  campaign_id: number;
  title: string;
  scheduled_at: string;
  duration_minutes: number | null;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes: string | null;
}

export interface CreateSessionRequest {
  campaign_id: number;
  title: string;
  scheduled_at: string;
  duration_minutes?: number;
}

// ─── Compendium ────────────────────────────────────────────────────────────
export interface ApiCompendium {
  id: number;
  name: string;
  system: string;
  description: string | null;
  cover_url: string | null;
  file_url: string | null;
  author: string | null;
  pages: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCompendiumRequest {
  name: string;
  system: string;
  description?: string;
  author?: string;
}
