export interface Character {
  id: string;
  system: string;
  name: string;
  class: string;
  race: string;
  level: number;
  hp: number;
  ac: number;
  mainStat: string;
  mainStatValue: number;
  backgroundImage: string;
  portraitImage: string;
}

export interface Campaign {
  id: string;
  name: string;
  system: string;
  description?: string;
  backgroundImage?: string;
  players: {
    name: string;
    avatar: string;
  }[];
}

export interface Compendium {
  id: string;
  name: string;
  system: string;
  backgroundImage?: string;
  portraitImage?: string;
}

export interface NotificationPreference {
  type: 'email' | 'whatsapp';
  enabled: boolean;
  frequency: string;
}

export interface UserData {
  email: string;
  username?: string;
  password: string;
  avatar: string;
  status: 'online' | 'offline';
}

export interface UserProfileData {
  displayName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  level: number;
  campaigns: number;
  hoursPlayed: string;
  badgeColor: string;
  characters: Character[];
  notifications: NotificationPreference[];
  campaign: Campaign[];
  compendium: Compendium[];
}

export interface ProfileError {
  type: 'validation' | 'server';
  message: string;
  field?: keyof UserProfileData;
}
