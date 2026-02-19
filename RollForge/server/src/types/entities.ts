// ─── Database entity types matching the MySQL schema ──────────────────────────

export interface DbUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'player' | 'dm' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface DbCampaign {
  id: number;
  name: string;
  description: string | null;
  system: string | null;
  cover_url: string | null;
  owner_id: number;
  status: 'active' | 'paused' | 'completed';
  created_at: Date;
  updated_at: Date;
}

export interface DbCampaignPlayer {
  id: number;
  campaign_id: number;
  user_id: number;
  role: 'dm' | 'player';
  joined_at: Date;
}

export interface DbCharacter {
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
  created_at: Date;
  updated_at: Date;
}

export interface DbResource {
  id: number;
  campaign_id: number;
  uploader_id: number;
  name: string;
  type: 'map' | 'token' | 'handout' | 'audio' | 'pdf' | 'other';
  url: string;
  size_bytes: number;
  mime_type: string;
  created_at: Date;
}

export interface DbSession {
  id: number;
  campaign_id: number;
  title: string;
  scheduled_at: Date;
  duration_minutes: number | null;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes: string | null;
}

export interface DbCompendium {
  id: number;
  name: string;
  system: string;
  description: string | null;
  cover_url: string | null;
  file_url: string | null;
  author: string | null;
  pages: number | null;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
