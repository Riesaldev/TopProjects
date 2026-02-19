import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3).max(32),
  display_name: z.string().max(64).optional(),
});

export const recoverPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export const createCampaignSchema = z.object({
  name: z.string().min(1).max(128),
  description: z.string().max(2000).optional(),
  system: z.string().max(64).optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial().extend({
  status: z.enum(['active', 'paused', 'completed']).optional(),
});

export const createCharacterSchema = z.object({
  name: z.string().min(1).max(128),
  campaign_id: z.number().int().positive().optional(),
  system: z.string().max(64).default('D&D 5e'),
  class: z.string().max(64).default('Fighter'),
  race: z.string().max(64).default('Human'),
  level: z.number().int().min(1).max(20).default(1),
  hp: z.number().int().min(0).default(10),
  max_hp: z.number().int().min(1).default(10),
  ac: z.number().int().min(1).default(10),
  main_stat: z.string().max(32).default('STR'),
  main_stat_value: z.number().int().min(1).max(30).default(10),
});

export const updateCharacterSchema = createCharacterSchema.partial();
